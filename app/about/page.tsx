import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Users, Shield, Clock, Award, MapPin } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#d0e1d6]">
      <Header />

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <img src="/icons/no-bg.png" alt="Hero Background" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-black mb-4">
              About MindMate
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              We're dedicated to providing accessible, compassionate mental
              health support for students navigating the challenges of academic
              life.
            </p>
          </div>

          {/* Mission Section */}
          <Card className="mb-12">
            <CardContent className="p-8">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-black mb-4">
                  Our Mission
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  To create a safe, supportive environment where every student
                  can access the mental health resources they need to thrive
                  academically, personally, and emotionally. We believe that
                  mental wellness is fundamental to academic success and overall
                  life satisfaction.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Values Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-black mb-2">
                  Confidential & Safe
                </h3>
                <p className="text-muted-foreground text-sm">
                  Your privacy is our priority. All sessions and communications
                  are completely confidential and secure.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-black mb-2">
                  Student-Centered
                </h3>
                <p className="text-muted-foreground text-sm">
                  Our services are designed specifically for students,
                  understanding the unique pressures of academic life.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-black mb-2">
                  Accessible 24/7
                </h3>
                <p className="text-muted-foreground text-sm">
                  Crisis support and resources are available around the clock,
                  because mental health doesn't follow business hours.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Services Section */}
          <Card className="mb-12">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-black mb-6 text-center">
                What We Offer
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-black mb-3">
                    AI-Guided First-Aid Support
                  </h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>
                      • Interactive chatbot for stress, anxiety, and academic
                      burnout
                    </li>
                    <li>
                      • Instant coping strategies and relaxation exercises
                    </li>
                    <li>
                      • Smart referrals to counsellors or helplines when needed
                    </li>
                    <li>• 24/7 accessible support without stigma</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-black mb-3">
                    Confidential Booking System
                  </h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>
                      • Secure appointment booking with on-campus counsellors
                    </li>
                    <li>
                      • Anonymous access to external mental health helplines
                    </li>
                    <li>• Flexible scheduling to suit student routines</li>
                    <li>• Strict privacy and confidentiality ensured</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-black mb-3">
                    Psychoeducational Resource Hub
                  </h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>
                      • Self-help guides, videos, and relaxation audio in
                      regional languages
                    </li>
                    <li>• Stress management and mindfulness practices</li>
                    <li>• Sleep improvement and lifestyle wellness tips</li>
                    <li>• Relationship and peer-interaction support tools</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-black mb-3">
                    Data-Driven Insights
                  </h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Anonymous analytics dashboard for administrators</li>
                    <li>
                      • Early detection of stress, depression, or burnout trends
                    </li>
                    <li>
                      • Data-backed policy recommendations for student welfare
                      departments
                    </li>
                    <li>
                      • Integration with offline college counselling centers
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="mb-12">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-black mb-4">
                  Get in Touch
                </h2>
                <p className="text-black">
                  We're here to help. Reach out anytime.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium text-black">Campus Location</p>
                      <p className="text-sm text-muted-foreground">
                        BMSIT&M,Student Health Center, Room 205
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium text-black">Office Hours</p>
                      <p className="text-sm text-muted-foreground">
                        Monday - Friday: 8:00 AM - 6:00 PM
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Award className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium text-black">Crisis Support</p>
                      <p className="text-sm text-muted-foreground">
                        Available 24/7 - Call 1800 599 0019
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="font-medium text-black mb-2">
                      Emergency Resources
                    </p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• KIRAN Mental Health Helpline: 1800-599-0019</li>
                      <li>
                        • Vandrevala Foundation Helpline: 1860-266-2345 /
                        1800-233-3330
                      </li>
                      <li>• iCALL (TISS) Helpline: +91 9152987821</li>
                      <li>• Local Emergency Services: 112</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Call to Action */}
          <div className="text-center">
            <h2 className="text-2xl font-bold text-black mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-muted-foreground mb-6">
              Taking the first step towards better mental health is brave. We're
              here to support you every step of the way.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/booking">Book an Appointment</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/resources">Explore Resources</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
