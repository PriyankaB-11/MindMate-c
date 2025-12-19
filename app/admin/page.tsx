"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Calendar, Clock, MessageSquare, Search, CheckCircle, AlertCircle, XCircle, Eye } from "lucide-react"

interface Booking {
  id: string
  name: string
  email: string
  phone: string
  reason: string
  preferredDate: string
  preferredTime: string
  urgency: "normal" | "urgent" | "crisis"
  status: "pending" | "confirmed" | "completed" | "cancelled"
  submittedAt: Date
  notes?: string
}

// Sample booking data
const sampleBookings: Booking[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah.j@email.com",
    phone: "(555) 123-4567",
    reason:
      "I've been feeling overwhelmed with my coursework and experiencing anxiety attacks. I would like to talk to someone about coping strategies and stress management techniques.",
    preferredDate: "2024-01-15",
    preferredTime: "2:00 PM",
    urgency: "urgent",
    status: "pending",
    submittedAt: new Date("2024-01-10T10:30:00"),
  },
  {
    id: "2",
    name: "Michael Chen",
    email: "m.chen@university.edu",
    phone: "(555) 987-6543",
    reason:
      "Having trouble sleeping and feeling depressed. Need support with managing my mental health during finals week.",
    preferredDate: "2024-01-16",
    preferredTime: "11:00 AM",
    urgency: "normal",
    status: "confirmed",
    submittedAt: new Date("2024-01-09T14:15:00"),
    notes: "Confirmed for Tuesday 11 AM with Dr. Smith",
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    email: "emily.r@student.edu",
    phone: "(555) 456-7890",
    reason:
      "Relationship issues and social anxiety. Would like to work on building confidence and communication skills.",
    preferredDate: "2024-01-17",
    preferredTime: "3:00 PM",
    urgency: "normal",
    status: "completed",
    submittedAt: new Date("2024-01-08T09:45:00"),
    notes: "Session completed successfully. Follow-up scheduled.",
  },
  {
    id: "4",
    name: "David Kim",
    email: "d.kim@college.edu",
    phone: "(555) 321-0987",
    reason:
      "Academic pressure and perfectionism causing severe stress. Having thoughts of self-harm and need immediate help.",
    preferredDate: "2024-01-12",
    preferredTime: "9:00 AM",
    urgency: "crisis",
    status: "confirmed",
    submittedAt: new Date("2024-01-11T16:20:00"),
    notes: "URGENT: Crisis intervention scheduled. Dr. Martinez assigned.",
  },
  {
    id: "5",
    name: "Jessica Taylor",
    email: "j.taylor@university.edu",
    phone: "(555) 654-3210",
    reason:
      "Dealing with homesickness and adjustment issues as an international student. Need support with cultural adaptation.",
    preferredDate: "2024-01-18",
    preferredTime: "1:00 PM",
    urgency: "normal",
    status: "pending",
    submittedAt: new Date("2024-01-10T11:00:00"),
  },
]

