"use client"

import { Share2, FileText, Eye, Trash2, LinkIcon, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/lib/auth-context"
import { useEffect, useState } from "react"

interface SharedFile {
  id: number
  document_id: number
  document_title: string
  document_type: string
  shared_with_email: string | null
  shared_with_wallet: string | null
  access_type: string
  share_link: string
  access_count: number
  expires_at: string | null
  is_active: boolean
  created_at: string
}

export default function SharedFilesPage() {
  const { walletAddress } = useAuth()
  const [sharedFiles, setSharedFiles] = useState<SharedFile[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (walletAddress) {
      fetchSharedFiles()
    }
  }, [walletAddress])

  const fetchSharedFiles = async () => {
    try {
      const response = await fetch(`/api/shared-files?walletAddress=${walletAddress}`)
      const data = await response.json()
      if (data.success) {
        setSharedFiles(data.sharedFiles)
      }
    } catch (error) {
      console.error("[v0] Error fetching shared files:", error)
    } finally {
      setLoading(false)
    }
  }

  const activeShares = sharedFiles.filter((f) => f.is_active && (!f.expires_at || new Date(f.expires_at) > new Date()))
  const expiredShares = sharedFiles.filter(
    (f) => !f.is_active || (f.expires_at && new Date(f.expires_at) <= new Date()),
  )

  const handleCopyLink = (link: string) => {
    navigator.clipboard.writeText(link)
  }

  if (loading) {
    return <div className="flex items-center justify-center py-12">Loading...</div>
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Shared Files</h2>
          <p className="text-sm text-muted-foreground">Manage files you've shared with others</p>
        </div>
        <Button className="gap-2">
          <Share2 className="h-4 w-4" />
          Share New File
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-primary/10 p-2">
              <Share2 className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">{activeShares.length}</p>
              <p className="text-sm text-muted-foreground">Active Shares</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-green-500/10 p-2">
              <Eye className="h-5 w-5 text-green-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">{sharedFiles.reduce((sum, file) => sum + file.access_count, 0)}</p>
              <p className="text-sm text-muted-foreground">Total Views</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-red-500/10 p-2">
              <Clock className="h-5 w-5 text-red-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">{expiredShares.length}</p>
              <p className="text-sm text-muted-foreground">Expired</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-blue-500/10 p-2">
              <FileText className="h-5 w-5 text-blue-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">{sharedFiles.length}</p>
              <p className="text-sm text-muted-foreground">Total Shared</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Shared Files List */}
      <Tabs defaultValue="active" className="space-y-4">
        <TabsList>
          <TabsTrigger value="active">Active Shares</TabsTrigger>
          <TabsTrigger value="expired">Expired</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          {activeShares.length > 0 ? (
            activeShares.map((file) => (
              <Card key={file.id} className="p-4 hover:border-primary/50 transition-colors">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="rounded-lg bg-primary/10 p-3">
                      <FileText className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{file.document_title}</h3>
                        <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                          active
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        Shared with {file.shared_with_email || file.shared_with_wallet || "Public"}
                      </p>

                      <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                        <div>
                          <p className="text-muted-foreground">Shared Date</p>
                          <p className="font-medium">{new Date(file.created_at).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Expires</p>
                          <p className="font-medium">
                            {file.expires_at ? new Date(file.expires_at).toLocaleDateString() : "Never"}
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Access Count</p>
                          <p className="font-medium">{file.access_count} views</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Type</p>
                          <p className="font-medium capitalize">{file.document_type}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 rounded-lg bg-muted p-2">
                        <LinkIcon className="h-4 w-4 text-muted-foreground shrink-0" />
                        <Input
                          value={file.share_link}
                          readOnly
                          className="h-8 border-0 bg-transparent p-0 text-xs focus-visible:ring-0"
                        />
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 shrink-0"
                          onClick={() => handleCopyLink(file.share_link)}
                        >
                          Copy
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button size="icon" variant="outline">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="outline">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <p className="text-sm text-muted-foreground text-center py-8">
              No active shares. Share a document to get started.
            </p>
          )}
        </TabsContent>

        <TabsContent value="expired" className="space-y-4">
          {expiredShares.length > 0 ? (
            expiredShares.map((file) => (
              <Card key={file.id} className="p-4 opacity-60">
                <div className="flex items-start gap-4">
                  <div className="rounded-lg bg-muted p-3">
                    <FileText className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold">{file.document_title}</h3>
                      <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500/20">
                        expired
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Shared with {file.shared_with_email || file.shared_with_wallet || "Public"}
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      Expired: {file.expires_at ? new Date(file.expires_at).toLocaleDateString() : "Deactivated"}
                    </p>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <p className="text-sm text-muted-foreground text-center py-8">No expired shares.</p>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
