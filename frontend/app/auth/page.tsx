"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Trophy, Phone, Lock, User, Eye, EyeOff, ArrowRight, Calendar, CheckCircle, XCircle } from "lucide-react"
import { loginUser, signupUser, checkHealth } from "@/lib/api"

export default function AuthPage() {
  const router = useRouter()
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [backendStatus, setBackendStatus] = useState<"checking" | "online" | "offline">("checking")
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    password: "",
    confirmPassword: "",
    gender: "male",
    dateOfBirth: "",
    rememberMe: false,
    agreeToTerms: false,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Check backend connectivity on mount
  useEffect(() => {
    checkHealth()
      .then(() => setBackendStatus("online"))
      .catch(() => setBackendStatus("offline"))
  }, [])

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.phone) {
      newErrors.phone = "Phone number is required"
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid 10-digit phone number"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters"
    }

    if (!isLogin) {
      if (!formData.name) {
        newErrors.name = "Name is required"
      }
      if (!formData.dateOfBirth) {
        newErrors.dateOfBirth = "Date of birth is required"
      }
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = "Please confirm your password"
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match"
      }
      if (!formData.agreeToTerms) {
        newErrors.agreeToTerms = "Please agree to the terms and conditions"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsLoading(true)
    setStatusMessage(null)

    try {
      if (isLogin) {
        const result = await loginUser(formData.phone, formData.password)
        // Store the token
        localStorage.setItem("access_token", result.access_token)
        setStatusMessage({ type: "success", text: "Login successful! Redirecting..." })
        setTimeout(() => router.push("/dashboard"), 1000)
      } else {
        await signupUser({
          phone_number: formData.phone,
          full_name: formData.name,
          password: formData.password,
          gender: formData.gender,
          date_of_birth: new Date(formData.dateOfBirth).toISOString(),
        })
        setStatusMessage({ type: "success", text: "Account created! Please sign in." })
        setTimeout(() => {
          setIsLogin(true)
          setStatusMessage(null)
        }, 1500)
      }
    } catch (error: any) {
      setStatusMessage({ type: "error", text: error.message || "Something went wrong" })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSocialLogin = (provider: string) => {
    console.log(`Login with ${provider}`)
  }

  const switchMode = () => {
    setIsLogin(!isLogin)
    setErrors({})
    setStatusMessage(null)
    setFormData({
      name: "",
      phone: "",
      password: "",
      confirmPassword: "",
      gender: "male",
      dateOfBirth: "",
      rememberMe: false,
      agreeToTerms: false,
    })
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Auth Section */}
      <section className="py-12 lg:py-20 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-32 h-32 border-2 border-primary rounded-full animate-float"></div>
          <div
            className="absolute top-40 right-32 w-24 h-24 border-2 border-secondary rounded-full animate-float"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute bottom-32 left-40 w-40 h-40 border-2 border-accent rounded-full animate-float"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="max-w-md mx-auto">
            <Card className="shadow-2xl animate-fade-in-up">
              <CardHeader className="text-center space-y-4">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto">
                  <Trophy className="h-8 w-8 text-primary-foreground" />
                </div>
                <div className="space-y-2">
                  <CardTitle className="text-2xl font-bold">{isLogin ? "Welcome Back" : "Join KhelSetu"}</CardTitle>
                  <CardDescription className="text-base">
                    {isLogin ? "Sign in to access your fitness dashboard" : "Start your journey to athletic excellence"}
                  </CardDescription>
                </div>
                {/* Backend Status Indicator */}
                <div className="flex items-center justify-center gap-2 text-xs">
                  {backendStatus === "checking" && (
                    <span className="text-muted-foreground">⏳ Checking server...</span>
                  )}
                  {backendStatus === "online" && (
                    <span className="text-green-600 flex items-center gap-1">
                      <CheckCircle className="h-3 w-3" /> Server online
                    </span>
                  )}
                  {backendStatus === "offline" && (
                    <span className="text-destructive flex items-center gap-1">
                      <XCircle className="h-3 w-3" /> Server offline
                    </span>
                  )}
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Status Message */}
                {statusMessage && (
                  <div
                    className={`p-3 rounded-lg text-sm text-center animate-fade-in-up ${
                      statusMessage.type === "success"
                        ? "bg-green-50 text-green-700 border border-green-200"
                        : "bg-red-50 text-red-700 border border-red-200"
                    }`}
                  >
                    {statusMessage.text}
                  </div>
                )}

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator className="w-full" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">Continue with phone number</span>
                  </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  {!isLogin && (
                    <div className="space-y-2 animate-fade-in-up">
                      <Label htmlFor="name">Full Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="name"
                          type="text"
                          placeholder="Enter your full name"
                          className={`pl-10 transition-all duration-300 focus:ring-2 focus:ring-primary/20 ${
                            errors.name ? "border-destructive focus:ring-destructive/20" : ""
                          }`}
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                        />
                      </div>
                      {errors.name && <p className="text-sm text-destructive animate-fade-in-up">{errors.name}</p>}
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="Enter 10-digit phone number"
                        maxLength={10}
                        className={`pl-10 transition-all duration-300 focus:ring-2 focus:ring-primary/20 ${
                          errors.phone ? "border-destructive focus:ring-destructive/20" : ""
                        }`}
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value.replace(/\D/g, ""))}
                      />
                    </div>
                    {errors.phone && <p className="text-sm text-destructive animate-fade-in-up">{errors.phone}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        className={`pl-10 pr-10 transition-all duration-300 focus:ring-2 focus:ring-primary/20 ${
                          errors.password ? "border-destructive focus:ring-destructive/20" : ""
                        }`}
                        value={formData.password}
                        onChange={(e) => handleInputChange("password", e.target.value)}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-1 top-1 h-8 w-8 p-0 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Eye className="h-4 w-4 text-muted-foreground" />
                        )}
                      </Button>
                    </div>
                    {errors.password && (
                      <p className="text-sm text-destructive animate-fade-in-up">{errors.password}</p>
                    )}
                  </div>

                  {!isLogin && (
                    <div className="space-y-2 animate-fade-in-up">
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Confirm your password"
                          className={`pl-10 pr-10 transition-all duration-300 focus:ring-2 focus:ring-primary/20 ${
                            errors.confirmPassword ? "border-destructive focus:ring-destructive/20" : ""
                          }`}
                          value={formData.confirmPassword}
                          onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-1 top-1 h-8 w-8 p-0 hover:bg-transparent"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <Eye className="h-4 w-4 text-muted-foreground" />
                          )}
                        </Button>
                      </div>
                      {errors.confirmPassword && (
                        <p className="text-sm text-destructive animate-fade-in-up">{errors.confirmPassword}</p>
                      )}
                    </div>
                  )}

                  {/* Gender and DOB for signup */}
                  {!isLogin && (
                    <div className="grid grid-cols-2 gap-4 animate-fade-in-up">
                      <div className="space-y-2">
                        <Label htmlFor="gender">Gender</Label>
                        <select
                          id="gender"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                          value={formData.gender}
                          onChange={(e) => handleInputChange("gender", e.target.value)}
                        >
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="others">Others</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="dob">Date of Birth</Label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="dob"
                            type="date"
                            className={`pl-10 transition-all duration-300 focus:ring-2 focus:ring-primary/20 ${
                              errors.dateOfBirth ? "border-destructive focus:ring-destructive/20" : ""
                            }`}
                            value={formData.dateOfBirth}
                            onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                          />
                        </div>
                        {errors.dateOfBirth && (
                          <p className="text-sm text-destructive animate-fade-in-up">{errors.dateOfBirth}</p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Checkboxes */}
                  <div className="space-y-3">
                    {isLogin ? (
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="rememberMe"
                          checked={formData.rememberMe}
                          onCheckedChange={(checked) => handleInputChange("rememberMe", checked as boolean)}
                        />
                        <Label htmlFor="rememberMe" className="text-sm text-muted-foreground">
                          Remember me for 30 days
                        </Label>
                      </div>
                    ) : (
                      <div className="space-y-2 animate-fade-in-up">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="agreeToTerms"
                            checked={formData.agreeToTerms}
                            onCheckedChange={(checked) => handleInputChange("agreeToTerms", checked as boolean)}
                          />
                          <Label htmlFor="agreeToTerms" className="text-sm text-muted-foreground">
                            I agree to the{" "}
                            <a href="#" className="text-primary hover:underline">
                              Terms of Service
                            </a>{" "}
                            and{" "}
                            <a href="#" className="text-primary hover:underline">
                              Privacy Policy
                            </a>
                          </Label>
                        </div>
                        {errors.agreeToTerms && (
                          <p className="text-sm text-destructive animate-fade-in-up">{errors.agreeToTerms}</p>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className="w-full group transition-all duration-300 hover:shadow-lg"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin"></div>
                        <span>{isLogin ? "Signing in..." : "Creating account..."}</span>
                      </div>
                    ) : (
                      <>
                        {isLogin ? "Sign In" : "Create Account"}
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </Button>

                  {/* Forgot Password */}
                  {isLogin && (
                    <div className="text-center">
                      <a href="#" className="text-sm text-primary hover:underline">
                        Forgot your password?
                      </a>
                    </div>
                  )}
                </form>

                {/* Switch Mode */}
                <div className="text-center pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground">
                    {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                    <Button variant="link" className="p-0 h-auto text-primary hover:underline" onClick={switchMode}>
                      {isLogin ? "Sign up" : "Sign in"}
                    </Button>
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Additional Info */}
            <div className="text-center mt-8 space-y-2 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
              <p className="text-sm text-muted-foreground">Join over 15,000+ athletes already using KhelSetu</p>
              <div className="flex items-center justify-center space-x-4 text-xs text-muted-foreground">
                <span>🔒 Secure & Private</span>
                <span>⚡ Instant Access</span>
                <span>🏆 Trusted by Athletes</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
