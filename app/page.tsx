import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Features } from "@/components/features";
import { CallToAction } from "@/components/call-to-action";
import { Footer } from "@/components/footer";
import { Chatbot } from "@/components/chatbot";

export default function Page() {
  return (
    <>
      <main className="min-h-screen bg-background">
        <Header />
        <Hero />
        {/* <Features /> */}
        <CallToAction />
        <Footer />
        <Chatbot />
      </main>
    </>
  );
}
