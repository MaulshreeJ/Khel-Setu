"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Users, Target, Activity, Timer, Zap } from "lucide-react"

const heroImages = [
  { src: "/images/carousel/sprint.png", alt: "Sprint Training", label: "Endurance" },
  { src: "/images/carousel/strength.png", alt: "Strength Training", label: "Strength" },
  { src: "/images/carousel/flexibility.png", alt: "Flexibility Training", label: "Flexibility" },
  { src: "/images/carousel/agility.png", alt: "Agility Training", label: "Agility" },
  { src: "/images/carousel/cricket.png", alt: "Cricket Training", label: "Cricket" },
]

const heroTaglines = [
  { text: "Elevate Indian Sports with", highlight: "Smart Assessment" },
  { text: "Unleash Athletic Potential with", highlight: "AI Analytics" },
  { text: "Build Champions Through", highlight: "Data-Driven Training" },
  { text: "Transform Performance with", highlight: "Scientific Testing" },
  { text: "Power India's Athletes with", highlight: "Modern Technology" },
]

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [currentTagline, setCurrentTagline] = useState(0)
  const [taglineVisible, setTaglineVisible] = useState(true)

  // Auto-rotate carousel every 4 seconds
  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length)
  }, [])

  useEffect(() => {
    const timer = setInterval(nextSlide, 4000)
    return () => clearInterval(timer)
  }, [nextSlide])

  // Auto-rotate taglines every 3.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setTaglineVisible(false)
      setTimeout(() => {
        setCurrentTagline((prev) => (prev + 1) % heroTaglines.length)
        setTaglineVisible(true)
      }, 500)
    }, 3500)
    return () => clearInterval(timer)
  }, [])

  const [animatedStats, setAnimatedStats] = useState({
    athletes: 0,
    events: 0,
    tests: 0,
  })

  useEffect(() => {
    const targetStats = { athletes: 15000, events: 250, tests: 50 }
    const duration = 2000 // 2 seconds
    const steps = 60
    const stepDuration = duration / steps

    let currentStep = 0
    const interval = setInterval(() => {
      currentStep++
      const progress = currentStep / steps

      setAnimatedStats({
        athletes: Math.floor(targetStats.athletes * progress),
        events: Math.floor(targetStats.events * progress),
        tests: Math.floor(targetStats.tests * progress),
      })

      if (currentStep >= steps) {
        clearInterval(interval)
        setAnimatedStats(targetStats)
      }
    }, stepDuration)

    return () => clearInterval(interval)
  }, [])

  const sportsCategories = [
    {
      title: "Endurance Tests",
      description: "Cardiovascular fitness assessments",
      icon: <Activity className="h-8 w-8" />,
      tests: ["12-min Run", "Shuttle Run", "Step Test"],
      color: "bg-primary",
    },
    {
      title: "Strength Tests",
      description: "Muscular strength and power evaluation",
      icon: <Zap className="h-8 w-8" />,
      tests: ["Push-ups", "Pull-ups", "Vertical Jump"],
      color: "bg-secondary",
    },
    {
      title: "Agility Tests",
      description: "Speed and coordination assessments",
      icon: <Timer className="h-8 w-8" />,
      tests: ["T-Test", "Cone Drill", "Ladder Drill"],
      color: "bg-accent",
    },
    {
      title: "Flexibility Tests",
      description: "Range of motion evaluations",
      icon: <Target className="h-8 w-8" />,
      tests: ["Sit & Reach", "Shoulder Mobility", "Hip Flexibility"],
      color: "bg-muted",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />
        <div className="container mx-auto px-4 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in-up">
              <div className="space-y-4">
                <Badge variant="secondary" className="text-sm px-3 py-1">
                  AI-Powered Sports Assessment
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight min-h-[1em]">
                  <span
                    className="inline-block transition-all duration-500"
                    style={{
                      opacity: taglineVisible ? 1 : 0,
                      transform: taglineVisible ? "translateY(0)" : "translateY(20px)",
                    }}
                  >
                    {heroTaglines[currentTagline].text.split(" ").map((word, i) => (
                      <span
                        key={`${currentTagline}-${i}`}
                        className="inline-block animate-[wordSlideIn_0.5s_ease-out_forwards] opacity-0"
                        style={{ animationDelay: `${i * 0.08}s` }}
                      >
                        {word}&nbsp;
                      </span>
                    ))}
                  </span>
                  <br />
                  <span
                    className="inline-block text-primary transition-all duration-500"
                    style={{
                      opacity: taglineVisible ? 1 : 0,
                      transform: taglineVisible ? "translateY(0) scale(1)" : "translateY(20px) scale(0.95)",
                      transitionDelay: "0.2s",
                    }}
                  >
                    {heroTaglines[currentTagline].highlight.split(" ").map((word, i) => (
                      <span
                        key={`${currentTagline}-hl-${i}`}
                        className="inline-block animate-[wordSlideIn_0.5s_ease-out_forwards] opacity-0"
                        style={{ animationDelay: `${(heroTaglines[currentTagline].text.split(" ").length + i) * 0.08 + 0.15}s` }}
                      >
                        {word}&nbsp;
                      </span>
                    ))}
                  </span>
                </h1>
                <p className="text-xl text-muted-foreground text-pretty max-w-2xl">
                  Comprehensive fitness testing platform designed for Indian athletes. Track performance, analyze data,
                  and unlock your sporting potential with AI-driven insights.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="group">
                  Start Assessment
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button variant="outline" size="lg">
                  Watch Demo
                </Button>
              </div>

              {/* Animated Statistics */}
              <div className="grid grid-cols-3 gap-6 pt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">{animatedStats.athletes.toLocaleString()}+</div>
                  <div className="text-sm text-muted-foreground">Athletes Assessed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-secondary">{animatedStats.events}+</div>
                  <div className="text-sm text-muted-foreground">Events Conducted</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent">{animatedStats.tests}+</div>
                  <div className="text-sm text-muted-foreground">Fitness Tests</div>
                </div>
              </div>
            </div>

            <div className="relative animate-fade-in-right">
              {/* Image Carousel */}
              <div className="relative w-full aspect-[5/6] rounded-2xl shadow-2xl overflow-hidden">
                {heroImages.map((image, index) => (
                  <div
                    key={image.src}
                    className="absolute inset-0 transition-all duration-700 ease-in-out"
                    style={{
                      opacity: currentSlide === index ? 1 : 0,
                      transform: currentSlide === index ? "scale(1)" : "scale(1.05)",
                    }}
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                {/* Category label */}
                <div className="absolute bottom-16 left-4">
                  <span className="inline-block bg-primary/90 text-white text-sm font-semibold px-4 py-1.5 rounded-full backdrop-blur-sm">
                    {heroImages[currentSlide].label}
                  </span>
                </div>

                {/* Dot indicators */}
                <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
                  {heroImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        currentSlide === index
                          ? "w-7 bg-white"
                          : "w-2 bg-white/50 hover:bg-white/75"
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>

                {/* Progress bar */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
                  <div
                    className="h-full bg-primary transition-none"
                    style={{
                      animation: "progressBar 4s linear infinite",
                    }}
                  />
                </div>
              </div>

              {/* Floating Cards */}
              <div className="absolute -top-4 -left-4 bg-card border border-border rounded-lg p-4 shadow-lg animate-float">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-secondary rounded-full animate-pulse" />
                  <span className="text-sm font-medium">Live Assessment</span>
                </div>
              </div>

              <div
                className="absolute -bottom-4 -right-4 bg-card border border-border rounded-lg p-4 shadow-lg animate-float"
                style={{ animationDelay: "1s" }}
              >
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">1,247 Online</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sports Categories */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-balance">Comprehensive Fitness Testing</h2>
            <p className="text-xl text-muted-foreground text-pretty max-w-3xl mx-auto">
              Our platform offers a wide range of standardized fitness tests designed specifically for Indian athletes
              across all sports disciplines.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sportsCategories.map((category, index) => (
              <Card
                key={category.title}
                className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader className="text-center">
                  <div
                    className={`w-16 h-16 ${category.color} rounded-full flex items-center justify-center mx-auto mb-4 text-white group-hover:scale-110 transition-transform`}
                  >
                    {category.icon}
                  </div>
                  <CardTitle className="text-xl">{category.title}</CardTitle>
                  <CardDescription>{category.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {category.tests.map((test) => (
                      <div key={test} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-primary rounded-full" />
                        <span className="text-sm text-muted-foreground">{test}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-primary to-secondary rounded-3xl p-12 text-center text-white">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-balance">
              Ready to Transform Your Athletic Journey?
            </h2>
            <p className="text-xl opacity-90 mb-8 text-pretty max-w-2xl mx-auto">
              Join thousands of Indian athletes who are already using our platform to track, analyze, and improve their
              performance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="group">
                Start Free Assessment
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-primary bg-transparent"
              >
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
