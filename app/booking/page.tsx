"use client";

import type React from "react";

import { useState } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Calendar,
  Clock,
  User,
  MessageSquare,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

export default function BookingPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    reason: "",
    preferredDate: "",
    preferredTime: "",
    urgency: "normal",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");
      // Reset form after success
      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          phone: "",
          reason: "",
          preferredDate: "",
          preferredTime: "",
          urgency: "normal",
        });
        setSubmitStatus("idle");
      }, 3000);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#d0e1d6]">
      <Header />

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-4">
              Book an Appointment
            </h1>
            <p className="text-lg text-muted-foreground">
              Schedule a session with one of our licensed mental health
              professionals. We're here to support you on your wellness journey.
            </p>
          </div>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Appointment Request
              </CardTitle>
              <CardDescription>
                Fill out the form below and we'll get back to you within 24
                hours to confirm your appointment.
              </CardDescription>
            </CardHeader>

            <CardContent>
              {submitStatus === "success" ? (
                <div className="text-center py-8">
                  <CheckCircle className="h-16 w-16 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Appointment Request Submitted!
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Thank you for reaching out. We'll contact you within 24
                    hours to confirm your appointment details.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    If you need immediate support, please call our crisis
                    hotline: <strong>988</strong>
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                      <User className="h-5 w-5" />
                      Personal Information
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-foreground mb-2"
                        >
                          Full Name *
                        </label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Enter your full name"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-foreground mb-2"
                        >
                          Email Address *
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="your.email@example.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-foreground mb-2"
                      >
                        Phone Number
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+91"
                      />
                    </div>
                  </div>

                  {/* Appointment Details */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                      <Clock className="h-5 w-5" />
                      Appointment Preferences
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="preferredDate"
                          className="block text-sm font-medium text-foreground mb-2"
                        >
                          Preferred Date *
                        </label>
                        <Input
                          id="preferredDate"
                          name="preferredDate"
                          type="date"
                          required
                          value={formData.preferredDate}
                          onChange={handleInputChange}
                          min={new Date().toISOString().split("T")[0]}
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="preferredTime"
                          className="block text-sm font-medium text-foreground mb-2"
                        >
                          Preferred Time *
                        </label>
                        <select
                          id="preferredTime"
                          name="preferredTime"
                          required
                          value={formData.preferredTime}
                          onChange={handleInputChange}
                          className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <option value="">Select a time</option>
                          <option value="9:00 AM">9:00 AM</option>
                          <option value="10:00 AM">10:00 AM</option>
                          <option value="11:00 AM">11:00 AM</option>
                          <option value="1:00 PM">1:00 PM</option>
                          <option value="2:00 PM">2:00 PM</option>
                          <option value="3:00 PM">3:00 PM</option>
                          <option value="4:00 PM">4:00 PM</option>
                          <option value="5:00 PM">5:00 PM</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="urgency"
                        className="block text-sm font-medium text-foreground mb-2"
                      >
                        Urgency Level
                      </label>
                      <select
                        id="urgency"
                        name="urgency"
                        value={formData.urgency}
                        onChange={handleInputChange}
                        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="normal">Normal - Within a week</option>
                        <option value="urgent">Urgent - Within 2-3 days</option>
                        <option value="crisis">
                          Crisis - Immediate attention needed
                        </option>
                      </select>
                    </div>
                  </div>

                  {/* Reason for Booking */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                      <MessageSquare className="h-5 w-5" />
                      Tell Us More
                    </h3>

                    <div>
                      <label
                        htmlFor="reason"
                        className="block text-sm font-medium text-foreground mb-2"
                      >
                        Reason for Booking *
                      </label>
                      <Textarea
                        id="reason"
                        name="reason"
                        required
                        value={formData.reason}
                        onChange={handleInputChange}
                        placeholder="Please describe what you'd like to discuss or work on during your session. This helps us match you with the right counselor."
                        rows={4}
                      />
                    </div>
                  </div>

                  {/* Crisis Notice */}
                  <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-destructive mb-1">
                          Crisis Support
                        </h4>
                        <p className="text-sm text-destructive/80">
                          Crisis Support: If you're in immediate danger or
                          facing a mental health crisis, you can call the
                          National Mental Health Helpline at 1800 599 0019
                          (toll-free)
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className="w-full"
                    size="lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting
                      ? "Submitting..."
                      : "Submit Appointment Request"}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
