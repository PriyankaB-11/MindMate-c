import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "MindMate Terms and Conditions",
  description: "Terms and conditions for using the MindMate platform.",
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#d0e1d6]">
      <Header />
      <main className="container mx-auto max-w-4xl px-4 py-12 text-foreground">
        <h1 className="mb-6 text-4xl font-bold">Terms and Conditions</h1>
        <div className="space-y-6 rounded-xl border bg-white p-6">
          <section>
            <h2 className="text-xl font-semibold">1. Purpose</h2>
            <p className="text-muted-foreground">
              MindMate provides educational and supportive mental wellness tools for students. It does not provide
              clinical diagnosis or emergency medical care.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">2. User Accounts</h2>
            <p className="text-muted-foreground">
              You are responsible for maintaining account confidentiality and accurate profile information. Unauthorized
              account use must be reported immediately.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">3. Acceptable Use</h2>
            <p className="text-muted-foreground">
              You agree not to abuse the platform, attempt unauthorized access, or submit harmful content. MindMate may
              suspend access for policy violations.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">4. Limitation</h2>
            <p className="text-muted-foreground">
              MindMate is an assistive platform and should not be treated as a substitute for licensed care. In crisis
              situations, contact emergency services or national helplines immediately.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">5. Contact</h2>
            <p className="text-muted-foreground">For support, contact support@mindmate.app.</p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}
