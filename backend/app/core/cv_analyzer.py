import cv2
import mediapipe as mp
import numpy as np
import tempfile
import os

mp_drawing = mp.solutions.drawing_utils
mp_pose = mp.solutions.pose

def calculate_angle(a, b, c):
    """
    Calculate the angle between three points.
    Points are typically (x, y) coordinates of body landmarks.
    """
    a = np.array(a) # First
    b = np.array(b) # Mid (Vertex)
    c = np.array(c) # End
    
    radians = np.arctan2(c[1]-b[1], c[0]-b[0]) - np.arctan2(a[1]-b[1], a[0]-b[0])
    angle = np.abs(radians*180.0/np.pi)
    
    if angle > 180.0:
        angle = 360 - angle
        
    return angle

def analyze_pushup_video(video_path: str):
    """
    Counts push-up reps by tracking the elbow angle (shoulder -> elbow -> wrist).
    Down when angle < 90°, up when > 160°.
    """
    cap = cv2.VideoCapture(video_path)
    if not cap.isOpened():
        raise Exception(f"Error opening video file: {video_path}")

    counter = 0
    stage = None

    with mp_pose.Pose(min_detection_confidence=0.5, min_tracking_confidence=0.5) as pose:
        while cap.isOpened():
            ret, frame = cap.read()
            if not ret:
                break

            image = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            image.flags.writeable = False
            results = pose.process(image)

            try:
                landmarks = results.pose_landmarks.landmark

                shoulder = [landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER.value].x,
                            landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER.value].y]
                elbow    = [landmarks[mp_pose.PoseLandmark.LEFT_ELBOW.value].x,
                            landmarks[mp_pose.PoseLandmark.LEFT_ELBOW.value].y]
                wrist    = [landmarks[mp_pose.PoseLandmark.LEFT_WRIST.value].x,
                            landmarks[mp_pose.PoseLandmark.LEFT_WRIST.value].y]

                angle = calculate_angle(shoulder, elbow, wrist)

                if angle > 160:
                    stage = "up"
                if angle < 90 and stage == "up":
                    stage = "down"
                    counter += 1
            except:
                pass

    cap.release()

    return {
        "exercise": "Push-Up",
        "reps_counted": counter,
        "status": "success",
        "feedback": f"Great job! We counted {counter} push-ups." if counter > 0
                    else "No complete push-ups detected. Make sure your full upper body is visible and go all the way down."
    }


def analyze_plank_video(video_path: str):
    """
    Measures total plank hold time (in seconds) by checking body alignment.
    A plank is detected when shoulder, hip, and ankle are roughly collinear horizontally.
    """
    cap = cv2.VideoCapture(video_path)
    if not cap.isOpened():
        raise Exception(f"Error opening video file: {video_path}")

    fps = cap.get(cv2.CAP_PROP_FPS) or 30.0
    plank_frames = 0

    with mp_pose.Pose(min_detection_confidence=0.5, min_tracking_confidence=0.5) as pose:
        while cap.isOpened():
            ret, frame = cap.read()
            if not ret:
                break

            image = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            image.flags.writeable = False
            results = pose.process(image)

            try:
                landmarks = results.pose_landmarks.landmark

                shoulder = [landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER.value].x,
                            landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER.value].y]
                hip      = [landmarks[mp_pose.PoseLandmark.LEFT_HIP.value].x,
                            landmarks[mp_pose.PoseLandmark.LEFT_HIP.value].y]
                ankle    = [landmarks[mp_pose.PoseLandmark.LEFT_ANKLE.value].x,
                            landmarks[mp_pose.PoseLandmark.LEFT_ANKLE.value].y]

                # Body angle: shoulder -> hip -> ankle should be close to 180° for a straight plank
                body_angle = calculate_angle(shoulder, hip, ankle)

                # Also check the person is roughly horizontal (hip Y close to shoulder Y)
                is_horizontal = abs(shoulder[1] - hip[1]) < 0.15

                if body_angle > 150 and is_horizontal:
                    plank_frames += 1
            except:
                pass

    cap.release()

    hold_seconds = round(plank_frames / fps)

    return {
        "exercise": "Plank",
        "reps_counted": hold_seconds,   # reusing field name for consistency with DB
        "hold_seconds": hold_seconds,
        "status": "success",
        "feedback": f"Solid! You held a plank for {hold_seconds} seconds." if hold_seconds > 0
                    else "No plank position detected. Ensure your full body is visible from the side."
    }


