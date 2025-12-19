"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface FeaturesContent {
  title: string;
  subtitle: string;
}

const defaultContent: FeaturesContent = {
  title: "Empowering Minds, Transforming Lives",
  subtitle: "Discover our unique approach to 3D animation",
};

export function Features() {
  const [content, setContent] = useState<FeaturesContent>(defaultContent);

  useEffect(() => {
    // Load content from localStorage
    const savedContent = localStorage.getItem("skitbit-content");
    if (savedContent) {
      try {
        const parsed = JSON.parse(savedContent);
        if (parsed.features) {
          setContent(parsed.features);
        }
      } catch (error) {
        console.error("Error parsing saved content:", error);
      }
    }
  }, []);

  return (
    <section
      id="features"
      className="container mx-auto px-4 py-16 sm:py-20 bg-[#d0e1d6]"
    >
      <h2 className="mb-8 text-center text-4xl font-extrabold tracking-tight text-black sm:text-5xl">
        {content.title} <br />
        <br />
      </h2>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Client Love Card - Always visible */}
        <Card className="liquid-glass border border-white/10 bg-white/5 backdrop-blur-xl">
          <CardHeader>
            <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-black">
              Judgement-Free
            </p>
            <CardTitle className="mt-4 text-lg sm:text-xl md:text-2xl font-medium text-muted-foreground leading-relaxe">
              A safe space where you can share your thoughts without fear or
              stigma.
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6 flex items-end gap-4"></div>
            <div className="grid grid-cols-2 gap-4">
              <Image
                src={"/images/top-rated-1.png"}
                width={280}
                height={160}
                alt="Product sketch concepts of backpack on paper"
                className="h-full w-full rounded-xl border border-white/10 object-cover"
              />
              <Image
                src={"/images/top-rated-2.png"}
                width={280}
                height={160}
                alt="Backpacks on stage with Smartpack PRO lighting"
                className="h-full w-full rounded-xl border border-white/10 object-cover"
              />
            </div>
          </CardContent>
        </Card>

        {/* Client Love Card - Always visible */}
        <Card className="liquid-glass border border-white/10 bg-white/5 backdrop-blur-xl">
          <CardHeader>
            <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-black">
              Judgement-Free
            </p>
            <CardTitle className="mt-4 text-lg sm:text-xl md:text-2xl font-medium text-muted-foreground leading-relaxe">
              A safe space where you can share your thoughts without fear or
              stigma.
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6 flex items-end gap-4"></div>
            <div className="grid grid-cols-2 gap-4">
              <Image
                src={"/images/top-rated-1.png"}
                width={280}
                height={160}
                alt="Product sketch concepts of backpack on paper"
                className="h-full w-full rounded-xl border border-white/10 object-cover"
              />
              <Image
                src={"/images/top-rated-2.png"}
                width={280}
                height={160}
                alt="Backpacks on stage with Smartpack PRO lighting"
                className="h-full w-full rounded-xl border border-white/10 object-cover"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
