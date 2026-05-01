"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { getCurrentUser, getUserAssessments } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Trophy,
  TrendingUp,
  Target,
  Calendar,
  Activity,
  Timer,
  Zap,
  Medal,
  ArrowUp,
  ArrowDown,
  CheckCircle,
  Camera,
} from "lucide-react"
import Link from "next/link"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<{ full_name: string; phone_number: string } | null>(null)
  const [isLoadingUser, setIsLoadingUser] = useState(true)
  const [recentTests, setRecentTests] = useState<any[]>([])
  const [selectedPeriod, setSelectedPeriod] = useState("month")
  const [animatedStats, setAnimatedStats] = useState({
    totalTests: 0,
    avgScore: 0,
    rank: 0,
    streak: 0,
  })

  // Fetch current user and their assessments
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getCurrentUser()
        setUser(userData)
        
        try {
          const assessments = await getUserAssessments()
          setRecentTests(assessments)
        } catch (err) {
          console.error("Failed to fetch assessments", err)
        }
      } catch (error) {
        // If not logged in or token invalid, redirect to auth
        router.push("/auth")
      } finally {
        setIsLoadingUser(false)
      }
    }
    fetchData()
  }, [router])

  // Animate dashboard stats on load
  useEffect(() => {
    const targetStats = { totalTests: 24, avgScore: 78, rank: 156, streak: 7 }
    const duration = 1500
    const steps = 50
    const stepDuration = duration / steps

    let currentStep = 0
    const interval = setInterval(() => {
      currentStep++
      const progress = currentStep / steps

      setAnimatedStats({
        totalTests: Math.floor(targetStats.totalTests * progress),
        avgScore: Math.floor(targetStats.avgScore * progress),
        rank: Math.floor(targetStats.rank * progress),
        streak: Math.floor(targetStats.streak * progress),
      })

      if (currentStep >= steps) {
        clearInterval(interval)
        setAnimatedStats(targetStats)
      }
    }, stepDuration)

    return () => clearInterval(interval)
  }, [])

  // Sample data for charts
  const performanceData = [
    { month: "Jan", endurance: 65, strength: 72, agility: 68, flexibility: 58 },
    { month: "Feb", endurance: 68, strength: 75, agility: 71, flexibility: 62 },
    { month: "Mar", endurance: 72, strength: 78, agility: 74, flexibility: 65 },
    { month: "Apr", endurance: 75, strength: 82, agility: 77, flexibility: 68 },
    { month: "May", endurance: 78, strength: 85, agility: 80, flexibility: 72 },
    { month: "Jun", endurance: 82, strength: 88, agility: 83, flexibility: 75 },
  ]

  const testDistribution = [
    { name: "Endurance", value: 35, color: "hsl(var(--primary))" },
    { name: "Strength", value: 28, color: "hsl(var(--secondary))" },
    { name: "Agility", value: 22, color: "hsl(var(--accent))" },
    { name: "Flexibility", value: 15, color: "hsl(var(--muted))" },
  ]

  const leaderboard = [
    { rank: 1, name: "Arjun Patel", score: 94, avatar: "/placeholder.svg?height=40&width=40", change: 0 },
    { rank: 2, name: "Priya Sharma", score: 92, avatar: "/placeholder.svg?height=40&width=40", change: 1 },
    { rank: 3, name: "Rohit Kumar", score: 90, avatar: "/placeholder.svg?height=40&width=40", change: -1 },
    { rank: 4, name: "Sneha Gupta", score: 88, avatar: "/placeholder.svg?height=40&width=40", change: 2 },
    { rank: 5, name: "Vikram Singh", score: 86, avatar: "/placeholder.svg?height=40&width=40", change: 0 },
  ]

  const achievements = [
    {
      id: 1,
      title: "Endurance Champion",
      description: "Completed 10 endurance tests",
      icon: <Activity className="h-6 w-6" />,
      earned: true,
      date: "2024-01-10",
    },
    {
      id: 2,
      title: "Strength Master",
      description: "Achieved excellent in 5 strength tests",
      icon: <Zap className="h-6 w-6" />,
      earned: true,
      date: "2024-01-05",
    },
    {
      id: 3,
      title: "Speed Demon",
      description: "Top 10% in agility tests",
      icon: <Timer className="h-6 w-6" />,
      earned: false,
      progress: 75,
    },
    {
      id: 4,
      title: "Consistency King",
      description: "30-day testing streak",
      icon: <Target className="h-6 w-6" />,
      earned: false,
      progress: 23,
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="py-8 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-2">
              {isLoadingUser ? (
                <div className="h-10 w-64 bg-muted animate-pulse rounded-md"></div>
              ) : (
                <h1 className="text-3xl lg:text-4xl font-bold">
                  Welcome back, {user?.full_name ? user.full_name.split(" ")[0] : "Athlete"}!
                </h1>
              )}
              <p className="text-lg text-muted-foreground">
                Track your fitness journey and compete with athletes across India
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/live-assessment">
                <Button className="group bg-red-600 hover:bg-red-700 text-white">
                  <Camera className="h-4 w-4 mr-2" />
                  Live AI Assessment
                </Button>
              </Link>
              <Button variant="outline">
                <TrendingUp className="h-4 w-4 mr-2" />
                View Reports
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Overview */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="animate-fade-in-up">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Tests</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">{animatedStats.totalTests}</div>
                <p className="text-xs text-muted-foreground">+3 from last month</p>
              </CardContent>
            </Card>

            <Card className="animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average Score</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-secondary">{animatedStats.avgScore}%</div>
                <p className="text-xs text-muted-foreground">+5% from last month</p>
              </CardContent>
            </Card>

            <Card className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">National Rank</CardTitle>
                <Trophy className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-accent">#{animatedStats.rank}</div>
                <p className="text-xs text-muted-foreground">↑12 positions</p>
              </CardContent>
            </Card>

            <Card className="animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">{animatedStats.streak} days</div>
                <p className="text-xs text-muted-foreground">Keep it up!</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Main Dashboard Content */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Performance Charts */}
            <div className="lg:col-span-2 space-y-8">
              {/* Performance Trends */}
              <Card className="animate-fade-in-up">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Performance Trends</CardTitle>
                      <CardDescription>Your fitness scores over the last 6 months</CardDescription>
                    </div>
                    <Tabs value={selectedPeriod} onValueChange={setSelectedPeriod}>
                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="week">Week</TabsTrigger>
                        <TabsTrigger value="month">Month</TabsTrigger>
                        <TabsTrigger value="year">Year</TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="endurance"
                        stroke="hsl(var(--primary))"
                        strokeWidth={2}
                        dot={{ fill: "hsl(var(--primary))" }}
                      />
                      <Line
                        type="monotone"
                        dataKey="strength"
                        stroke="hsl(var(--secondary))"
                        strokeWidth={2}
                        dot={{ fill: "hsl(var(--secondary))" }}
                      />
                      <Line
                        type="monotone"
                        dataKey="agility"
                        stroke="hsl(var(--accent))"
                        strokeWidth={2}
                        dot={{ fill: "hsl(var(--accent))" }}
                      />
                      <Line
                        type="monotone"
                        dataKey="flexibility"
                        stroke="hsl(var(--muted-foreground))"
                        strokeWidth={2}
                        dot={{ fill: "hsl(var(--muted-foreground))" }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Recent Test Results */}
              <Card className="animate-fade-in-up">
                <CardHeader>
                  <CardTitle>Recent Test Results</CardTitle>
                  <CardDescription>Your latest fitness assessments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentTests.length === 0 ? (
                      <p className="text-sm text-muted-foreground text-center py-4">No assessments found. Try a Live AI Assessment!</p>
                    ) : (
                      recentTests.map((test, index) => (
                        <div
                          key={test.id}
                          className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors animate-fade-in-right"
                          style={{ animationDelay: `${index * 0.1}s` }}
                        >
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                              <Activity className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                              <h4 className="font-medium">{test.test_name}</h4>
                              <p className="text-sm text-muted-foreground">
                                {test.date}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4">
                            <div className="text-right">
                              <div className="font-bold text-lg">{test.score} {test.unit}</div>
                              {test.ai_feedback && (
                                <div className="text-xs text-muted-foreground max-w-[150px] truncate" title={test.ai_feedback}>
                                  AI: {test.ai_feedback}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Test Distribution */}
              <Card className="animate-fade-in-up">
                <CardHeader>
                  <CardTitle>Test Distribution</CardTitle>
                  <CardDescription>Your focus areas</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={testDistribution}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {testDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="space-y-2 mt-4">
                    {testDistribution.map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                          <span className="text-sm">{item.name}</span>
                        </div>
                        <span className="text-sm font-medium">{item.value}%</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Leaderboard */}
              <Card className="animate-fade-in-up">
                <CardHeader>
                  <CardTitle>Leaderboard</CardTitle>
                  <CardDescription>Top performers this month</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {leaderboard.map((user, index) => (
                      <div
                        key={user.rank}
                        className="flex items-center space-x-3 animate-fade-in-right"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <div className="flex items-center justify-center w-8 h-8">
                          {user.rank <= 3 ? (
                            <Medal
                              className={`h-5 w-5 ${user.rank === 1 ? "text-yellow-500" : user.rank === 2 ? "text-gray-400" : "text-amber-600"}`}
                            />
                          ) : (
                            <span className="text-sm font-medium text-muted-foreground">#{user.rank}</span>
                          )}
                        </div>
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={user.avatar || "/placeholder.svg"} />
                          <AvatarFallback>
                            {user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{user.name}</p>
                          <p className="text-xs text-muted-foreground">{user.score}% avg</p>
                        </div>
                        <div className="flex items-center">
                          {user.change > 0 && <ArrowUp className="h-3 w-3 text-secondary" />}
                          {user.change < 0 && <ArrowDown className="h-3 w-3 text-destructive" />}
                          {user.change === 0 && <div className="w-3 h-3" />}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Achievements */}
              <Card className="animate-fade-in-up">
                <CardHeader>
                  <CardTitle>Achievements</CardTitle>
                  <CardDescription>Your fitness milestones</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {achievements.map((achievement, index) => (
                      <div
                        key={achievement.id}
                        className={`p-3 rounded-lg border transition-all animate-fade-in-up ${achievement.earned ? "bg-primary/5 border-primary/20" : "bg-muted/30 border-border"}`}
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <div className="flex items-start space-x-3">
                          <div
                            className={`p-2 rounded-full ${achievement.earned ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
                          >
                            {achievement.earned ? <CheckCircle className="h-4 w-4" /> : achievement.icon}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-sm">{achievement.title}</h4>
                            <p className="text-xs text-muted-foreground">{achievement.description}</p>
                            {achievement.earned ? (
                              <p className="text-xs text-primary mt-1">Earned {achievement.date}</p>
                            ) : (
                              <div className="mt-2">
                                <Progress value={achievement.progress} className="h-1" />
                                <p className="text-xs text-muted-foreground mt-1">{achievement.progress}% complete</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
