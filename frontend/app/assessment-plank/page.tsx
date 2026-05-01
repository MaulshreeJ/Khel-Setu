"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Camera, StopCircle, Upload, Activity, AlertCircle, ArrowLeft, CheckCircle2 } from "lucide-react"
import { uploadPlankAssessment, getCurrentUser } from "@/lib/api"
import Link from "next/link"

export default function PlankAssessmentPage() {
  const router = useRouter()
  const videoRef = useRef<HTMLVideoElement>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<BlobPart[]>([])

  const [isRecording, setIsRecording] = useState(false)
  const [videoBlob, setVideoBlob] = useState<Blob | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getCurrentUser().catch(() => router.push("/auth"))
  }, [router])

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" }, audio: false })
      if (videoRef.current) videoRef.current.srcObject = stream
    } catch {
      setError("Could not access camera. Please check permissions.")
    }
  }

  useEffect(() => {
    startCamera()
    return () => {
      if (videoRef.current?.srcObject) {
        (videoRef.current.srcObject as MediaStream).getTracks().forEach(t => t.stop())
      }
    }
  }, [])

  const handleStartRecording = () => {
    if (!videoRef.current?.srcObject) return
    chunksRef.current = []
    const stream = videoRef.current.srcObject as MediaStream
    const mediaRecorder = new MediaRecorder(stream, { mimeType: "video/webm" })
    mediaRecorder.ondataavailable = (e) => { if (e.data.size > 0) chunksRef.current.push(e.data) }
    mediaRecorder.onstop = () => setVideoBlob(new Blob(chunksRef.current, { type: "video/webm" }))
    mediaRecorder.start()
    mediaRecorderRef.current = mediaRecorder
    setIsRecording(true)
    setError(null)
    setAnalysisResult(null)
  }

  const handleStopRecording = () => {
    mediaRecorderRef.current?.stop()
    setIsRecording(false)
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
      const result = await uploadPlankAssessment(videoBlob)
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
        <div className="flex items-center space-x-4">
          <Link href="/tests"><Button variant="ghost" size="icon"><ArrowLeft className="h-5 w-5" /></Button></Link>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">AI Plank Assessment</h1>
            <p className="text-muted-foreground">Record your plank hold for AI timing analysis.</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="overflow-hidden border-2 border-muted">
            <div className="relative aspect-[4/3] bg-black">
              {videoBlob ? (
                <video className="w-full h-full object-cover" src={URL.createObjectURL(videoBlob)} controls autoPlay loop />
              ) : (
                <video ref={videoRef} className={`w-full h-full object-cover ${isRecording ? "border-4 border-red-500" : ""}`} autoPlay playsInline muted />
              )}
              {isRecording && (
                <div className="absolute top-4 right-4 flex items-center space-x-2 bg-black/50 px-3 py-1 rounded-full">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                  <span className="text-white text-sm font-medium">Recording</span>
                </div>
              )}
            </div>
            <CardFooter className="p-4 flex justify-center space-x-4 bg-muted/20">
              {!videoBlob ? (
                !isRecording ? (
                  <Button onClick={handleStartRecording} className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white">
                    <Camera className="mr-2 h-4 w-4" /> Start Recording
                  </Button>
                ) : (
                  <Button onClick={handleStopRecording} variant="destructive" className="w-full sm:w-auto">
                    <StopCircle className="mr-2 h-4 w-4" /> Stop Recording
                  </Button>
                )
              ) : (
                <>
                  <Button onClick={handleRetake} variant="outline" className="w-full sm:w-auto">Retake Video</Button>
                  <Button onClick={handleUpload} disabled={isUploading || !!analysisResult} className="w-full sm:w-auto">
                    {isUploading ? (
                      <><div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />Processing AI...</>
                    ) : (
                      <><Upload className="mr-2 h-4 w-4" />{analysisResult ? "Analyzed" : "Analyze Video"}</>
                    )}
                  </Button>
                </>
              )}
            </CardFooter>
          </Card>

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
                    <Activity className="mr-2 h-5 w-5 text-primary" /> How to Record
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm text-muted-foreground">
                  <ol className="list-decimal list-inside space-y-2">
                    <li>Position camera so your <strong>full body is visible from the side</strong>.</li>
                    <li>Get into forearm plank — elbows under shoulders, body straight.</li>
                    <li>Press "Start Recording".</li>
                    <li>Hold the plank as long as possible.</li>
                    <li>Press "Stop Recording" when you finish, then "Analyze Video".</li>
                  </ol>
                </CardContent>
              </Card>
            ) : (
              <Card className="border-green-200 bg-green-50/50">
                <CardHeader>
                  <CardTitle className="flex items-center text-green-700">
                    <CheckCircle2 className="mr-2 h-6 w-6" /> Analysis Complete
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-green-100">
                    <div className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">Plank Hold Time</div>
                    <div className="text-6xl font-black text-green-600">{analysisResult.hold_seconds ?? analysisResult.reps_counted}<span className="text-2xl ml-1">sec</span></div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm text-gray-900">AI Feedback</h4>
                    <p className="text-sm text-gray-700 bg-white p-4 rounded-lg border border-gray-100 leading-relaxed">{analysisResult.feedback}</p>
                  </div>
                  <Button onClick={handleRetake} variant="outline" className="w-full mt-4">Record Another Session</Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
