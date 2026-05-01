import os
import cv2
from datetime import datetime


class DataCollector:
    def __init__(self, test_type):
        self.test_type = test_type
        self.data_dir = f"{test_type}/data"
        os.makedirs(self.data_dir, exist_ok=True)

    def record_training_sample(self, ground_truth=None):
        # record video sample with known ground truth

        cap = cv2.VideoCapture(0)

        if not cap.isOpened():
            print("Error: Cannot access the webcam.")
            return
        ret, frame = cap.read()
        if not ret:
            print("Error: Cannot read frame from webcam.")
            cap.release()
            return

        height, width = frame.shape[:2]
        fourcc = cv2.VideoWriter_fourcc(*'mp4v')
        # fourcc = cv2.VideoWriter_fourcc(*'avc1')
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")

        video_path = os.path.join(self.data_dir, f"sample_{timestamp}.mp4")
        # video_path = os.path.join(self.data_dir, f"sample_{timestamp}.mov")

        metadata_path = os.path.join(self.data_dir, f"sample_{timestamp}.txt")

        out = cv2.VideoWriter(video_path, fourcc, 20.0, (width, height))

        print(f"Recording '{self.test_type}' sample...")
        print("Press 'q' to stop recording.")
        print(f"Ground truth: {ground_truth}")

        while True:
            ret, frame = cap.read()
            if not ret:
                print("Error: Failed to read frame from webcam.")
                break

            out.write(frame)
            cv2.imshow('Recording - Press q to stop', frame)

            if cv2.waitKey(10) & 0xFF == ord('q'):
                print("Recording stopped.")
                break

        cap.release()
        out.release()
        cv2.destroyAllWindows()

        with open(metadata_path, 'w') as f:
            f.write(f"ground_truth={ground_truth}\n")
            f.write(f"test_type={self.test_type}\n")

        print(f"Video saved to: {video_path}")
        print(f"Metadata saved to: {metadata_path}")


# if __name__ == "__main__":
#     collector = DataCollector(test_type="vertical_jump")
#     collector.record_training_sample(ground_truth="successful_jump")
