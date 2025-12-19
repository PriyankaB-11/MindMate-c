"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth, type UserRole } from "@/contexts/auth-context";
import Header from "@/components/header";
import {
  Loader2,
  CheckCircle,
  Brain,
  Shield,
  Chrome,
  Apple,
  Facebook,
} from "lucide-react";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "" as UserRole | "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const { signup, isLoading } = useAuth();
  const router = useRouter();

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validation
    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword ||
      !formData.role
    ) {
      setError("Please fill in all fields");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    const success = await signup(
      formData.name,
      formData.email,
      formData.password,
      formData.role
    );
    if (success) {
      setSuccess(true);
      setTimeout(() => {
        const dashboardPath =
          formData.role === "admin" ? "/dashboard/admin" : "/dashboard/student";
        router.push(dashboardPath);
      }, 2000);
    } else {
      setError("An account with this email already exists");
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-[#d0e1d6] relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80  rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute top-40 left-40 w-80 h-80 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>
        <Header />
        <div className="relative z-10 flex items-center justify-center pt-20 pb-8 px-4">
          <Card className="w-full max-w-md bg-white/70 backdrop-blur-xl border border-white/20 shadow-xl rounded-2xl">
            <CardContent className="pt-6">
              <div className="text-center space-y-4 animate-in fade-in zoom-in duration-1000">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-green-400 to-teal-500 mb-4">
                  <CheckCircle className="h-10 w-10 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Account Created!
                </h2>
                <p className="text-gray-600">
                  Welcome to MindMate! Redirecting you to your dashboard...
                </p>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
                  <div
                    className="bg-gradient-to-r from-green-400 to-teal-500 h-2 rounded-full animate-pulse"
                    style={{ width: "100%" }}
                  ></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#d0e1d6] relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>
      <Header />

      <div className="relative z-10 flex items-center justify-center pt-20 pb-8 px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <h1 className="text-3xl font-bold text-black mb-2">
              Create Account
            </h1>
            <p className="text-black/80">
              Join our mental health support community
            </p>
          </div>

          <Card className="bg-black/70 backdrop-blur-xl border border-white/20 shadow-xl rounded-2xl">
            <CardHeader className="space-y-1 text-center">
              <CardTitle className="text-2xl text-black">Sign Up</CardTitle>
              <CardDescription className="text-black-300">
                Create your account to get started
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-gray-700 font-medium">
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="bg-white/50 border-gray-200/50 text-gray-800 placeholder:text-gray-400 focus:border-blue-300 focus:ring-blue-200 backdrop-blur-sm transition-all duration-300 rounded-xl h-12"
                    disabled={isLoading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-700 font-medium">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="bg-white/50 border-gray-200/50 text-gray-800 placeholder:text-gray-400 focus:border-blue-300 focus:ring-blue-200 backdrop-blur-sm transition-all duration-300 rounded-xl h-12"
                    disabled={isLoading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role" className="text-gray-700 font-medium">
                    Role
                  </Label>
                  <Select
                    value={formData.role}
                    onValueChange={(value) => handleInputChange("role", value)}
                    disabled={isLoading}
                  >
                    <SelectTrigger className="bg-white/50 border-gray-200/50 text-gray-800 focus:border-blue-300 focus:ring-blue-200 backdrop-blur-sm rounded-xl h-12">
                      <SelectValue
                        placeholder="Select your role"
                        className="text-gray-400"
                      />
                    </SelectTrigger>
                    <SelectContent className="bg-white/95 backdrop-blur-xl border-gray-200/50 rounded-xl">
                      <SelectItem
                        value="student"
                        className="text-gray-800 hover:bg-blue-50 focus:bg-blue-50"
                      >
                        <div className="flex items-center">
                          <Brain className="w-4 h-4 mr-2 text-blue-600" />
                          Student
                        </div>
                      </SelectItem>
                      <SelectItem
                        value="admin"
                        className="text-gray-800 hover:bg-purple-50 focus:bg-purple-50"
                      >
                        <div className="flex items-center">
                          <Shield className="w-4 h-4 mr-2 text-purple-600" />
                          Admin/Counsellor
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
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
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={(e) =>
                      handleInputChange("password", e.target.value)
                    }
                    className="bg-white/50 border-gray-200/50 text-gray-800 placeholder:text-gray-400 focus:border-blue-300 focus:ring-blue-200 backdrop-blur-sm transition-all duration-300 rounded-xl h-12"
                    disabled={isLoading}
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="confirmPassword"
                    className="text-gray-700 font-medium"
                  >
                    Confirm Password
                  </Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      handleInputChange("confirmPassword", e.target.value)
                    }
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
                  className="w-full bg-[#57b97a] hover:bg-[#1b7e3e] text-white shadow-lg transition-all duration-300 rounded-xl h-12 font-medium"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </Button>
              </form>

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
                <p className="text-gray-600 text-sm">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
                  >
                    Sign in
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
