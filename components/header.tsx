"use client";
import Image from "next/image";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, LogOut, Settings } from "lucide-react";
import type { User } from "@supabase/supabase-js";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { supabase } from "@/lib/supabaseClient";
import { getDashboardPath, resolveEffectiveRole, type UserRole } from "@/lib/role-utils";

interface HeaderUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

function displayNameFromAuthUser(authUser: User): string {
  const fromMeta = authUser.user_metadata?.name;
  if (typeof fromMeta === "string" && fromMeta.trim().length > 0) {
    return fromMeta.trim();
  }

  if (authUser.email) {
    return authUser.email.split("@")[0];
  }

  return "User";
}

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<HeaderUser | null>(null);

  useEffect(() => {
    let active = true;

    const loadUser = async () => {
      const { data: authData } = await supabase.auth.getUser();
      const authUser = authData.user;

      if (!authUser) {
        if (active) setUser(null);
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("name, role")
        .eq("id", authUser.id)
        .maybeSingle();

      const role = resolveEffectiveRole(profile?.role, authUser.email ?? null);

      if (role === "admin" && profile?.role !== "admin") {
        await supabase
          .from("profiles")
          .upsert(
            {
              id: authUser.id,
              role: "admin",
              email: authUser.email ?? null,
            },
            { onConflict: "id" },
          );
      }

      const name =
        typeof profile?.name === "string" && profile.name.trim().length > 0
          ? profile.name
          : displayNameFromAuthUser(authUser);

      if (active) {
        setUser({
          id: authUser.id,
          email: authUser.email ?? "",
          name,
          role,
        });
      }
    };

    loadUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      loadUser();
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setIsMenuOpen(false);
  };

  const getDashboardLink = () => {
    if (!user) return "/login";
    return getDashboardPath(user.role);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/">
          <Image
            src="/icons/LogoMindMate.png" // no "public" in the path
            alt="MindMate Logo"
            width={70}
            height={70}
            style={{ width: "32px", height: "auto" }}
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link
            href="/"
            className="text-foreground hover:text-primary transition-colors"
          >
            Home
          </Link>
          <Link
            href="/AI-Companion"
            className="text-foreground hover:text-primary transition-colors"
          >
            AI-Companion
          </Link>
          <Link
            href="/booking"
            className="text-foreground hover:text-primary transition-colors"
          >
            Book an Appointment
          </Link>

          <Link
            href="/resources"
            className="text-foreground hover:text-primary transition-colors"
          >
            Resources
          </Link>
          <Link
            href="/about"
            className="text-foreground hover:text-primary transition-colors"
          >
            About
          </Link>
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <div className="flex items-center space-x-3">
              <Button variant="outline" asChild>
                <Link href={getDashboardLink()}>Dashboard</Link>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {user.name?.charAt(0).toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium">{user.name}</p>
                      <p className="w-[200px] truncate text-sm text-muted-foreground">
                        {user.email}
                      </p>
                      <p className="text-xs text-muted-foreground capitalize">
                        {user.role}
                      </p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href={getDashboardLink()} className="cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="cursor-pointer"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <Button variant="outline" asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button variant="default" asChild>
                <Link href="/signup">Sign Up</Link>
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <nav className="container mx-auto px-4 py-4 space-y-4">
            <Link
              href="/"
              className="block text-foreground hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/booking"
              className="block text-foreground hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Book an Appointment
            </Link>
            <Link
              href="/AI-Companion"
              className="block text-foreground hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              AI-Companion 
            </Link>
            <Link
              href="/resources"
              className="block text-foreground hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Resources
            </Link>
            <Link
              href="/about"
              className="block text-foreground hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>

            {user ? (
              <div className="space-y-3 pt-4 border-t border-border">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {user.name?.charAt(0).toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-sm">{user.name}</p>
                    <p className="text-xs text-muted-foreground capitalize">
                      {user.role}
                    </p>
                  </div>
                </div>
                <Button
                  className="w-full bg-transparent"
                  variant="outline"
                  asChild
                >
                  <Link
                    href={getDashboardLink()}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                </Button>
                <Button
                  className="w-full"
                  variant="ghost"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </Button>
              </div>
            ) : (
              <div className="space-y-3 pt-4 border-t border-border">
                <Button
                  className="w-full bg-transparent"
                  variant="outline"
                  asChild
                >
                  <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                    Login
                  </Link>
                </Button>
                <Button className="w-full" asChild>
                  <Link href="/signup" onClick={() => setIsMenuOpen(false)}>
                    Sign Up
                  </Link>
                </Button>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}

export { Header };
export default Header;
