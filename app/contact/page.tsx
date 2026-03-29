import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#d0e1d6]">
      <Header />
      <main className="container mx-auto max-w-4xl px-4 py-12">
        <h1 className="mb-6 text-4xl font-bold text-black">Contact MindMate</h1>
        <Card>
          <CardHeader>
            <CardTitle>Support and Crisis Channels</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-muted-foreground">
            <p>Email: support@mindmate.app</p>
            <p>KIRAN Helpline: 1800-599-0019</p>
            <p>Vandrevala Foundation: 1860-266-2345</p>
            <p>Emergency: 112</p>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  )
}
