import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const plans = [
  {
    name: "Student Free",
    price: "0",
    details: ["AI Companion chat", "Resource hub", "Booking requests"],
  },
  {
    name: "Campus Pro",
    price: "Custom",
    details: ["Admin analytics", "Counselor assignment workflow", "Priority support"],
  },
]

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#d0e1d6]">
      <Header />
      <main className="container mx-auto max-w-5xl px-4 py-12">
        <h1 className="mb-8 text-center text-4xl font-bold text-black">Pricing</h1>
        <div className="grid gap-6 md:grid-cols-2">
          {plans.map((plan) => (
            <Card key={plan.name}>
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-3xl font-bold">{plan.price}</p>
                <ul className="mb-6 space-y-2 text-sm text-muted-foreground">
                  {plan.details.map((item) => (
                    <li key={item}>- {item}</li>
                  ))}
                </ul>
                <Button asChild>
                  <Link href="/contact">Contact us</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}
