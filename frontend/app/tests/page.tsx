"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Activity, Timer, Zap, Target, Users, Clock, TrendingUp, Star, Play, Filter } from "lucide-react"

export default function TestsPage() {
  const router = useRouter()
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedDifficulty, setSelectedDifficulty] = useState("all")

  const testCategories = [
    { id: "endurance", name: "Endurance", icon: <Activity className="h-5 w-5" />, color: "bg-primary" },
    { id: "strength", name: "Strength", icon: <Zap className="h-5 w-5" />, color: "bg-secondary" },
    { id: "agility", name: "Agility", icon: <Timer className="h-5 w-5" />, color: "bg-accent" },
    { id: "flexibility", name: "Flexibility", icon: <Target className="h-5 w-5" />, color: "bg-muted" },
  ]

  const fitnessTests = [
    {
      id: 1,
      name: "12-Minute Run Test",
      assessmentRoute: null,
      category: "endurance",
      difficulty: "intermediate",
      duration: "12 min",
      description: "Measures cardiovascular endurance by tracking distance covered in 12 minutes",
      instructions: [
        "Warm up with light jogging for 5 minutes",
        "Run at a steady pace for exactly 12 minutes",
        "Track total distance covered",
        "Cool down with walking for 5 minutes",
      ],
      benchmarks: {
        excellent: { male: "> 2800m", female: "> 2300m" },
        good: { male: "2400-2800m", female: "2000-2300m" },
        average: { male: "2000-2400m", female: "1600-2000m" },
        poor: { male: "< 2000m", female: "< 1600m" },
      },
      equipment: ["Running track", "Stopwatch", "Distance markers"],
      tips: "Maintain consistent pace throughout the test",
    },
    {
      id: 2,
      name: "Push-Up Test",
      assessmentRoute: "/assessment-pushup",
      category: "strength",
      difficulty: "beginner",
      duration: "2 min",
      description: "Evaluates upper body muscular strength and endurance",
      instructions: [
        "Start in plank position with hands shoulder-width apart",
        "Lower body until chest nearly touches ground",
        "Push back up to starting position",
        "Count maximum repetitions in 2 minutes",
      ],
      benchmarks: {
        excellent: { male: "> 47", female: "> 36" },
        good: { male: "35-47", female: "25-36" },
        average: { male: "20-35", female: "15-25" },
        poor: { male: "< 20", female: "< 15" },
      },
      equipment: ["Exercise mat"],
      tips: "Keep core engaged and maintain proper form",
    },
    {
      id: 3,
      name: "Vertical Jump Test",
      assessmentRoute: "/assessment-vertical-jump",
      category: "strength",
      difficulty: "intermediate",
      duration: "5 min",
      description: "Measures explosive leg power and jumping ability",
      instructions: [
        "Stand with side to wall, arm extended up",
        "Mark highest reach point",
        "Jump as high as possible, marking peak height",
        "Take best of 3 attempts",
      ],
      benchmarks: {
        excellent: { male: "> 65cm", female: "> 58cm" },
        good: { male: "50-65cm", female: "42-58cm" },
        average: { male: "40-50cm", female: "32-42cm" },
        poor: { male: "< 40cm", female: "< 32cm" },
      },
      equipment: ["Wall", "Measuring tape", "Chalk"],
      tips: "Use arm swing for maximum height",
    },
    {
      id: 4,
      name: "Shuttle Run Test",
      assessmentRoute: null,
      category: "agility",
      difficulty: "intermediate",
      duration: "3 min",
      description: "Tests speed, agility, and change of direction ability",
      instructions: [
        "Set up two lines 20 meters apart",
        "Sprint to far line and back",
        "Complete specified number of shuttles",
        "Record total time",
      ],
      benchmarks: {
        excellent: { male: "< 9.5s", female: "< 10.5s" },
        good: { male: "9.5-10.5s", female: "10.5-11.5s" },
        average: { male: "10.5-11.5s", female: "11.5-12.5s" },
        poor: { male: "> 11.5s", female: "> 12.5s" },
      },
      equipment: ["Cones", "Stopwatch", "Measuring tape"],
      tips: "Focus on quick direction changes",
    },
    {
      id: 5,
      name: "Sit and Reach Test",
      assessmentRoute: null,
      category: "flexibility",
      difficulty: "beginner",
      duration: "5 min",
      description: "Measures lower back and hamstring flexibility",
      instructions: [
        "Sit with legs extended, feet against box",
        "Reach forward slowly with both hands",
        "Hold maximum reach for 2 seconds",
        "Record distance reached",
      ],
      benchmarks: {
        excellent: { male: "> 39cm", female: "> 41cm" },
        good: { male: "34-39cm", female: "37-41cm" },
        average: { male: "28-34cm", female: "33-37cm" },
        poor: { male: "< 28cm", female: "< 33cm" },
      },
      equipment: ["Sit and reach box", "Measuring ruler"],
      tips: "Warm up with light stretching first",
    },
    {
      id: 6,
      name: "Plank Hold Test",
      assessmentRoute: "/assessment-plank",
      category: "strength",
      difficulty: "beginner",
      duration: "Until failure",
      description: "Evaluates core strength and stability",
      instructions: [
        "Start in forearm plank position",
        "Keep body straight from head to heels",
        "Hold position as long as possible",
        "Stop when form breaks down",
      ],
      benchmarks: {
        excellent: { male: "> 120s", female: "> 90s" },
        good: { male: "90-120s", female: "60-90s" },
        average: { male: "60-90s", female: "30-60s" },
        poor: { male: "< 60s", female: "< 30s" },
      },
      equipment: ["Exercise mat", "Stopwatch"],
      tips: "Breathe steadily and engage core muscles",
    },
  ]

  const filteredTests = fitnessTests.filter((test) => {
    const categoryMatch = selectedCategory === "all" || test.category === selectedCategory
    const difficultyMatch = selectedDifficulty === "all" || test.difficulty === selectedDifficulty
    return categoryMatch && difficultyMatch
  })

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "bg-secondary text-secondary-foreground"
      case "intermediate":
        return "bg-primary text-primary-foreground"
      case "advanced":
        return "bg-destructive text-destructive-foreground"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getBenchmarkProgress = (level: string) => {
    switch (level) {
      case "excellent":
        return 90
      case "good":
        return 70
      case "average":
        return 50
      case "poor":
        return 25
      default:
        return 0
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <section className="py-16 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-6 max-w-4xl mx-auto">
            <Badge variant="secondary" className="text-sm px-3 py-1">
              Comprehensive Fitness Assessment
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-bold text-balance">Sports Fitness Tests</h1>
            <p className="text-xl text-muted-foreground text-pretty">
              Discover your athletic potential with our scientifically-backed fitness tests. Each assessment is designed
              to evaluate specific aspects of physical performance.
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{fitnessTests.length}</div>
                <div className="text-sm text-muted-foreground">Total Tests</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary">4</div>
                <div className="text-sm text-muted-foreground">Categories</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">15K+</div>
                <div className="text-sm text-muted-foreground">Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">98%</div>
                <div className="text-sm text-muted-foreground">Accuracy</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters and Categories */}
      <section className="py-8 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
            {/* Category Tabs */}
            <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full lg:w-auto">
              <TabsList className="grid w-full grid-cols-5 lg:w-auto">
                <TabsTrigger value="all">All Tests</TabsTrigger>
                {testCategories.map((category) => (
                  <TabsTrigger key={category.id} value={category.id} className="flex items-center gap-2">
                    {category.icon}
                    <span className="hidden sm:inline">{category.name}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            {/* Difficulty Filter */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Difficulty:</span>
              </div>
              <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="All levels" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Tests Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8">
            {filteredTests.map((test, index) => (
              <Card
                key={test.id}
                className="group hover:shadow-lg transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-10 h-10 ${testCategories.find((c) => c.id === test.category)?.color} rounded-lg flex items-center justify-center text-white`}
                        >
                          {testCategories.find((c) => c.id === test.category)?.icon}
                        </div>
                        <div>
                          <CardTitle className="text-lg">{test.name}</CardTitle>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge className={getDifficultyColor(test.difficulty)} variant="secondary">
                              {test.difficulty}
                            </Badge>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              {test.duration}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      className="group-hover:scale-105 transition-transform"
                      disabled={!test.assessmentRoute}
                      onClick={() => test.assessmentRoute && router.push(test.assessmentRoute)}
                    >
                      <Play className="h-4 w-4 mr-1" />
                      {test.assessmentRoute ? "Start Test" : "Coming Soon"}
                    </Button>
                  </div>
                  <CardDescription className="text-base">{test.description}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Benchmark Progress */}
                  <div className="space-y-3">
                    <h4 className="font-medium flex items-center gap-2">
                      <TrendingUp className="h-4 w-4" />
                      Performance Benchmarks
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                      {Object.entries(test.benchmarks).map(([level, values]) => (
                        <div key={level} className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="capitalize font-medium">{level}</span>
                            <div className="flex items-center gap-1">
                              <Users className="h-3 w-3" />
                              <span className="text-xs text-muted-foreground">
                                {level === "excellent"
                                  ? "10%"
                                  : level === "good"
                                    ? "25%"
                                    : level === "average"
                                      ? "40%"
                                      : "25%"}
                              </span>
                            </div>
                          </div>
                          <Progress value={getBenchmarkProgress(level)} className="h-2" />
                          <div className="text-xs text-muted-foreground">
                            M: {values.male} | F: {values.female}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Expandable Details */}
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="instructions" className="border-none">
                      <AccordionTrigger className="text-sm font-medium hover:no-underline py-2">
                        Test Instructions
                      </AccordionTrigger>
                      <AccordionContent className="space-y-3">
                        <ol className="space-y-2">
                          {test.instructions.map((instruction, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm">
                              <span className="w-5 h-5 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0 mt-0.5">
                                {idx + 1}
                              </span>
                              {instruction}
                            </li>
                          ))}
                        </ol>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="equipment" className="border-none">
                      <AccordionTrigger className="text-sm font-medium hover:no-underline py-2">
                        Required Equipment
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="flex flex-wrap gap-2">
                          {test.equipment.map((item, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {item}
                            </Badge>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="tips" className="border-none">
                      <AccordionTrigger className="text-sm font-medium hover:no-underline py-2">
                        Pro Tips
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="flex items-start gap-2 text-sm">
                          <Star className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                          {test.tips}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredTests.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-2">No tests found</h3>
              <p className="text-muted-foreground">Try adjusting your filters to see more tests.</p>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-6 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-balance">Ready to Test Your Limits?</h2>
            <p className="text-lg text-muted-foreground text-pretty">
              Create your personalized fitness assessment plan and track your progress over time.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="group">
                Create Test Plan
                <TrendingUp className="ml-2 h-4 w-4 group-hover:scale-110 transition-transform" />
              </Button>
              <Button variant="outline" size="lg">
                View Sample Results
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
