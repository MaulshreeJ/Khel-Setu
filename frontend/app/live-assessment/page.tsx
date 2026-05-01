"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Camera, StopCircle, Upload, Activity, AlertCircle, ArrowLeft, CheckCircle2 } from "lucide-react"
import { uploadVideoAssessment, getCurrentUser } from "@/lib/api"
import Link from "next/link"

export default function LiveAssessmentPage() {
  const router = useRouter()
  const videoRef = useRef<HTMLVideoElement>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<BlobPart[]>([])

  const [isRecording, setIsRecording] = useState(false)
  const [videoBlob, setVideoBlob] = useState<Blob | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  // Auth check
  useEffect(() => {
    getCurrentUser().catch(() => router.push("/auth"))
  }, [router])

  // Initialize webcam
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: "user" },
        audio: false 
      })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }
    } catch (err) {
      setError("Could not access camera. Please check permissions.")
    }
  }

  useEffect(() => {
    startCamera()
    return () => {
      // Cleanup camera on unmount
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks()
        tracks.forEach(track => track.stop())
      }
    }
  }, [])

  const handleStartRecording = () => {
    if (!videoRef.current || !videoRef.current.srcObject) return

    chunksRef.current = []
    const stream = videoRef.current.srcObject as MediaStream
    const mediaRecorder = new MediaRecorder(stream, { mimeType: "video/webm" })
    
    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        chunksRef.current.push(event.data)
      }
    }

    mediaRecorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: "video/webm" })
      setVideoBlob(blob)
    }

    mediaRecorder.start()
    mediaRecorderRef.current = mediaRecorder
    setIsRecording(true)
    setError(null)
    setAnalysisResult(null)
  }

  const handleStopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
    }
  }

  const handleRetake = () => {
    setVideoBlob(null)
    setAnalysisResult(null)
    setError(null)
    startCamera()
  }

  const handleUpload = async () => {
    if (!videoBlob) return
    
    setIsUploading(true)
    setError(null)
    
    try {
      const result = await uploadVideoAssessment(videoBlob)
      setAnalysisResult(result.analysis)
    } catch (err: any) {
      setError(err.message || "Failed to process video.")
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex items-center space-x-4">
          <Link href="/dashboard">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">AI Squat Assessment</h1>
            <p className="text-muted-foreground">Record a video of your squats for real-time AI analysis.</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          
          {/* Camera/Video Section */}
          <Card className="overflow-hidden border-2 border-muted">
            <div className="relative aspect-[4/3] bg-black">
              {videoBlob ? (
                // Show recorded video
                <video 
                  className="w-full h-full object-cover" 
                  src={URL.createObjectURL(videoBlob)} 
                  controls 
                  autoPlay 
                  loop
                />
              ) : (
                // Show live camera
                <video 
                  ref={videoRef} 
                  className={`w-full h-full object-cover ${isRecording ? "border-4 border-red-500" : ""}`} 
                  autoPlay 
                  playsInline 
                  muted
                />
              )}
              
              {/* Recording Indicator */}
              {isRecording && (
                <div className="absolute top-4 right-4 flex items-center space-x-2 bg-black/50 px-3 py-1 rounded-full">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                  <span className="text-white text-sm font-medium">Recording</span>
                </div>
              )}
            </div>

            <CardFooter className="p-4 flex justify-center space-x-4 bg-muted/20">
              {!videoBlob ? (
                <>
                  {!isRecording ? (
                    <Button onClick={handleStartRecording} className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white">
                      <Camera className="mr-2 h-4 w-4" /> Start Recording
                    </Button>
                  ) : (
                    <Button onClick={handleStopRecording} variant="destructive" className="w-full sm:w-auto">
                      <StopCircle className="mr-2 h-4 w-4" /> Stop Recording
                    </Button>
                  )}
                </>
              ) : (
                <>
                  <Button onClick={handleRetake} variant="outline" className="w-full sm:w-auto">
                    Retake Video
                  </Button>
                  <Button 
                    onClick={handleUpload} 
                    disabled={isUploading || !!analysisResult}
                    className="w-full sm:w-auto bg-primary text-primary-foreground"
                  >
                    {isUploading ? (
                      <>
                        <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Processing AI...
                      </>
                    ) : (
                      <>
                        <Upload className="mr-2 h-4 w-4" /> {analysisResult ? "Analyzed" : "Analyze Video"}
                      </>
                    )}
                  </Button>
                </>
              )}
            </CardFooter>
          </Card>

          {/* Instructions / Results Section */}
          <div className="space-y-6">
            
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {!analysisResult ? (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <Activity className="mr-2 h-5 w-5 text-primary" />
                    How to Record
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm text-muted-foreground">
                  <ol className="list-decimal list-inside space-y-2">
                    <li>Position your camera so your <strong>full body</strong> is visible (from head to toes).</li>
                    <li>Stand sideways (profile view) for best joint tracking.</li>
                    <li>Ensure good lighting so the AI can clearly see your hips, knees, and ankles.</li>
                    <li>Press "Start Recording".</li>
                    <li>Perform 3-5 squats, going as deep as you comfortably can.</li>
                    <li>Press "Stop Recording" and then "Analyze Video".</li>
                  </ol>
                  <div className="p-3 bg-blue-50 text-blue-800 rounded-md text-xs mt-4 border border-blue-100">
                    <strong>Privacy Note:</strong> Your video is processed temporarily for ML analysis and is not permanently stored or shared.
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="border-green-200 bg-green-50/50">
                <CardHeader>
                  <CardTitle className="flex items-center text-green-700">
                    <CheckCircle2 className="mr-2 h-6 w-6" />
                    Analysis Complete
                  </CardTitle>
                  <CardDescription>
                    AI has successfully processed your biomechanics.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  
                  <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-green-100">
                    <div className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">Valid Reps Counted</div>
                    <div className="text-6xl font-black text-green-600">
                      {analysisResult.reps_counted}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium text-sm text-gray-900">AI Feedback</h4>
                    <p className="text-sm text-gray-700 bg-white p-4 rounded-lg border border-gray-100 leading-relaxed">
                      {analysisResult.feedback}
                    </p>
                  </div>

                  <Button onClick={handleRetake} variant="outline" className="w-full mt-4">
                    Record Another Session
                  </Button>
                </CardContent>
              </Card>
            )}

          </div>
        </div>
      </div>
    </div>
  )
}
