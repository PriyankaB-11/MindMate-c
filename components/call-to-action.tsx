import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, ArrowRight } from "lucide-react";
import Link from "next/link";

export function CallToAction() {
  return (
    <section className="py-16" style={{ backgroundColor: "#d0e1d6" }}>
      <div className="container mx-auto px-4">
        <Card className="max-w-4xl mx-auto border-primary/20 bg-background/80 backdrop-blur-sm">
          <CardContent className="p-8 md:p-12 text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <img
                  src="/icons/no-bg.png" // path to your logo in public folder
                  alt="MindMate Logo"
                  className="h-30 w-30 object-contain" // adjust size as needed
                />
              </div>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Ready to Take the First Step?
            </h2>

            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              Your mental health matters. Whether you're dealing with stress,
              anxiety, or just need someone to talk to, we're here to support
              you on your journey to wellness.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="min-w-[200px]" asChild>
                <Link href="/booking">
                  Book Appointment
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="min-w-[200px] bg-transparent"
                asChild
              >
                <Link href="/resources">Explore Resources</Link>
              </Button>
            </div>

            <div className="mt-8 pt-6 border-t border-border">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Crisis Support:</strong> If
                you're in immediate danger or facing a mental health crisis, you
                can call the National Mental Health Helpline at 1800 599 0019
                (toll-free)
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