def analyze_vertical_jump_video(video_path: str):
    """
    Estimates vertical jump height by tracking the hip landmark's Y position.
    Baseline = median standing hip Y. Jump height = max upward displacement.
    Returns relative height in normalised units (0-1 of frame height).
    """
    cap = cv2.VideoCapture(video_path)
    if not cap.isOpened():
        raise Exception(f"Error opening video file: {video_path}")

    hip_y_positions = []

    with mp_pose.Pose(min_detection_confidence=0.5, min_tracking_confidence=0.5) as pose:
        while cap.isOpened():
            ret, frame = cap.read()
            if not ret:
                break

            image = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            image.flags.writeable = False
            results = pose.process(image)

            try:
                landmarks = results.pose_landmarks.landmark
                hip_y = landmarks[mp_pose.PoseLandmark.LEFT_HIP.value].y
                hip_y_positions.append(hip_y)
            except:
                pass

    cap.release()

    if not hip_y_positions:
        return {
            "exercise": "Vertical Jump",
            "reps_counted": 0,
            "jump_height_cm": 0,
            "status": "success",
            "feedback": "Could not detect body. Ensure your full body is visible."
        }

    # In MediaPipe, Y=0 is top of frame, Y=1 is bottom.
    # Standing = higher Y value (lower in frame). Jump = lower Y value (higher in frame).
    baseline_y = float(np.percentile(hip_y_positions, 75))   # typical standing position
    min_y      = float(np.min(hip_y_positions))               # highest point reached

    displacement = baseline_y - min_y   # positive = jumped up

    # Rough conversion: assume hip is ~50% of body height, body height ~1.7m
    # displacement is in normalised frame units (0-1)
    # We estimate: 1 unit ≈ body height ≈ 170cm, hip at ~55% = ~93cm from ground
    # Jump displacement relative to frame: multiply by estimated body height in frame
    estimated_jump_cm = round(displacement * 170)
    estimated_jump_cm = max(0, estimated_jump_cm)

    return {
        "exercise": "Vertical Jump",
        "reps_counted": estimated_jump_cm,   # reusing field for DB consistency
        "jump_height_cm": estimated_jump_cm,
        "status": "success",
        "feedback": f"Nice! Estimated jump height: {estimated_jump_cm} cm." if estimated_jump_cm > 0
                    else "No jump detected. Stand sideways to the camera and ensure full body is visible."
    }


def analyze_squat_video(video_path: str):
    """
    Reads a video file, uses Mediapipe to track the pose,
    and counts the number of valid squats performed.
    Returns the total rep count and diagnostic data.
    """
    cap = cv2.VideoCapture(video_path)
    
    # Check if video opened successfully
    if not cap.isOpened():
        raise Exception(f"Error opening video stream or file: {video_path}")

    # Variables for squat tracking
    counter = 0 
    stage = None # "up" or "down"
    
    # Setup mediapipe instance
    with mp_pose.Pose(min_detection_confidence=0.5, min_tracking_confidence=0.5) as pose:
        while cap.isOpened():
            ret, frame = cap.read()
            
            # Break if video is over
            if not ret:
                break
            
            # Recolor image to RGB for mediapipe
            image = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            image.flags.writeable = False
          
            # Make detection
            results = pose.process(image)
            
            # Extract landmarks
            try:
                landmarks = results.pose_landmarks.landmark
                
                # Get coordinates for Left Hip, Knee, and Ankle
                hip = [landmarks[mp_pose.PoseLandmark.LEFT_HIP.value].x, landmarks[mp_pose.PoseLandmark.LEFT_HIP.value].y]
                knee = [landmarks[mp_pose.PoseLandmark.LEFT_KNEE.value].x, landmarks[mp_pose.PoseLandmark.LEFT_KNEE.value].y]
                ankle = [landmarks[mp_pose.PoseLandmark.LEFT_ANKLE.value].x, landmarks[mp_pose.PoseLandmark.LEFT_ANKLE.value].y]
                
                # Calculate the knee angle
                angle = calculate_angle(hip, knee, ankle)
                
                # Squat counting logic
                if angle > 160:
                    stage = "up"
                if angle < 100 and stage == 'up':
                    stage = "down"
                    counter += 1
                    
            except:
                pass # Landmarks might not be visible in this frame
                
    cap.release()
    
    return {
        "exercise": "Squat",
        "reps_counted": counter,
        "status": "success",
        "feedback": f"Great job! We counted {counter} squats." if counter > 0 else "We couldn't detect any complete squats. Ensure your full body is in the frame and go deep enough."
    }
