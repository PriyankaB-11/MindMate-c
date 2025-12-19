"use client"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Users,
  Calendar,
  MessageSquare,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  Eye,
  UserCheck,
} from "lucide-react"

// Mock booking requests data
const mockBookingRequests = [
  {
    id: 1,
    studentName: "Alice Johnson",
    studentEmail: "alice@student.edu",
    reason: "Anxiety and stress management",
    preferredDate: "2024-01-15",
    preferredTime: "2:00 PM",
    status: "pending",
    submittedAt: "2024-01-10",
    urgency: "medium",
  },
  {
    id: 2,
    studentName: "Bob Smith",
    studentEmail: "bob@student.edu",
    reason: "Academic pressure and burnout",
    preferredDate: "2024-01-16",
    preferredTime: "10:00 AM",
    status: "reviewed",
    submittedAt: "2024-01-09",
    urgency: "high",
  },
  {
    id: 3,
    studentName: "Carol Davis",
    studentEmail: "carol@student.edu",
    reason: "Social anxiety and relationship issues",
    preferredDate: "2024-01-18",
    preferredTime: "3:30 PM",
    status: "pending",
    submittedAt: "2024-01-11",
    urgency: "low",
  },
  {
    id: 4,
    studentName: "David Wilson",
    studentEmail: "david@student.edu",
    reason: "Depression and mood management",
    preferredDate: "2024-01-20",
    preferredTime: "11:00 AM",
    status: "confirmed",
    submittedAt: "2024-01-08",
    urgency: "high",
  },
  {
    id: 5,
    studentName: "Emma Brown",
    studentEmail: "emma@student.edu",
    reason: "General wellness consultation",
    preferredDate: "2024-01-22",
    preferredTime: "1:00 PM",
    status: "pending",
    submittedAt: "2024-01-12",
    urgency: "low",
  },
]

export default function AdminDashboard() {
  const { user } = useAuth()
  const [bookingRequests, setBookingRequests] = useState(mockBookingRequests)

  if (!user) {
    return null // This will be handled by protected routing
  }

  const handleStatusUpdate = (id: number, newStatus: string) => {
    setBookingRequests((prev) =>
      prev.map((request) => (request.id === id ? { ...request, status: newStatus } : request)),
    )
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "reviewed":
        return <Eye className="h-4 w-4 text-blue-500" />
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
      case "reviewed":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      case "medium":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const pendingCount = bookingRequests.filter((req) => req.status === "pending").length
  const reviewedCount = bookingRequests.filter((req) => req.status === "reviewed").length
  const confirmedCount = bookingRequests.filter((req) => req.status === "confirmed").length

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {user.name}. Manage student bookings and support requests.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="liquid-glass border-0 shadow-lg">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-yellow-100 rounded-full">
                  <Clock className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{pendingCount}</p>
                  <p className="text-sm text-muted-foreground">Pending Requests</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="liquid-glass border-0 shadow-lg">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-blue-100 rounded-full">
                  <Eye className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{reviewedCount}</p>
                  <p className="text-sm text-muted-foreground">Under Review</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="liquid-glass border-0 shadow-lg">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-green-100 rounded-full">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{confirmedCount}</p>
                  <p className="text-sm text-muted-foreground">Confirmed</p>
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
                  <p className="text-2xl font-bold text-foreground">{bookingRequests.length}</p>
                  <p className="text-sm text-muted-foreground">Total Requests</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Booking Requests Table */}
        <Card className="liquid-glass border-0 shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Booking Requests
                </CardTitle>
                <CardDescription>Manage student counseling session requests</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Preferred Date/Time</TableHead>
                    <TableHead>Urgency</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Submitted</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bookingRequests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium text-foreground">{request.studentName}</p>
                          <p className="text-sm text-muted-foreground">{request.studentEmail}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <p className="text-sm max-w-xs truncate" title={request.reason}>
                          {request.reason}
                        </p>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="text-sm font-medium">{request.preferredDate}</p>
                          <p className="text-sm text-muted-foreground">{request.preferredTime}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={`text-xs ${getUrgencyColor(request.urgency)}`}>
                          {request.urgency.charAt(0).toUpperCase() + request.urgency.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(request.status)}
                          <Badge className={`text-xs ${getStatusColor(request.status)}`}>
                            {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <p className="text-sm text-muted-foreground">{request.submittedAt}</p>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          {request.status === "pending" && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleStatusUpdate(request.id, "reviewed")}
                            >
                              Review
                            </Button>
                          )}
                          {request.status === "reviewed" && (
                            <Button size="sm" onClick={() => handleStatusUpdate(request.id, "confirmed")}>
                              Confirm
                            </Button>
                          )}
                          {request.status === "confirmed" && (
                            <Badge className="bg-green-100 text-green-800 border-green-200">
                              <UserCheck className="h-3 w-3 mr-1" />
                              Confirmed
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <Card className="liquid-glass border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-primary" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-background/50 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <p className="text-sm">New booking request from Alice Johnson</p>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-background/50 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <p className="text-sm">Session confirmed with David Wilson</p>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-background/50 rounded-lg">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <p className="text-sm">High priority request needs attention</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="liquid-glass border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Weekly Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Sessions This Week</span>
                  <span className="font-semibold">12</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">New Requests</span>
                  <span className="font-semibold">8</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Response Rate</span>
                  <span className="font-semibold text-green-600">95%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Avg. Response Time</span>
                  <span className="font-semibold">2.3 hours</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
