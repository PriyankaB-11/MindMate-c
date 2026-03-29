import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function AppointmentPolicyPage() {
  return (
    <div className="min-h-screen bg-[#d0e1d6]">
      <Header />
      <main className="container mx-auto max-w-4xl px-4 py-12">
        <h1 className="mb-6 text-4xl font-bold text-black">Booking and Cancellation Policy</h1>
        <div className="space-y-6 rounded-xl border bg-white p-6 text-foreground">
          <section>
            <h2 className="text-xl font-semibold">Booking Requests</h2>
            <p className="text-muted-foreground">
              All sessions are requested through the booking portal and are marked pending until reviewed by an admin
              counselor.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold">Approval Workflow</h2>
            <p className="text-muted-foreground">
              Counselors can approve or reject requests based on availability and urgency level. You can track status in
              your student dashboard.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold">Rescheduling</h2>
            <p className="text-muted-foreground">
              If you need to reschedule, submit a new request with updated notes so the counseling team can prioritize
              accordingly.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}
