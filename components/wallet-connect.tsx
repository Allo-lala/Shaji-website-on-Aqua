"use client"
import { Button } from "@/components/ui/button"
import { Wallet } from "lucide-react"
import { useAuth } from "@/lib/auth-context"

export function WalletConnect() {
  const { isAuthenticated, walletAddress, isLoading, login, logout, isReady } = useAuth()

  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
  }

  // Show loading state while initializing
  if (!isReady || isLoading) {
    return (
      <Button size="sm" disabled className="gap-2">
        <Wallet className="h-4 w-4" />
        Loading...
      </Button>
    )
  }

  // Show connected state with wallet address
  if (isAuthenticated && walletAddress) {
    return (
      <div className="flex items-center gap-2">
        <div className="hidden items-center gap-2 rounded-lg border border-primary/20 bg-primary/10 px-3 py-1.5 text-sm text-primary sm:flex">
          <Wallet className="h-4 w-4" />
          <span className="font-mono">{formatAddress(walletAddress)}</span>
        </div>
        <Button size="sm" variant="outline" onClick={logout} className="bg-transparent">
          Disconnect
        </Button>
      </div>
    )
  }

  // Show connect button
  return (
    <Button size="sm" onClick={login} className="gap-2">
      <Wallet className="h-4 w-4" />
      Connect Wallet
    </Button>
  )
}
