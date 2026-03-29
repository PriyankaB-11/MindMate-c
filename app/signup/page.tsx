"use client";

import type React from "react";

import { useState, useEffect } from "react";
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
import { Alert, AlertDescription } from "@/components/ui/alert";
import Header from "@/components/header";
import {
  Loader2,
  CheckCircle,
} from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { getDashboardPath, resolveRoleForSignup } from "@/lib/role-utils";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("Welcome to MindMate! Redirecting you to your dashboard...");
  const [isLoading, setIsLoading] = useState(false);
  const [signupCooldown, setSignupCooldown] = useState(0);
  const router = useRouter();

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError("");
  };

  // Cooldown timer for rate limiting
  useEffect(() => {
    if (signupCooldown > 0) {
      const timer = setTimeout(() => {
        setSignupCooldown(signupCooldown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [signupCooldown]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Check if still in cooldown from rate limit
    if (signupCooldown > 0) {
      setError(`Please wait ${signupCooldown} seconds before trying again.`);
      return;
    }

    // Validation
    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("Please fill in all fields");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    setIsLoading(true);

    const resolvedRole = resolveRoleForSignup(formData.name, formData.email);

    try {
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            name: formData.name,
            role: resolvedRole,
          },
        },
      });

      if (signUpError) {
        // Handle rate limit errors
        if (/rate limit|too many|429/i.test(signUpError.message)) {
          setSignupCooldown(60);
          setError("Too many signup attempts. Please wait a minute before trying again.");
        } else {
          setError(signUpError.message || "Unable to create account");
        }
        return;
      }

      let resolvedUser = signUpData.user;
      let resolvedSession = signUpData.session;

      if (!signUpData.session || !signUpData.user) {
        const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });

        if (signInError || !signInData.user) {
          setError(
            "Account created, but automatic sign-in failed. If your Supabase project still requires email confirmation, disable email confirmation in Supabase Auth settings.",
          );
          return;
        }

        resolvedSession = signInData.session;
        resolvedUser = signInData.user;
      }

      if (!resolvedUser || !resolvedSession) {
        setError("Account was created, but sign-in session could not be established.");
        return;
      }

      const { error: profileError } = await supabase.from("profiles").upsert(
        {
          id: resolvedUser.id,
          name: formData.name,
          role: resolvedRole,
          email: formData.email,
        },
        { onConflict: "id" },
      );

      if (profileError) {
        await supabase.auth.signOut();
        setError(profileError.message || "Unable to create account profile");
        return;
      }

      if (resolvedUser) {
        setSuccess(true);
        setSuccessMessage("Welcome to MindMate! Redirecting you to your dashboard...");
        setTimeout(() => {
          router.push(getDashboardPath(resolvedRole));
        }, 2000);
      } else {
        setError("Unable to create account");
      }
    } catch (unknownError: unknown) {
      const message = unknownError instanceof Error ? unknownError.message : "Unexpected signup error";

      if (!navigator.onLine || /failed to fetch|networkerror|network request failed/i.test(message)) {
        setError(
          "Network error while contacting Supabase. Check your internet, disable VPN/ad blocker, and verify NEXT_PUBLIC_SUPABASE_URL/NEXT_PUBLIC_SUPABASE_ANON_KEY.",
        );
        return;
      }

      setError(message);
    } finally {
      setIsLoading(false);
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
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-linear-to-r from-green-400 to-teal-500 mb-4">
                  <CheckCircle className="h-10 w-10 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Account Created!
                </h2>
                <p className="text-gray-600">
                  {successMessage}
                </p>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
                  <div className="w-full bg-linear-to-r from-green-400 to-teal-500 h-2 rounded-full animate-pulse"></div>
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
                  disabled={isLoading || signupCooldown > 0}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating Account...
                    </>
                  ) : signupCooldown > 0 ? (
                    `Wait ${signupCooldown}s...`
                  ) : (
                    "Create Account"
                  )}
                </Button>
              </form>

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
