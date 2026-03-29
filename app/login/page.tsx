"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Header from "@/components/header";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { getDashboardPath, isUserRole, resolveEffectiveRole, type UserRole } from "@/lib/role-utils";

type LoginRole = UserRole;

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState<LoginRole>("student");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isBootstrapping, setIsBootstrapping] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const bootstrap = async () => {
      const { data: authData } = await supabase.auth.getUser();
      const authUser = authData.user;

      if (authUser) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", authUser.id)
          .maybeSingle();

        const role = resolveEffectiveRole(profile?.role, authUser.email ?? null);

        if (role === "admin" && profile?.role !== "admin") {
          await supabase.from("profiles").upsert(
            {
              id: authUser.id,
              role: "admin",
              email: authUser.email ?? null,
            },
            { onConflict: "id" },
          );
        }

        router.replace(getDashboardPath(role));
        return;
      }

      setIsBootstrapping(false);
    };

    bootstrap();
  }, [router]);

  if (isBootstrapping) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);

    const { data, error: loginError } = await supabase.auth.signInWithPassword({ email, password });

    setIsSubmitting(false);

    if (loginError || !data.user) {
      const message = loginError?.message || "Invalid credentials. Please try again.";
      setError(message);
      return;
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", data.user.id)
      .maybeSingle();

    let role = resolveEffectiveRole(profile?.role, data.user.email ?? null);

    if (!profile) {
      const roleFromMetadata = isUserRole(data.user.user_metadata?.role)
        ? data.user.user_metadata.role
        : "student";

      role = resolveEffectiveRole(roleFromMetadata, data.user.email ?? null);

      await supabase.from("profiles").upsert(
        {
          id: data.user.id,
          name:
            typeof data.user.user_metadata?.name === "string" && data.user.user_metadata.name.trim().length > 0
              ? data.user.user_metadata.name
              : data.user.email?.split("@")[0] || "User",
          role: roleFromMetadata,
          email: data.user.email ?? null,
        },
        { onConflict: "id" },
      );
    } else if (role === "admin" && profile?.role !== "admin") {
      await supabase.from("profiles").update({ role: "admin" }).eq("id", data.user.id);
    }

    if (role !== activeTab) {
      await supabase.auth.signOut();
      setError(`This account is registered as ${role}. Please choose the correct tab.`);
      return;
    }

    router.push(getDashboardPath(role));
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
              <div className="grid grid-cols-2 mb-6 bg-gray-100/50 rounded-xl p-1">
                <button
                  type="button"
                  onClick={() => setActiveTab("student")}
                  className={`rounded-lg h-10 text-sm transition-all ${
                    activeTab === "student"
                      ? "bg-white text-gray-900"
                      : "text-gray-600"
                  }`}
                >
                  Student
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("admin")}
                  className={`rounded-lg h-10 text-sm transition-all ${
                    activeTab === "admin"
                      ? "bg-white text-gray-900"
                      : "text-gray-600"
                  }`}
                >
                  Admin
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-700 font-medium">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-white/50 border-gray-200/50 text-gray-800 placeholder:text-gray-400 focus:border-blue-300 focus:ring-blue-200 backdrop-blur-sm transition-all duration-300 rounded-xl h-12"
                    disabled={isSubmitting}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-700 font-medium">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-white/50 border-gray-200/50 text-gray-800 placeholder:text-gray-400 focus:border-blue-300 focus:ring-blue-200 backdrop-blur-sm transition-all duration-300 rounded-xl h-12"
                    disabled={isSubmitting}
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
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </form>

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
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
