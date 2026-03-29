import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const faqs = [
  {
    question: "Is MindMate a replacement for therapy?",
    answer:
      "No. MindMate provides early support and self-help guidance. For diagnosis or treatment, please meet a licensed professional.",
  },
  {
    question: "Who can use MindMate?",
    answer:
      "MindMate is designed for students who need support with stress, anxiety, burnout, and emotional challenges.",
  },
  {
    question: "How are bookings handled?",
    answer:
      "Students can submit booking requests from the booking page. Admin counselors can approve or reject requests from the admin dashboard.",
  },
  {
    question: "How does the AI Companion work?",
    answer:
      "The AI Companion uses the Gemini API to provide empathetic, context-aware responses and safe coping guidance.",
  },
  {
    question: "Is my data private?",
    answer:
      "MindMate uses authenticated access and secure session cookies. Sensitive data is stored in the database and is only accessible to authorized users.",
  },
]

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-[#d0e1d6]">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-4xl space-y-6">
          <h1 className="text-4xl font-bold text-black">Frequently Asked Questions</h1>
          {faqs.map((item) => (
            <Card key={item.question}>
              <CardHeader>
                <CardTitle className="text-xl">{item.question}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{item.answer}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}
