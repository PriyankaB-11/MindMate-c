"use client"

import { useAuth } from "@/contexts/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"
import Link from "next/link"
import { MessageCircle, Calendar, BookOpen, Clock, CheckCircle, AlertCircle, Heart, Brain, Users } from "lucide-react"

// Mock booking data
const mockBookings = [
  {
    id: 1,
    counselor: "Dr. Sarah Johnson",
    date: "2024-01-15",
    time: "2:00 PM",
    status: "confirmed",
    reason: "Anxiety management",
  },
  {
    id: 2,
    counselor: "Dr. Michael Chen",
    date: "2024-01-08",
    time: "10:00 AM",
    status: "completed",
    reason: "Study stress",
  },
  {
    id: 3,
    counselor: "Dr. Emily Davis",
    date: "2024-01-22",
    time: "3:30 PM",
    status: "pending",
    reason: "General consultation",
  },
]

export default function StudentDashboard() {
  const { user } = useAuth()

  if (!user) {
    return null // This will be handled by protected routing
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "completed":
        return <CheckCircle className="h-4 w-4 text-blue-500" />
      case "pending":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800 border-green-200"
      case "completed":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Welcome back, {user.name}! 👋</h1>
          <p className="text-muted-foreground">Your mental health journey continues here. How are you feeling today?</p>
        </div>

        {/* Quick Access Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="liquid-glass border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                  <MessageCircle className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg">AI-Companion</CardTitle>
                  <CardDescription>Chat with our AI-companion</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Get instant support and guidance from our AI-powered mental health companion.
              </p>
              <Button asChild className="w-full">
                <Link href="/AI-Companion">Start Chatting</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="liquid-glass border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-secondary/10 rounded-lg group-hover:bg-secondary/20 transition-colors">
                  <Calendar className="h-6 w-6 text-secondary" />
                </div>
                <div>
                  <CardTitle className="text-lg">Book Session</CardTitle>
                  <CardDescription>Schedule with a counselor</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Connect with professional counselors for personalized support.
              </p>
              <Button asChild variant="secondary" className="w-full">
                <Link href="/booking">Book Appointment</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="liquid-glass border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-accent/10 rounded-lg group-hover:bg-accent/20 transition-colors">
                  <BookOpen className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <CardTitle className="text-lg">Resources</CardTitle>
                  <CardDescription>Explore wellness content</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Access articles, exercises, and tools for mental wellness.
              </p>
              <Button asChild variant="outline" className="w-full bg-transparent">
                <Link href="/resources">Browse Resources</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* My Bookings Section */}
        <Card className="liquid-glass border-0 shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  My Bookings
                </CardTitle>
                <CardDescription>Your upcoming and past counseling sessions</CardDescription>
              </div>
              <Button asChild variant="outline" size="sm">
                <Link href="/booking">Book New Session</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {mockBookings.length > 0 ? (
              <div className="space-y-4">
                {mockBookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="flex items-center justify-between p-4 bg-background/50 rounded-lg border border-border/50"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(booking.status)}
                        <div>
                          <p className="font-medium text-foreground">{booking.counselor}</p>
                          <p className="text-sm text-muted-foreground">{booking.reason}</p>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-foreground">
                        {booking.date} at {booking.time}
                      </p>
                      <Badge className={`text-xs ${getStatusColor(booking.status)}`}>
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground mb-4">No bookings yet</p>
                <Button asChild>
                  <Link href="/booking">Schedule Your First Session</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Wellness Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <Card className="liquid-glass border-0 shadow-lg">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-green-100 rounded-full">
                  <Heart className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">7</p>
                  <p className="text-sm text-muted-foreground">Days Active</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="liquid-glass border-0 shadow-lg">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-blue-100 rounded-full">
                  <Brain className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">12</p>
                  <p className="text-sm text-muted-foreground">AI Conversations</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="liquid-glass border-0 shadow-lg">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-purple-100 rounded-full">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">3</p>
                  <p className="text-sm text-muted-foreground">Sessions Completed</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
