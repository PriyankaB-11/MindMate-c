"use client"

import { useState } from "react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  return (
    <div className="min-h-screen bg-[#d0e1d6]">
      <Header />
      <main className="container mx-auto flex min-h-[70vh] items-center justify-center px-4 py-12">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Forgot Password</CardTitle>
            <CardDescription>
              Enter your account email to receive password reset instructions.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {!submitted ? (
              <form
                className="space-y-4"
                onSubmit={(e) => {
                  e.preventDefault()
                  setSubmitted(true)
                }}
              >
                <Input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                />
                <Button type="submit" className="w-full">
                  Send Reset Link
                </Button>
              </form>
            ) : (
              <p className="text-sm text-muted-foreground">
                If this email exists, reset instructions have been sent.
              </p>
            )}
            <Link href="/login" className="text-sm text-primary underline">
              Back to login
            </Link>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  )
}
