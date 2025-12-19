"use client";

import { Button } from "@/components/ui/button";
import {
  Heart,
  MessageCircle,
  Calendar,
  BookOpen,
  Sparkles,
  Shield,
  Users,
} from "lucide-react";
import Link from "next/link";
import { Nunito } from "next/font/google";
import { Inter } from "next/font/google";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export function Hero() {
  return (
    <div className="w-full">
      {/* Hero 1 */}
      <div className="relative w-full min-h-[80vh]">
        <img
          src="/images/hero-1.jpg"
          alt="Hero Background"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Content overlay */}
        <div className="relative z-10 flex flex-col items-center justify-start px-4 pt-12 text-center">
          {/* Logo */}
          <div className="mb-8 flex items-center gap-3 glass-border-subtle rounded-full px-6 py-3">
            <img
              src="/icons/no-bg.png"
              alt="MindMate Logo"
              className="h-20 w-20 object-contain"
            />
            <p className={`${nunito.className} text-2xl font-bold text-black`}>
              MindMate
            </p>
          </div>

          {/* Headings */}
          <h1 className="mt-6 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-none">
            <span className="block text-foreground">Your Mental</span>
            <span className="block text-transparent bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text">
              Health Journey
            </span>
            <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mt-2">
              Starts Here
            </span>
          </h1>

          {/* Description */}
          <p
            className={`mt-8 max-w-3xl text-xl leading-relaxed text-black font-medium ${inter.className}`}
          >
            A safe, accessible platform providing comprehensive mental health
            support, curated resources, and professional connections for
            students.
          </p>

          {/* Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4 w-full max-w-md mx-auto">
            <Button
              size="lg"
              variant="outline"
              asChild
              className="px-8 py-4 text-lg font-semibold glass-border hover:glass-border-enhanced hover:scale-105 transition-all duration-300 group bg-transparent"
            >
              <Link href="/booking">
                <Calendar className="mr-3 h-6 w-6 group-hover:rotate-12 transition-transform" />
                Book Appointment
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="px-8 py-4 text-lg font-semibold glass-border hover:glass-border-enhanced hover:scale-105 transition-all duration-300 group bg-transparent"
            >
              <Link href="/resources">
                <BookOpen className="mr-3 h-6 w-6 group-hover:rotate-12 transition-transform" />
                Browse Resources
              </Link>
            </Button>
          </div>

          {/* Feature Cards */}
          <div className="mt-20 grid w-full max-w-6xl gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {featureCards.map((feature, i) => (
              <FeatureCard
                key={i}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                href={feature.href}
                delay={i * 200}
              />
            ))}
          </div>
          <div>
            <br />
            <br />
          </div>
        </div>
      </div>
      {/* Hero 2 immediately after Hero 1 */}
      <div className="w-full">
        <img
          src="/images/hero-2.png"
          alt="Hero Extension"
          className="w-full object-cover"
        />
      </div>
      
    </div>
  );
}

// FeatureCard component
function FeatureCard({
  icon: Icon,
  title,
  description,
  href,
  delay = 0,
}: {
  icon: any;
  title: string;
  description: string;
  href: string;
  delay?: number;
}) {
  return (
    <Link href={href} className="group">
      <div
        className="relative rounded-2xl glass-border p-8 transition-all duration-500 hover:glass-border-enhanced hover:scale-105 hover:-translate-y-2 group"
        style={{ animationDelay: `${delay}ms` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="relative">
          <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 text-primary group-hover:from-primary group-hover:to-secondary group-hover:text-primary-foreground transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
            <Icon className="h-8 w-8" />
          </div>

          <h3 className="text-xl font-bold text-card-foreground mb-3 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-black leading-relaxed group-hover:text-foreground transition-colors">
            {description}
          </p>
        </div>

        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
        </div>
      </div>
    </Link>
  );
}

// Feature Cards data
const featureCards = [
  {
    icon: MessageCircle,
    title: "24/7 AI Support",
    description:
      "Chat with our intelligent AI assistant anytime for immediate support, guidance,express and personalized mental health resources.",
    href: "/AI-Companion",
  },
  {
    icon: Calendar,
    title: "Professional Care",
    description:
      "Connect with licensed mental health professionals through secure video sessions and personalized treatment plans.",
    href: "/booking",
  },
  {
    icon: BookOpen,
    title: "Wellness Resources",
    description:
      "Access our comprehensive library of evidence-based resources for stress management, mindfulness, and emotional wellbeing.",
    href: "/resources",
  },
];
