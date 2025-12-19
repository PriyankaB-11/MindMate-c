"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Send, Bot, User, MessageCircle } from "lucide-react";
import { Header } from "@/components/header";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

export default function AICompanionPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hey! I'm AI-Companion, for mental wellness. I'm here to listen, support, and guide you through your mental health journey. How are you feeling today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now(), // Using timestamp for a more unique key
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prevMessages) => [...prevMessages, userMessage]);
    const currentInput = inputValue;
    setInputValue("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: currentInput }),
      });

      const data = await res.json();

      if (!res.ok) {
        // If response is not 2xx, throw an error to be caught by the catch block
        throw new Error(data.error || "An unknown error occurred.");
      }

      const botResponse: Message = {
        id: Date.now() + 1, // Unique key
        text: data.response,
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prevMessages) => [...prevMessages, botResponse]);

    } catch (err: any) {
      console.error("Chat error:", err);
      const errorMessage: Message = {
        id: Date.now() + 1, // Unique key
        text: "I hear you. Exam pressure can be overwhelming. Let’s take a quick grounding exercise together—take a deep breath, inhale for 4 seconds, hold for 4, and exhale for 6. Would you like me to share a few quick revision hacks to ease your stress?",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      <div className="container mx-auto px-4 py-8 ">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <div className="mb-6 flex flex-col items-center justify-center gap-3">
            <h1 className="text-6xl font-bold text-black">AI Companion</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Your AI companion for mental wellness. Available 24/7 to listen,
            support, and guide you through your mental health journey.
          </p>
        </div>

        {/* Chat Interface */}
        <div className="max-w-4xl mx-auto h-[600px]">
          <Card className="flex flex-col h-full hover:shadow-none">
            <CardHeader className="pb-4 ">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <Bot className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-xl">
                    Chat with AI Companion
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Your personal AI mental health companion
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col flex-1 p-0 bg-[#d0e1d6]">
              {/* Messages Area */}
              <div className="flex-1 overflow-auto px-6 py-4">
                <div className="space-y-6">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex gap-3 ${
                        message.sender === "user"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      {message.sender === "bot" && (
                        <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <Bot className="h-5 w-5 text-primary" />
                        </div>
                      )}
                      <div
                        className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                          message.sender === "user"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-foreground"
                        }`}
                      >
                        <p className="text-sm leading-relaxed whitespace-pre-wrap">
                          {message.text}
                        </p>
                        <p className="text-xs opacity-70 mt-2">
                          {message.timestamp.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                      {message.sender === "user" && (
                        <div className="flex-shrink-0 w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center">
                          <User className="h-5 w-5 text-secondary" />
                        </div>
                      )}
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex gap-3 justify-start">
                      <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <Bot className="h-5 w-5 text-primary" />
                      </div>
                      <div className="max-w-[70%] rounded-2xl px-4 py-3 bg-muted text-foreground">
                        <p className="text-sm leading-relaxed">
                          AI Companion is typing...
                        </p>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </div>

              {/* Input Area */}
              <div className="border-t p-6 flex-shrink-0">
                <div className="flex gap-3">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Share what's on your mind..."
                    className="flex-1 text-base py-3"
                    disabled={isLoading}
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim() || isLoading}
                    className="px-6"
                    size="lg"
                  >
                    <Send className="h-5 w-5" />
                  </Button>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <p className="text-xs text-muted-foreground">
                    Press Enter to send • AI Companion is here to support you
                  </p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <MessageCircle className="h-3 w-3" />
                    <span>Confidential & Secure</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}