export default function AdminDashboard() {
  const [bookings, setBookings] = useState<Booking[]>(sampleBookings)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [urgencyFilter, setUrgencyFilter] = useState<string>("all")

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.reason.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || booking.status === statusFilter
    const matchesUrgency = urgencyFilter === "all" || booking.urgency === urgencyFilter

    return matchesSearch && matchesStatus && matchesUrgency
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "confirmed":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "completed":
        return "bg-green-100 text-green-800 border-green-200"
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "crisis":
        return "bg-red-100 text-red-800 border-red-200"
      case "urgent":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "normal":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4" />
      case "confirmed":
        return <CheckCircle className="h-4 w-4" />
      case "completed":
        return <CheckCircle className="h-4 w-4" />
      case "cancelled":
        return <XCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const updateBookingStatus = (id: string, newStatus: Booking["status"]) => {
    setBookings((prev) => prev.map((booking) => (booking.id === id ? { ...booking, status: newStatus } : booking)))
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  // Statistics
  const stats = {
    total: bookings.length,
    pending: bookings.filter((b) => b.status === "pending").length,
    confirmed: bookings.filter((b) => b.status === "confirmed").length,
    crisis: bookings.filter((b) => b.urgency === "crisis").length,
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage appointment bookings and student support requests</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Bookings</p>
                    <p className="text-2xl font-bold text-foreground">{stats.total}</p>
                  </div>
                  <Calendar className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Pending</p>
                    <p className="text-2xl font-bold text-foreground">{stats.pending}</p>
                  </div>
                  <Clock className="h-8 w-8 text-yellow-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Confirmed</p>
                    <p className="text-2xl font-bold text-foreground">{stats.confirmed}</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Crisis Cases</p>
                    <p className="text-2xl font-bold text-foreground">{stats.crisis}</p>
                  </div>
                  <AlertCircle className="h-8 w-8 text-red-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters and Search */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search bookings..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 border border-input rounded-md bg-background text-foreground"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>

                <select
                  value={urgencyFilter}
                  onChange={(e) => setUrgencyFilter(e.target.value)}
                  className="px-3 py-2 border border-input rounded-md bg-background text-foreground"
                >
                  <option value="all">All Urgency</option>
                  <option value="normal">Normal</option>
                  <option value="urgent">Urgent</option>
                  <option value="crisis">Crisis</option>
                </select>
              </div>
            </CardContent>
          </Card>

          {/* Bookings Table */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Appointment Bookings ({filteredBookings.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Student</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Appointment</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Urgency</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Submitted</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredBookings.map((booking) => (
                      <tr key={booking.id} className="border-b border-border hover:bg-muted/50">
                        <td className="py-4 px-4">
                          <div>
                            <div className="font-medium text-foreground">{booking.name}</div>
                            <div className="text-sm text-muted-foreground">{booking.email}</div>
                            {booking.phone && <div className="text-sm text-muted-foreground">{booking.phone}</div>}
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div>
                            <div className="font-medium text-foreground">
                              {new Date(booking.preferredDate).toLocaleDateString()} at {booking.preferredTime}
                            </div>
                            <div className="text-sm text-muted-foreground line-clamp-2 max-w-xs">{booking.reason}</div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <Badge className={getUrgencyColor(booking.urgency)}>{booking.urgency}</Badge>
                        </td>
                        <td className="py-4 px-4">
                          <Badge className={getStatusColor(booking.status)}>
                            <span className="flex items-center gap-1">
                              {getStatusIcon(booking.status)}
                              {booking.status}
                            </span>
                          </Badge>
                        </td>
                        <td className="py-4 px-4">
                          <div className="text-sm text-muted-foreground">{formatDate(booking.submittedAt)}</div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            {booking.status === "pending" && (
                              <>
                                <Button
                                  size="sm"
                                  onClick={() => updateBookingStatus(booking.id, "confirmed")}
                                  className="bg-blue-600 hover:bg-blue-700 text-white"
                                >
                                  Confirm
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => updateBookingStatus(booking.id, "cancelled")}
                                  className="border-red-200 text-red-600 hover:bg-red-50"
                                >
                                  Cancel
                                </Button>
                              </>
                            )}
                            {booking.status === "confirmed" && (
                              <Button
                                size="sm"
                                onClick={() => updateBookingStatus(booking.id, "completed")}
                                className="bg-green-600 hover:bg-green-700 text-white"
                              >
                                Complete
                              </Button>
                            )}
                            <Button size="sm" variant="ghost" className="p-2">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {filteredBookings.length === 0 && (
                  <div className="text-center py-12">
                    <MessageSquare className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">No bookings found</h3>
                    <p className="text-muted-foreground">
                      {searchTerm || statusFilter !== "all" || urgencyFilter !== "all"
                        ? "Try adjusting your search or filters"
                        : "No appointment requests have been submitted yet"}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}
