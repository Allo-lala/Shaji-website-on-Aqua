"use client"

import { PenTool, CheckCircle, Clock, XCircle, FileSignature } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/lib/auth-context"
import { useEffect, useState } from "react"

interface Signature {
  id: number
  requester_name: string
  requester_email: string
  purpose: string
  status: string
  signature_hash: string | null
  created_at: string
  signed_at: string | null
}

export default function SignaturesPage() {
  const { walletAddress } = useAuth()
  const [signatures, setSignatures] = useState<Signature[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (walletAddress) {
      fetchSignatures()
    }
  }, [walletAddress])

  const fetchSignatures = async () => {
    try {
      const response = await fetch(`/api/signatures?walletAddress=${walletAddress}`)
      const data = await response.json()
      if (data.success) {
        setSignatures(data.signatures)
      }
    } catch (error) {
      console.error("[v0] Error fetching signatures:", error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "pending":
        return <Clock className="h-5 w-5 text-yellow-500" />
      case "rejected":
        return <XCircle className="h-5 w-5 text-red-500" />
      default:
        return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500/10 text-green-500 border-green-500/20"
      case "pending":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
      case "rejected":
        return "bg-red-500/10 text-red-500 border-red-500/20"
      default:
        return ""
    }
  }

  const completedSignatures = signatures.filter((s) => s.status === "completed")
  const pendingSignatures = signatures.filter((s) => s.status === "pending")

  if (loading) {
    return <div className="flex items-center justify-center py-12">Loading...</div>
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Digital Signatures</h2>
          <p className="text-sm text-muted-foreground">
            Manage your cryptographic signatures and verification requests
          </p>
        </div>
        <Button className="gap-2">
          <FileSignature className="h-4 w-4" />
          New Signature Request
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-green-500/10 p-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">{completedSignatures.length}</p>
              <p className="text-sm text-muted-foreground">Completed</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-yellow-500/10 p-2">
              <Clock className="h-5 w-5 text-yellow-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">{pendingSignatures.length}</p>
              <p className="text-sm text-muted-foreground">Pending</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-primary/10 p-2">
              <PenTool className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">{signatures.length}</p>
              <p className="text-sm text-muted-foreground">Total Signatures</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Signatures List */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Signatures</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {signatures.map((signature) => (
            <Card key={signature.id} className="p-4 hover:border-primary/50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <div className="rounded-lg bg-primary/10 p-3">
                    <PenTool className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold">{signature.purpose || "Signature Request"}</h3>
                      {getStatusIcon(signature.status)}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">Requested by {signature.requester_name}</p>
                    {signature.signature_hash && (
                      <div className="rounded-lg bg-muted p-2 mt-2">
                        <p className="text-xs text-muted-foreground mb-1">Signature Hash</p>
                        <p className="font-mono text-xs break-all">{signature.signature_hash}</p>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <Badge variant="outline" className={getStatusColor(signature.status)}>
                    {signature.status}
                  </Badge>
                  <p className="text-xs text-muted-foreground">{new Date(signature.created_at).toLocaleDateString()}</p>
                  {signature.status === "pending" && (
                    <Button size="sm" className="mt-2">
                      Sign Now
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          {pendingSignatures.map((signature) => (
            <Card key={signature.id} className="p-4 hover:border-primary/50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <div className="rounded-lg bg-yellow-500/10 p-3">
                    <Clock className="h-6 w-6 text-yellow-500" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">{signature.purpose || "Signature Request"}</h3>
                    <p className="text-sm text-muted-foreground">Requested by {signature.requester_name}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <p className="text-xs text-muted-foreground">{new Date(signature.created_at).toLocaleDateString()}</p>
                  <Button size="sm">Sign Now</Button>
                </div>
              </div>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          {completedSignatures.map((signature) => (
            <Card key={signature.id} className="p-4">
              <div className="flex items-start gap-4">
                <div className="rounded-lg bg-green-500/10 p-3">
                  <CheckCircle className="h-6 w-6 text-green-500" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">{signature.purpose || "Signature Request"}</h3>
                  <p className="text-sm text-muted-foreground mb-2">Requested by {signature.requester_name}</p>
                  {signature.signature_hash && (
                    <div className="rounded-lg bg-muted p-2">
                      <p className="text-xs text-muted-foreground mb-1">Signature Hash</p>
                      <p className="font-mono text-xs break-all">{signature.signature_hash}</p>
                    </div>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">{new Date(signature.created_at).toLocaleDateString()}</p>
              </div>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}
