"use client"

import { User, Mail, Shield, Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/lib/auth-context"
import { useState, useEffect } from "react"

interface UserProfile {
  id: number
  wallet_address: string
  name: string | null
  email: string | null
  created_at: string
}

interface Document {
  id: number
  title: string
  institution: string
  issue_date: string
  verification_status: string
  document_type: string
}

export default function ProfilePage() {
  const { walletAddress } = useAuth()
  const [copied, setCopied] = useState(false)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [documents, setDocuments] = useState<Document[]>([])
  const [loading, setLoading] = useState(true)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")

  useEffect(() => {
    if (walletAddress) {
      fetchProfile()
      fetchDocuments()
    }
  }, [walletAddress])

  const fetchProfile = async () => {
    try {
      const response = await fetch(`/api/profile?walletAddress=${walletAddress}`)
      const data = await response.json()
      if (data.success) {
        setProfile(data.user)
        setName(data.user.name || "")
        setEmail(data.user.email || "")
      }
    } catch (error) {
      console.error("[v0] Error fetching profile:", error)
    } finally {
      setLoading(false)
    }
  }

  const fetchDocuments = async () => {
    try {
      const response = await fetch(`/api/documents?walletAddress=${walletAddress}`)
      const data = await response.json()
      if (data.success) {
        setDocuments(data.documents.filter((d: Document) => d.verification_status === "verified"))
      }
    } catch (error) {
      console.error("[ Error fetching documents:", error)
    }
  }

  const handleSaveProfile = async () => {
    try {
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ walletAddress, name, email }),
      })
      const data = await response.json()
      if (data.success) {
        setProfile(data.user)
      }
    } catch (error) {
      console.error(" Error updating profile:", error)
    }
  }

  const handleCopyAddress = () => {
    if (walletAddress) {
      navigator.clipboard.writeText(walletAddress)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  if (loading) {
    return <div className="flex items-center justify-center py-12">Loading...</div>
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold">Identity Profile</h2>
        <p className="text-sm text-muted-foreground">Manage your digital identity and personal information</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Profile Card */}
        <Card className="p-6 lg:col-span-1">
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 rounded-full bg-primary/10 p-6">
              <User className="h-12 w-12 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-1">{profile?.name || "Anonymous User"}</h3>
            <p className="text-sm text-muted-foreground mb-4">Student</p>

            <div className="w-full rounded-lg bg-muted p-3 mb-4">
              <p className="text-xs text-muted-foreground mb-1">Wallet Address</p>
              <div className="flex items-center justify-between gap-2">
                <p className="font-mono text-xs truncate">{walletAddress}</p>
                <Button size="icon" variant="ghost" className="h-6 w-6 shrink-0" onClick={handleCopyAddress}>
                  {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                </Button>
              </div>
            </div>

            <div className="flex w-full gap-2">
              <Button variant="outline" className="flex-1 gap-2 bg-transparent">
                <Shield className="h-4 w-4" />
                Verify
              </Button>
            </div>
          </div>
        </Card>

        {/* Personal Information */}
        <Card className="p-6 lg:col-span-2">
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-1">Personal Information</h3>
            <p className="text-sm text-muted-foreground">Update your personal details and information</p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button
                variant="outline"
                onClick={() => {
                  setName(profile?.name || "")
                  setEmail(profile?.email || "")
                }}
              >
                Cancel
              </Button>
              <Button onClick={handleSaveProfile}>Save Changes</Button>
            </div>
          </div>
        </Card>
      </div>

      {/* Verification Status */}
      <Card className="p-6">
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-1">Verification Status</h3>
          <p className="text-sm text-muted-foreground">Your identity verification and credential status</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div
            className={`rounded-lg border p-4 ${
              profile?.email ? "border-green-500/20 bg-green-500/10" : "border-yellow-500/20 bg-yellow-500/10"
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <Shield className={`h-5 w-5 ${profile?.email ? "text-green-500" : "text-yellow-500"}`} />
              <h4 className={`font-semibold ${profile?.email ? "text-green-500" : "text-yellow-500"}`}>
                {profile?.email ? "Email Verified" : "Email Pending"}
              </h4>
            </div>
            <p className="text-sm text-muted-foreground">
              {profile?.email ? `Verified: ${profile.email}` : "Add your email"}
            </p>
          </div>

          <div className="rounded-lg border border-green-500/20 bg-green-500/10 p-4">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="h-5 w-5 text-green-500" />
              <h4 className="font-semibold text-green-500">Wallet Connected</h4>
            </div>
            <p className="text-sm text-muted-foreground">
              {profile?.created_at ? new Date(profile.created_at).toLocaleDateString() : "Connected"}
            </p>
          </div>

          <div className="rounded-lg border border-yellow-500/20 bg-yellow-500/10 p-4">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="h-5 w-5 text-yellow-500" />
              <h4 className="font-semibold text-yellow-500">ID Pending</h4>
            </div>
            <p className="text-sm text-muted-foreground">Submit documents</p>
          </div>

          <div className="rounded-lg border border-muted bg-muted/50 p-4">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="h-5 w-5 text-muted-foreground" />
              <h4 className="font-semibold text-muted-foreground">KYC Not Started</h4>
            </div>
            <p className="text-sm text-muted-foreground">Begin verification</p>
          </div>
        </div>
      </Card>

      {/* Academic Credentials */}
      <Card className="p-6">
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-1">Academic Credentials</h3>
          <p className="text-sm text-muted-foreground">Your verified educational achievements</p>
        </div>

        <div className="space-y-4">
          {documents.length > 0 ? (
            documents.map((doc) => (
              <div key={doc.id} className="flex items-start gap-4 rounded-lg border border-border p-4">
                <div className="rounded-lg bg-primary/10 p-2">
                  <Shield className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold mb-1">{doc.title}</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    {doc.institution} • {new Date(doc.issue_date).getFullYear()}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-green-500 font-medium capitalize">{doc.verification_status}</span>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className="text-xs text-muted-foreground capitalize">{doc.document_type}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-muted-foreground text-center py-8">
              No verified credentials yet. Upload and verify your documents to see them here.
            </p>
          )}
        </div>
      </Card>
    </div>
  )
}
