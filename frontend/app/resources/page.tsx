"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import {
  Download,
  FileText,
  Video,
  BookOpen,
  MessageCircle,
  Mail,
  Phone,
  Clock,
  CheckCircle,
  HelpCircle,
  Search,
  Filter,
  Send,
  ExternalLink,
  PlayCircle,
} from "lucide-react"

export default function ResourcesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    category: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const faqs = [
    {
      id: "getting-started",
      question: "How do I get started with SportIndia?",
      answer:
        "Getting started is easy! Simply create an account, complete your athlete profile, and choose your first fitness test. Our platform will guide you through each step and provide detailed instructions for every assessment.",
      category: "general",
    },
    {
      id: "test-accuracy",
      question: "How accurate are the fitness assessments?",
      answer:
        "Our assessments are based on internationally recognized sports science protocols with 98% accuracy. All tests are validated by certified sports scientists and regularly updated to maintain the highest standards.",
      category: "testing",
    },
    {
      id: "equipment-needed",
      question: "What equipment do I need for the tests?",
      answer:
        "Most tests require minimal equipment like a stopwatch, measuring tape, and basic gym equipment. Each test page lists the specific equipment needed, and we provide alternatives for home-based assessments.",
      category: "testing",
    },
    {
      id: "data-privacy",
      question: "How is my personal data protected?",
      answer:
        "We take data privacy seriously. All personal information is encrypted and stored securely. We never share your data with third parties without explicit consent, and you have full control over your information.",
      category: "privacy",
    },
    {
      id: "subscription-plans",
      question: "What subscription plans are available?",
      answer:
        "We offer a free tier with basic assessments, a Premium plan with advanced analytics, and a Pro plan for coaches and institutions. All plans include access to our mobile app and basic support.",
      category: "billing",
    },
    {
      id: "mobile-app",
      question: "Is there a mobile app available?",
      answer:
        "Yes! Our mobile app is available for both iOS and Android. It includes all the features of the web platform plus offline test recording and GPS-based running assessments.",
      category: "technical",
    },
    {
      id: "coach-features",
      question: "Can coaches manage multiple athletes?",
      answer:
        "Our Coach Dashboard allows you to manage unlimited athletes, create custom test protocols, track team progress, and generate comprehensive reports for performance analysis.",
      category: "coaching",
    },
    {
      id: "international-standards",
      question: "Are the tests based on international standards?",
      answer:
        "Yes, all our fitness tests follow international protocols from organizations like ACSM, NSCA, and FIFA. We adapt these standards specifically for Indian athletes while maintaining global compatibility.",
      category: "testing",
    },
  ]

  const resources = [
    {
      id: 1,
      title: "Complete Fitness Testing Protocol",
      description: "Comprehensive guide covering all fitness tests with step-by-step instructions",
      type: "PDF Guide",
      size: "2.4 MB",
      downloads: 1247,
      category: "protocols",
      icon: <FileText className="h-6 w-6" />,
      color: "bg-primary",
    },
    {
      id: 2,
      title: "Endurance Training Manual",
      description: "Advanced training methods for improving cardiovascular fitness",
      type: "PDF Manual",
      size: "3.1 MB",
      downloads: 892,
      category: "training",
      icon: <BookOpen className="h-6 w-6" />,
      color: "bg-secondary",
    },
    {
      id: 3,
      title: "Proper Form Video Series",
      description: "Video demonstrations of correct technique for all fitness tests",
      type: "Video Series",
      size: "45 min",
      downloads: 2156,
      category: "videos",
      icon: <Video className="h-6 w-6" />,
      color: "bg-accent",
    },
    {
      id: 4,
      title: "Nutrition Guidelines for Athletes",
      description: "Evidence-based nutrition recommendations for optimal performance",
      type: "PDF Guide",
      size: "1.8 MB",
      downloads: 1534,
      category: "nutrition",
      icon: <FileText className="h-6 w-6" />,
      color: "bg-primary",
    },
    {
      id: 5,
      title: "Injury Prevention Protocols",
      description: "Comprehensive guide to preventing common sports injuries",
      type: "PDF Protocol",
      size: "2.7 MB",
      downloads: 967,
      category: "health",
      icon: <BookOpen className="h-6 w-6" />,
      color: "bg-secondary",
    },
    {
      id: 6,
      title: "Coach Training Webinar",
      description: "Live webinar on using SportIndia for team management",
      type: "Webinar",
      size: "90 min",
      downloads: 445,
      category: "coaching",
      icon: <PlayCircle className="h-6 w-6" />,
      color: "bg-accent",
    },
  ]

  const supportChannels = [
    {
      title: "Email Support",
      description: "Get detailed help via email",
      contact: "support@sportindia.com",
      responseTime: "Within 24 hours",
      icon: <Mail className="h-6 w-6" />,
      color: "bg-primary",
    },
    {
      title: "Live Chat",
      description: "Instant help during business hours",
      contact: "Available 9 AM - 6 PM IST",
      responseTime: "Immediate",
      icon: <MessageCircle className="h-6 w-6" />,
      color: "bg-secondary",
    },
    {
      title: "Phone Support",
      description: "Speak directly with our team",
      contact: "+91 1800-SPORT-IN",
      responseTime: "Mon-Fri, 9 AM - 6 PM",
      icon: <Phone className="h-6 w-6" />,
      color: "bg-accent",
    },
  ]

  const filteredFAQs = faqs.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || faq.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    const newErrors: Record<string, string> = {}
    if (!contactForm.name) newErrors.name = "Name is required"
    if (!contactForm.email) newErrors.email = "Email is required"
    if (!contactForm.subject) newErrors.subject = "Subject is required"
    if (!contactForm.category) newErrors.category = "Category is required"
    if (!contactForm.message) newErrors.message = "Message is required"

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsSubmitting(false)

    // Reset form
    setContactForm({
      name: "",
      email: "",
      subject: "",
      category: "",
      message: "",
    })
    setErrors({})
  }

  const handleInputChange = (field: string, value: string) => {
    setContactForm((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="py-16 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-6 max-w-4xl mx-auto">
            <Badge variant="secondary" className="text-sm px-4 py-2">
              Help & Resources
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-bold text-balance animate-fade-in-up">Resources & Support</h1>
            <p
              className="text-xl text-muted-foreground text-pretty animate-fade-in-up"
              style={{ animationDelay: "0.2s" }}
            >
              Everything you need to succeed with SportIndia. Find guides, protocols, and get the support you need.
            </p>
          </div>
        </div>
      </section>

      {/* Support Channels */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold">Get Help When You Need It</h2>
            <p className="text-lg text-muted-foreground">Multiple ways to reach our support team</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {supportChannels.map((channel, index) => (
              <Card
                key={channel.title}
                className="text-center group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <div
                    className={`w-16 h-16 ${channel.color} rounded-full flex items-center justify-center mx-auto mb-4 text-white group-hover:scale-110 transition-transform`}
                  >
                    {channel.icon}
                  </div>
                  <CardTitle className="text-xl">{channel.title}</CardTitle>
                  <CardDescription>{channel.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="font-medium">{channel.contact}</p>
                  <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {channel.responseTime}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold">Download Resources</h2>
            <p className="text-lg text-muted-foreground">Comprehensive guides and protocols to enhance your training</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map((resource, index) => (
              <Card
                key={resource.id}
                className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div
                      className={`w-12 h-12 ${resource.color} rounded-lg flex items-center justify-center text-white group-hover:scale-110 transition-transform`}
                    >
                      {resource.icon}
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {resource.type}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{resource.title}</CardTitle>
                  <CardDescription>{resource.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{resource.size}</span>
                    <div className="flex items-center gap-1">
                      <Download className="h-3 w-3" />
                      {resource.downloads.toLocaleString()}
                    </div>
                  </div>
                  <Button className="w-full group">
                    <Download className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                    Download
                    <ExternalLink className="h-3 w-3 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
            <p className="text-lg text-muted-foreground">Find answers to common questions about SportIndia</p>
          </div>

          {/* FAQ Search and Filter */}
          <div className="max-w-2xl mx-auto mb-8 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search FAQs..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Category:</span>
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="All categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="general">General</SelectItem>
                  <SelectItem value="testing">Testing</SelectItem>
                  <SelectItem value="privacy">Privacy</SelectItem>
                  <SelectItem value="billing">Billing</SelectItem>
                  <SelectItem value="technical">Technical</SelectItem>
                  <SelectItem value="coaching">Coaching</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* FAQ Accordion */}
          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {filteredFAQs.map((faq, index) => (
                <Card key={faq.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 0.05}s` }}>
                  <AccordionItem value={faq.id} className="border-none">
                    <AccordionTrigger className="px-6 py-4 hover:no-underline">
                      <div className="flex items-center gap-3 text-left">
                        <HelpCircle className="h-5 w-5 text-primary flex-shrink-0" />
                        <span className="font-medium">{faq.question}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                        <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Card>
              ))}
            </Accordion>

            {filteredFAQs.length === 0 && (
              <div className="text-center py-12">
                <HelpCircle className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No FAQs found</h3>
                <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl font-bold">Still Need Help?</h2>
              <p className="text-lg text-muted-foreground">Send us a message and we'll get back to you soon</p>
            </div>

            <Card className="animate-fade-in-up">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5" />
                  Contact Support
                </CardTitle>
                <CardDescription>Fill out the form below and our team will respond within 24 hours</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleContactSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        placeholder="Enter your name"
                        className={`transition-all duration-300 focus:ring-2 focus:ring-primary/20 ${
                          errors.name ? "border-destructive focus:ring-destructive/20" : ""
                        }`}
                        value={contactForm.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                      />
                      {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        className={`transition-all duration-300 focus:ring-2 focus:ring-primary/20 ${
                          errors.email ? "border-destructive focus:ring-destructive/20" : ""
                        }`}
                        value={contactForm.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                      />
                      {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        placeholder="Brief description of your issue"
                        className={`transition-all duration-300 focus:ring-2 focus:ring-primary/20 ${
                          errors.subject ? "border-destructive focus:ring-destructive/20" : ""
                        }`}
                        value={contactForm.subject}
                        onChange={(e) => handleInputChange("subject", e.target.value)}
                      />
                      {errors.subject && <p className="text-sm text-destructive">{errors.subject}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select
                        value={contactForm.category}
                        onValueChange={(value) => handleInputChange("category", value)}
                      >
                        <SelectTrigger className={errors.category ? "border-destructive" : ""}>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="technical">Technical Support</SelectItem>
                          <SelectItem value="billing">Billing & Payments</SelectItem>
                          <SelectItem value="testing">Testing Issues</SelectItem>
                          <SelectItem value="account">Account Management</SelectItem>
                          <SelectItem value="feature">Feature Request</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.category && <p className="text-sm text-destructive">{errors.category}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Describe your issue or question in detail..."
                      rows={5}
                      className={`transition-all duration-300 focus:ring-2 focus:ring-primary/20 ${
                        errors.message ? "border-destructive focus:ring-destructive/20" : ""
                      }`}
                      value={contactForm.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                    />
                    {errors.message && <p className="text-sm text-destructive">{errors.message}</p>}
                  </div>

                  <Button type="submit" className="w-full group" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin"></div>
                        <span>Sending...</span>
                      </div>
                    ) : (
                      <>
                        Send Message
                        <Send className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
