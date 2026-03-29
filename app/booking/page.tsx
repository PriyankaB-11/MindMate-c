"use client"

import { useCallback, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CalendarPlus, Loader2 } from "lucide-react"
import { supabase } from "@/lib/supabaseClient"

interface BookingItem {
  id: string
  user_id: string
  date: string
  time: string
  status: "pending" | "approved" | "rejected"
  notes: string | null
  created_at: string
}

export default function BookingPage() {
  const router = useRouter()
  const [userId, setUserId] = useState<string | null>(null)
  const [loadingAuth, setLoadingAuth] = useState(true)
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [notes, setNotes] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [bookings, setBookings] = useState<BookingItem[]>([])

  useEffect(() => {
    const loadAuth = async () => {
      const { data } = await supabase.auth.getUser()
      if (!data.user) {
        router.push("/login")
        return
      }

      setUserId(data.user.id)
      setLoadingAuth(false)
    }

    loadAuth()
  }, [router])

  const loadBookings = useCallback(async () => {
    if (!userId) {
      return
    }

    const { data, error: fetchError } = await supabase
      .from("bookings")
      .select("id, user_id, date, time, status, notes, created_at")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })

    if (fetchError) {
      setError(fetchError.message)
      return
    }

    setBookings((data as BookingItem[]) || [])
  }, [userId])

  useEffect(() => {
    if (userId) {
      loadBookings()
    }
  }, [userId, loadBookings])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    if (!date || !time) {
      setError("Please provide both date and time")
      return
    }

    setIsSubmitting(true)

    if (!userId) {
      setIsSubmitting(false)
      setError("You must be logged in to book a session")
      return
    }

    const { error: createError } = await supabase.from("bookings").insert([
      {
        user_id: userId,
        date,
        time,
        notes: notes.trim() || null,
        status: "pending",
      },
    ])

    setIsSubmitting(false)

    if (createError) {
      setError(createError.message || "Unable to create booking")
      return
    }

    setDate("")
    setTime("")
    setNotes("")
    setSuccess("Appointment request submitted successfully.")
    await loadBookings()
  }

  if (loadingAuth) {
    return null
  }

  return (
    <div className="min-h-screen bg-[#d0e1d6]">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-4xl space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarPlus className="h-5 w-5" />
                Book a Counseling Session
              </CardTitle>
              <CardDescription>
                Submit your preferred date and time. An admin counselor will review and approve or reject your request.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label htmlFor="date" className="mb-2 block text-sm font-medium">
                      Preferred Date
                    </label>
                    <Input
                      id="date"
                      type="date"
                      min={new Date().toISOString().split("T")[0]}
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="time" className="mb-2 block text-sm font-medium">
                      Preferred Time
                    </label>
                    <Input id="time" type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
                  </div>
                </div>
                <div>
                  <label htmlFor="notes" className="mb-2 block text-sm font-medium">
                    Notes (optional)
                  </label>
                  <Textarea
                    id="notes"
                    rows={4}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Share context so the counselor can prepare for your session."
                  />
                </div>

                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                {success && (
                  <Alert>
                    <AlertDescription>{success}</AlertDescription>
                  </Alert>
                )}

                <Button disabled={isSubmitting} type="submit">
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Booking"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Your Recent Requests</CardTitle>
            </CardHeader>
            <CardContent>
              {bookings.length === 0 ? (
                <p className="text-sm text-muted-foreground">No bookings yet.</p>
              ) : (
                <div className="space-y-3">
                  {bookings.map((booking) => (
                    <div key={booking.id} className="rounded-md border p-4">
                      <p className="font-medium">
                        {new Date(booking.date).toLocaleDateString()} at {booking.time}
                      </p>
                      <p className="text-sm capitalize text-muted-foreground">Status: {booking.status}</p>
                      {booking.notes ? <p className="mt-2 text-sm">{booking.notes}</p> : null}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}
