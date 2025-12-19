"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  Search,
  Heart,
  Zap,
  Shield,
  Clock,
  Star,
  ExternalLink,
} from "lucide-react";

interface Resource {
  id: number;
  title: string;
  description: string;
  category: string;
  type: "article" | "video" | "exercise" | "tool";
  duration: string;
  rating: number;
  content: string;
  tags: string[];
}

const resources: Resource[] = [
  {
    id: 1,
    title: "Managing Stress and Anxiety",
    description:
      "Learn practical techniques to reduce stress and manage anxiety in your daily life.",
    category: "Stress Management",
    type: "article",
    duration: "5 min read",
    rating: 4.8,
    content:
      "Stress and anxiety are common experiences for students. Here are evidence-based strategies to help you cope: 1) Practice deep breathing exercises, 2) Use progressive muscle relaxation, 3) Challenge negative thoughts, 4) Maintain a regular sleep schedule, 5) Stay physically active. Remember, it's normal to feel stressed sometimes, but if these feelings persist, consider reaching out for professional support.",
    tags: ["anxiety", "stress", "coping", "breathing"],
  },
  {
    id: 2,
    title: "Better Sleep Habits",
    description:
      "Discover how to improve your sleep quality for better mental health and academic performance.",
    category: "Sleep & Wellness",
    type: "article",
    duration: "7 min read",
    rating: 4.9,
    content:
      "Good sleep is essential for mental health. Create a sleep-friendly environment by keeping your room cool, dark, and quiet. Establish a consistent bedtime routine: avoid screens 1 hour before bed, try reading or gentle stretching instead. Limit caffeine after 2 PM and avoid large meals before bedtime. If you can't fall asleep within 20 minutes, get up and do a quiet activity until you feel sleepy.",
    tags: ["sleep", "routine", "wellness", "habits"],
  },
  {
    id: 3,
    title: "Mindfulness Basics",
    description:
      "Introduction to mindfulness meditation and how it can help with mental clarity and emotional regulation.",
    category: "Mindfulness",
    type: "exercise",
    duration: "10 min practice",
    rating: 4.7,
    content:
      "Mindfulness is about being present in the moment without judgment. Start with this simple exercise: Sit comfortably and close your eyes. Focus on your breath - notice the sensation of air entering and leaving your nostrils. When your mind wanders (and it will), gently bring your attention back to your breath. Start with 5 minutes daily and gradually increase. This practice can help reduce anxiety, improve focus, and enhance emotional well-being.",
    tags: ["mindfulness", "meditation", "present", "awareness"],
  },
  {
    id: 4,
    title: "Building Healthy Relationships",
    description:
      "Tips for maintaining supportive friendships and romantic relationships during college.",
    category: "Relationships",
    type: "article",
    duration: "6 min read",
    rating: 4.6,
    content:
      "Healthy relationships are built on trust, communication, and mutual respect. Practice active listening - really hear what others are saying without planning your response. Set healthy boundaries by communicating your needs clearly and respecting others' limits. Remember that it's okay to say no to social activities when you need time for yourself. Quality relationships require effort from both sides, so be willing to invest time and energy while also expecting the same in return.",
    tags: ["relationships", "communication", "boundaries", "social"],
  },
  {
    id: 5,
    title: "Academic Stress Relief",
    description:
      "Strategies to manage academic pressure and maintain work-life balance.",
    category: "Academic Support",
    type: "tool",
    duration: "15 min setup",
    rating: 4.5,
    content:
      "Academic stress is manageable with the right strategies. Break large projects into smaller, manageable tasks. Use the Pomodoro Technique: work for 25 minutes, then take a 5-minute break. Create a study schedule that includes regular breaks and leisure time. Don't aim for perfection - aim for progress. Remember that grades don't define your worth as a person. If you're struggling, reach out to professors, tutors, or academic advisors for help.",
    tags: ["academic", "study", "time management", "balance"],
  },
  {
    id: 6,
    title: "Crisis Resources",
    description:
      "Important contacts and resources for mental health emergencies and crisis situations.",
    category: "Crisis Support",
    type: "tool",
    duration: "Always available",
    rating: 5.0,
    content:
      "If you're in crisis or having thoughts of self-harm, help is available 24/7. National Suicide Prevention Lifeline: 988. Crisis Text Line: Text HOME to 741741. Campus Counseling Center: Available during business hours. Emergency Services: 911. Remember, reaching out for help is a sign of strength, not weakness. You matter, and there are people who want to help you through difficult times.",
    tags: ["crisis", "emergency", "support", "hotline"],
  },
];

const categories = [
  "All",
  "Stress Management",
  "Sleep & Wellness",
  "Mindfulness",
  "Relationships",
  "Academic Support",
  "Crisis Support",
];

export default function ResourcesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedResource, setSelectedResource] = useState<Resource | null>(
    null
  );

  const filteredResources = resources.filter((resource) => {
    const matchesSearch =
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );
    const matchesCategory =
      selectedCategory === "All" || resource.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "article":
        return <BookOpen className="h-4 w-4" />;
      case "video":
        return <Zap className="h-4 w-4" />;
      case "exercise":
        return <Heart className="h-4 w-4" />;
      case "tool":
        return <Shield className="h-4 w-4" />;
      default:
        return <BookOpen className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "article":
        return "bg-blue-100 text-blue-800";
      case "video":
        return "bg-purple-100 text-purple-800";
      case "exercise":
        return "bg-green-100 text-green-800";
      case "tool":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-[#d0e1d6]">
      <Header />

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-black mb-4">
              Wellness Resources
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore our curated collection of mental health resources, tools,
              and guides designed to support your wellbeing journey.
            </p>
          </div>

          {/* Search and Filter Section */}
          <div className="mb-8 space-y-4">
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={
                    selectedCategory === category ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="text-sm"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Resources Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resource) => (
              <Card
                key={resource.id}
                className="hover:shadow-lg transition-shadow duration-200"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between mb-2">
                    <Badge
                      className={`${getTypeColor(
                        resource.type
                      )} flex items-center gap-1`}
                    >
                      {getTypeIcon(resource.type)}
                      {resource.type}
                    </Badge>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      {resource.rating}
                    </div>
                  </div>
                  <CardTitle className="text-lg leading-tight">
                    {resource.title}
                  </CardTitle>
                  <CardDescription className="text-sm">
                    {resource.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {resource.duration}
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {resource.category}
                    </Badge>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {resource.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        className="w-full"
                        onClick={() => setSelectedResource(resource)}
                      >
                        View Resource
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <div className="flex items-center gap-2 mb-2">
                          <Badge
                            className={`${getTypeColor(
                              resource.type
                            )} flex items-center gap-1`}
                          >
                            {getTypeIcon(resource.type)}
                            {resource.type}
                          </Badge>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            {resource.rating}
                          </div>
                        </div>
                        <DialogTitle className="text-xl">
                          {resource.title}
                        </DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {resource.duration}
                          </div>
                          <Badge variant="outline">{resource.category}</Badge>
                        </div>
                        <div className="prose prose-sm max-w-none">
                          <p className="text-foreground leading-relaxed whitespace-pre-line">
                            {resource.content}
                          </p>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {resource.tags.map((tag) => (
                            <Badge
                              key={tag}
                              variant="secondary"
                              className="text-xs"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredResources.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                No resources found
              </h3>
              <p className="text-muted-foreground">
                Try adjusting your search terms or category filter to find what
                you're looking for.
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
