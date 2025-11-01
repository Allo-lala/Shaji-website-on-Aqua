"use client"

import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Wallet, LogOut } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export function DashboardHeader() {
  const { walletAddress, logout } = useAuth()

  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
  }

  return (
    <header className="flex h-16 items-center justify-between border-b border-border bg-card px-6">
      <div className="flex items-center gap-4">
        <h1 className="text-lg font-semibold">Dashboard</h1>
      </div>

      <div className="flex items-center gap-4">
        <ThemeToggle />

        {walletAddress && (
          <div className="flex items-center gap-2 rounded-lg border border-primary/20 bg-primary/10 px-3 py-1.5">
            <Wallet className="h-4 w-4 text-primary" />
            <span className="font-mono text-sm text-primary">{formatAddress(walletAddress)}</span>
          </div>
        )}

        <Button variant="outline" size="sm" onClick={logout} className="gap-2 bg-transparent">
          <LogOut className="h-4 w-4" />
          Disconnect
        </Button>
      </div>
    </header>
  )
}
