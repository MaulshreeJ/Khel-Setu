"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Trophy,
  Target,
  Users,
  Heart,
  Award,
  MapPin,
  Mail,
  Linkedin,
  Twitter,
  Star,
  TrendingUp,
  Globe,
  Zap,
  Activity,
} from "lucide-react"

export default function AboutPage() {
  const [visibleTimelineItems, setVisibleTimelineItems] = useState<number[]>([])

  // Animate timeline items on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number.parseInt(entry.target.getAttribute("data-index") || "0")
            setVisibleTimelineItems((prev) => [...prev, index])
          }
        })
      },
      { threshold: 0.3 },
    )

    const timelineItems = document.querySelectorAll(".timeline-item")
    timelineItems.forEach((item) => observer.observe(item))

    return () => observer.disconnect()
  }, [])

  const milestones = [
    {
      year: "2020",
      title: "Vision Born",
      description: "Identified the need for standardized fitness assessment in Indian sports",
      icon: <Target className="h-6 w-6" />,
      color: "bg-primary",
    },
    {
      year: "2021",
      title: "Research & Development",
      description: "Collaborated with sports scientists and AI experts to develop assessment algorithms",
      icon: <Activity className="h-6 w-6" />,
      color: "bg-secondary",
    },
    {
      year: "2022",
      title: "Pilot Program",
      description: "Launched pilot testing with 500 athletes across 5 states",
      icon: <Users className="h-6 w-6" />,
      color: "bg-accent",
    },
    {
      year: "2023",
      title: "National Expansion",
      description: "Scaled to 15,000+ athletes with partnerships across India",
      icon: <Globe className="h-6 w-6" />,
      color: "bg-primary",
    },
    {
      year: "2024",
      title: "AI Integration",
      description: "Launched advanced AI-powered performance analytics and predictions",
      icon: <Zap className="h-6 w-6" />,
      color: "bg-secondary",
    },
  ]

  const teamMembers = [
    {
      name: "Dr. Rajesh Kumar",
      role: "Founder & CEO",
      bio: "Former Olympic coach with 20+ years in sports science",
      avatar: "/placeholder.svg?height=120&width=120",
      location: "New Delhi",
      social: {
        linkedin: "#",
        twitter: "#",
        email: "rajesh@sportindia.com",
      },
    },
    {
      name: "Priya Sharma",
      role: "Head of Technology",
      bio: "AI/ML expert specializing in sports analytics",
      avatar: "/placeholder.svg?height=120&width=120",
      location: "Bangalore",
      social: {
        linkedin: "#",
        twitter: "#",
        email: "priya@sportindia.com",
      },
    },
    {
      name: "Arjun Patel",
      role: "Sports Science Director",
      bio: "PhD in Exercise Physiology, former national athlete",
      avatar: "/placeholder.svg?height=120&width=120",
      location: "Mumbai",
      social: {
        linkedin: "#",
        twitter: "#",
        email: "arjun@sportindia.com",
      },
    },
    {
      name: "Sneha Gupta",
      role: "Head of Operations",
      bio: "Operations expert with experience in scaling sports programs",
      avatar: "/placeholder.svg?height=120&width=120",
      location: "Chennai",
      social: {
        linkedin: "#",
        twitter: "#",
        email: "sneha@sportindia.com",
      },
    },
  ]

  const stats = [
    { label: "Athletes Assessed", value: "15,000+", icon: <Users className="h-6 w-6" /> },
    { label: "States Covered", value: "28", icon: <MapPin className="h-6 w-6" /> },
    { label: "Sports Disciplines", value: "25+", icon: <Trophy className="h-6 w-6" /> },
    { label: "Assessment Accuracy", value: "98%", icon: <Target className="h-6 w-6" /> },
  ]

  const values = [
    {
      title: "Excellence",
      description: "Striving for the highest standards in sports assessment and athlete development",
      icon: <Award className="h-8 w-8" />,
      color: "bg-primary",
    },
    {
      title: "Innovation",
      description: "Leveraging cutting-edge technology to revolutionize sports science in India",
      icon: <Zap className="h-8 w-8" />,
      color: "bg-secondary",
    },
    {
      title: "Inclusivity",
      description: "Making world-class fitness assessment accessible to athletes across all backgrounds",
      icon: <Heart className="h-8 w-8" />,
      color: "bg-accent",
    },
    {
      title: "Integrity",
      description: "Maintaining transparency and fairness in all our assessments and processes",
      icon: <Star className="h-8 w-8" />,
      color: "bg-primary",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 lg:py-32 relative overflow-hidden">
        {/* Indian cultural pattern background */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-32 h-32 border-2 border-primary rounded-full"></div>
          <div className="absolute top-32 right-20 w-24 h-24 border-2 border-secondary rounded-full"></div>
          <div className="absolute bottom-20 left-32 w-40 h-40 border-2 border-accent rounded-full"></div>
          <div className="absolute bottom-32 right-10 w-28 h-28 border-2 border-primary rounded-full"></div>
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="text-center space-y-8 max-w-4xl mx-auto">
            <Badge variant="secondary" className="text-sm px-4 py-2">
              Empowering Indian Sports Since 2020
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold text-balance animate-fade-in-up">
              Transforming Indian Sports Through
              <span className="text-primary"> Smart Assessment</span>
            </h1>
            <p
              className="text-xl text-muted-foreground text-pretty max-w-3xl mx-auto animate-fade-in-up"
              style={{ animationDelay: "0.2s" }}
            >
              We believe every Indian athlete deserves access to world-class fitness assessment tools. Our AI-powered
              platform is democratizing sports science across the nation.
            </p>

            {/* Stats */}
            <div
              className="grid grid-cols-2 lg:grid-cols-4 gap-8 pt-12 animate-fade-in-up"
              style={{ animationDelay: "0.4s" }}
            >
              {stats.map((stat, index) => (
                <div key={stat.label} className="text-center space-y-2">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary">
                    {stat.icon}
                  </div>
                  <div className="text-2xl lg:text-3xl font-bold">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in-up">
              <div className="space-y-4">
                <h2 className="text-3xl lg:text-4xl font-bold text-balance">Our Mission</h2>
                <p className="text-lg text-muted-foreground text-pretty">
                  To democratize access to world-class sports science and fitness assessment tools, empowering every
                  Indian athlete to reach their full potential through data-driven insights.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl font-bold">Our Vision</h3>
                <p className="text-lg text-muted-foreground text-pretty">
                  A future where every athlete in India, regardless of their background or location, has access to the
                  same level of sports science support as Olympic champions.
                </p>
              </div>

              <Button size="lg" className="group">
                Join Our Mission
                <TrendingUp className="ml-2 h-4 w-4 group-hover:scale-110 transition-transform" />
              </Button>
            </div>

            <div className="relative animate-fade-in-right">
              <img
                src="/indian-athletes-training-together-in-diverse-sport.jpg"
                alt="Indian athletes training"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-balance">Our Journey</h2>
            <p className="text-xl text-muted-foreground text-pretty max-w-3xl mx-auto">
              From a vision to transform Indian sports to a platform serving thousands of athletes nationwide
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-border"></div>

            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div
                  key={milestone.year}
                  className={`timeline-item flex items-center ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"} ${visibleTimelineItems.includes(index) ? "animate-fade-in-up" : "opacity-0"}`}
                  data-index={index}
                >
                  <div className={`w-1/2 ${index % 2 === 0 ? "pr-8 text-right" : "pl-8 text-left"}`}>
                    <Card className="hover:shadow-lg transition-all duration-300">
                      <CardHeader>
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-12 h-12 ${milestone.color} rounded-full flex items-center justify-center text-white`}
                          >
                            {milestone.icon}
                          </div>
                          <div>
                            <Badge variant="outline" className="mb-2">
                              {milestone.year}
                            </Badge>
                            <CardTitle className="text-lg">{milestone.title}</CardTitle>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">{milestone.description}</p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Timeline dot */}
                  <div className="relative z-10">
                    <div className={`w-4 h-4 ${milestone.color} rounded-full border-4 border-background`}></div>
                  </div>

                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-balance">Our Values</h2>
            <p className="text-xl text-muted-foreground text-pretty max-w-3xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card
                key={value.title}
                className="text-center group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <div
                    className={`w-16 h-16 ${value.color} rounded-full flex items-center justify-center mx-auto mb-4 text-white group-hover:scale-110 transition-transform`}
                  >
                    {value.icon}
                  </div>
                  <CardTitle className="text-xl">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-balance">Meet Our Team</h2>
            <p className="text-xl text-muted-foreground text-pretty max-w-3xl mx-auto">
              Passionate experts dedicated to revolutionizing Indian sports
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <Card
                key={member.name}
                className="text-center group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <Avatar className="w-24 h-24 mx-auto mb-4 group-hover:scale-105 transition-transform">
                    <AvatarImage src={member.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="text-lg">
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <CardTitle className="text-lg">{member.name}</CardTitle>
                  <CardDescription className="text-primary font-medium">{member.role}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{member.bio}</p>
                  <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    {member.location}
                  </div>
                  <div className="flex items-center justify-center space-x-3">
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                      <Mail className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                      <Linkedin className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                      <Twitter className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-8 text-white">
            <h2 className="text-3xl lg:text-4xl font-bold text-balance">Ready to Join the Revolution?</h2>
            <p className="text-xl opacity-90 text-pretty max-w-2xl mx-auto">
              Be part of India's sports transformation. Whether you're an athlete, coach, or sports enthusiast, there's
              a place for you in our mission.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="group">
                Start Your Journey
                <Trophy className="ml-2 h-4 w-4 group-hover:scale-110 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-primary bg-transparent"
              >
                Partner With Us
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
