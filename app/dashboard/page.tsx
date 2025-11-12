"use client"

import { FileText, Upload, Search, Filter, CheckCircle2, Clock, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { useAuth } from "@/lib/auth-context"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

interface Document {
  id: number
  document_type: string
  title: string
  institution: string
  issue_date: string
  verification_status: string
  created_at: string
}

export default function DashboardPage() {
  const { walletAddress } = useAuth()
  const [documents, setDocuments] = useState<Document[]>([])
  const [loading, setLoading] = useState(true)
  const [showUploadDialog, setShowUploadDialog] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (walletAddress) {
      fetchDocuments()
    }
  }, [walletAddress])

  const fetchDocuments = async () => {
    try {
      const response = await fetch(`/api/documents?walletAddress=${walletAddress}`)
      const data = await response.json()
      if (data.success) {
        setDocuments(data.documents)
      }
    } catch (error) {
      console.error("[v0] Error fetching documents:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleUploadClick = () => {
    router.push("/dashboard/verify")
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "verified":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />
    }
  }

  if (loading) {
    return <div className="flex items-center justify-center py-12">Loading...</div>
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">My Documents</h2>
          <p className="text-sm text-muted-foreground">Manage and verify your academic documents</p>
        </div>
        <Button className="gap-2" onClick={handleUploadClick}>
          <Upload className="h-4 w-4" />
          Verify Document
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search documents..." className="pl-9" />
        </div>
        <Button variant="outline" className="gap-2 bg-transparent">
          <Filter className="h-4 w-4" />
          Filter
        </Button>
      </div>

      {/* Documents Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {documents.map((doc) => (
          <Card key={doc.id} className="p-4 hover:border-primary/50 transition-colors cursor-pointer">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-primary/10 p-2">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium truncate">{doc.title}</h3>
                <p className="text-sm text-muted-foreground">{doc.institution}</p>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Type</span>
                <span className="font-medium capitalize">{doc.document_type}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Date</span>
                <span className="font-medium">{new Date(doc.issue_date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Status</span>
                <div className="flex items-center gap-1">
                  {getStatusIcon(doc.verification_status)}
                  <span
                    className={`font-medium capitalize ${
                      doc.verification_status === "verified" ? "text-green-500" : "text-yellow-500"
                    }`}
                  >
                    {doc.verification_status}
                  </span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {documents.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="rounded-full bg-muted p-6 mb-4">
            <FileText className="h-12 w-12 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-2">No documents yet</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Upload your first academic document to get started with verification
          </p>
          <Button className="gap-2" onClick={handleUploadClick}>
            <Upload className="h-4 w-4" />
            Verify Document
          </Button>
        </div>
      )}
    </div>
  )
}
