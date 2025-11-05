"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { WalletConnect } from "@/components/wallet-connect"
import { ThemeToggle } from "@/components/theme-toggle"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"

export function Navigation() {
  const { isAuthenticated, isReady } = useAuth()
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <img
            src="/logo.png"
            alt="Shaji logo"
            className="h-8 w-auto"
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
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
        </div>

        {/* Mobile Toggle Button */}
        <button
          className="md:hidden flex items-center justify-center p-2 rounded-lg text-muted-foreground hover:text-foreground"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-lg border-t border-border">
          <div className="flex flex-col items-start space-y-4 px-4 py-4">
            <Link href="/features" className="text-sm text-muted-foreground hover:text-foreground" onClick={() => setMenuOpen(false)}>
              Features
            </Link>
            <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground" onClick={() => setMenuOpen(false)}>
              About
            </Link>
            <Link href="/pricing" className="text-sm text-muted-foreground hover:text-foreground" onClick={() => setMenuOpen(false)}>
              Pricing
            </Link>
            <div className="flex items-center gap-4 pt-2">
              <ThemeToggle />
              <WalletConnect />
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
