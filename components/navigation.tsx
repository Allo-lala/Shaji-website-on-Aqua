"use client"

import type React from "react"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Shield } from "lucide-react"
import { WalletConnect } from "@/components/wallet-connect"
import { ThemeToggle } from "@/components/theme-toggle"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"

export function Navigation() {
  const { isAuthenticated, isReady } = useAuth()
  const router = useRouter()

  const handleVerifyClick = (e: React.MouseEvent) => {
    if (isAuthenticated) {
      e.preventDefault()
      router.push("/dashboard")
    }
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-lg">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center gap-2">
          <Shield className="h-6 w-6 text-primary" />
          <span className="text-xl font-semibold">Shaji</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <Link href="/features" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Features
          </Link>
          <Link href="/about" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            About
          </Link>
          <Link href="/pricing" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Pricing
          </Link>
          <ThemeToggle />
          <WalletConnect />
          <Link href={isAuthenticated ? "/dashboard" : "/verify"} onClick={handleVerifyClick}>
            <Button size="sm">{isAuthenticated ? "Dashboard" : "Verify Document"}</Button>
          </Link>
        </div>
      </div>
    </nav>
  )
}
