"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth, type UserRole } from "@/contexts/auth-context";
import Header from "@/components/header";
import { Loader2, Brain, Shield, Chrome, Apple, Facebook } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState<UserRole>("student");
  const { login, isLoading } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    const success = await login(email, password, activeTab);
    if (success) {
      const dashboardPath =
        activeTab === "admin" ? "/dashboard/admin" : "/dashboard/student";
      router.push(dashboardPath);
    } else {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[#d0e1d6] relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80  rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <Header />

      <div className="relative z-10 flex items-center justify-center pt-20 pb-8 px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <h1 className="text-3xl font-bold text-black mb-2">Welcome Back</h1>
            <p className="text-black/80">Sign in to your account to continue</p>
          </div>

          <Card className="bg-white/70 backdrop-blur-xl border border-white/20 shadow-xl rounded-2xl">
            <CardContent className="p-8">
              <Tabs
                value={activeTab}
                onValueChange={(value) => setActiveTab(value as UserRole)}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-2 mb-6 bg-gray-100/50 backdrop-blur-sm border-0 rounded-xl">
                  <TabsTrigger
                    value="student"
                    className="text-sm data-[state=active]:bg-white data-[state=active]:text-gray-800 text-gray-600 transition-all duration-300 rounded-lg"
                  >
                    <Brain className="w-4 h-4 mr-2" />
                    Student
                  </TabsTrigger>
                  <TabsTrigger
                    value="admin"
                    className="text-sm data-[state=active]:bg-white data-[state=active]:text-gray-800 text-gray-600 transition-all duration-300 rounded-lg"
                  >
                    <Shield className="w-4 h-4 mr-2" />
                    Admin
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="student" className="space-y-4">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="email"
                        className="text-gray-700 font-medium"
                      >
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-white/50 border-gray-200/50 text-gray-800 placeholder:text-gray-400 focus:border-blue-300 focus:ring-blue-200 backdrop-blur-sm transition-all duration-300 rounded-xl h-12"
                        disabled={isLoading}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="password"
                        className="text-gray-700 font-medium"
                      >
                        Password
                      </Label>
                      <Input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-white/50 border-gray-200/50 text-gray-800 placeholder:text-gray-400 focus:border-blue-300 focus:ring-blue-200 backdrop-blur-sm transition-all duration-300 rounded-xl h-12"
                        disabled={isLoading}
                      />
                    </div>

                    {error && (
                      <Alert
                        variant="destructive"
                        className="bg-red-50/80 border-red-200 text-red-700 rounded-xl"
                      >
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    )}

                    <Button
                      type="submit"
                      className="w-full bg-blue-900 hover:bg-blue-800 text-white shadow-lg transition-all duration-300 rounded-xl h-12 font-medium"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Signing in...
                        </>
                      ) : (
                        "Sign In"
                      )}
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="admin" className="space-y-4">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="admin-email"
                        className="text-gray-700 font-medium"
                      >
                        Email Address
                      </Label>
                      <Input
                        id="admin-email"
                        type="email"
                        placeholder="admin@MindMate.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-white/50 border-gray-200/50 text-gray-800 placeholder:text-gray-400 focus:border-purple-300 focus:ring-purple-200 backdrop-blur-sm transition-all duration-300 rounded-xl h-12"
                        disabled={isLoading}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="admin-password"
                        className="text-gray-700 font-medium"
                      >
                        Password
                      </Label>
                      <Input
                        id="admin-password"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-white/50 border-gray-200/50 text-gray-800 placeholder:text-gray-400 focus:border-purple-300 focus:ring-purple-200 backdrop-blur-sm transition-all duration-300 rounded-xl h-12"
                        disabled={isLoading}
                      />
                    </div>

                    {error && (
                      <Alert
                        variant="destructive"
                        className="bg-red-50/80 border-red-200 text-red-700 rounded-xl"
                      >
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    )}

                    <Button
                      type="submit"
                      className="w-full bg-blue-900 hover:bg-blue-800 text-white shadow-lg transition-all duration-300 rounded-xl h-12 font-medium"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Signing in...
                        </>
                      ) : (
                        "Sign In"
                      )}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>

              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-gray-200" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-gray-500">
                      OR CONTINUE WITH
                    </span>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <Button
                    variant="outline"
                    className="w-full bg-white/50 border-gray-200/50 text-gray-700 hover:bg-white/70 transition-all duration-300 rounded-xl h-12"
                  >
                    <Chrome className="mr-2 h-4 w-4" />
                    Continue with Google
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full bg-white/50 border-gray-200/50 text-gray-700 hover:bg-white/70 transition-all duration-300 rounded-xl h-12"
                  >
                    <Apple className="mr-2 h-4 w-4" />
                    Continue with Apple
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full bg-white/50 border-gray-200/50 text-gray-700 hover:bg-white/70 transition-all duration-300 rounded-xl h-12"
                  >
                    <Facebook className="mr-2 h-4 w-4 text-blue-600" />
                    Continue with Meta
                  </Button>
                </div>
              </div>

              <div className="mt-6 text-center">
                <Link
                  href="/forgot-password"
                  className="text-gray-600 hover:text-gray-800 text-sm transition-colors duration-200"
                >
                  Forgot your password?
                </Link>
              </div>

              <div className="mt-6 text-center">
                <p className="text-gray-600 text-sm">
                  Don't have an account?{" "}
                  <Link
                    href="/signup"
                    className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
                  >
                    Sign up
                  </Link>
                </p>
              </div>

              <div className="mt-4 p-4 bg-gray-50/50 rounded-xl border border-gray-200/50">
                <p className="text-xs text-gray-500 text-center mb-2 font-medium">
                  Demo Credentials:
                </p>
                <div className="text-xs space-y-1 text-gray-600">
                  <p>
                    <strong className="text-blue-600">Student:</strong>{" "}
                    student@example.com / password
                  </p>
                  <p>
                    <strong className="text-purple-600">Admin:</strong>{" "}
                    admin@MindMate.com / password
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
