"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Upload, FileText, CheckCircle2, XCircle, Loader2, Camera } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"

interface VerificationResult {
  success: boolean
  documentHash: string
  blockchainTxHash: string
  verificationStatus: string
  timestamp: string
  issuer?: string
  recipient?: string
}

export default function VerifyDocumentPage() {
  const { walletAddress } = useAuth()
  const router = useRouter()
  const [file, setFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isVerifying, setIsVerifying] = useState(false)
  const [result, setResult] = useState<VerificationResult | null>(null)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile && droppedFile.type === "application/pdf") {
      setFile(droppedFile)
      setResult(null)
    }
  }, [])

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      setResult(null)
    }
  }

  const handleVerify = async () => {
    if (!file || !walletAddress) return

    setIsVerifying(true)

    // Simulate verification process
    setTimeout(() => {
      const mockResult: VerificationResult = {
        success: true,
        documentHash: "0x" + Math.random().toString(16).substring(2, 66),
        blockchainTxHash: "0x" + Math.random().toString(16).substring(2, 66),
        verificationStatus: "verified",
        timestamp: new Date().toISOString(),
        issuer: "University ",
        recipient: walletAddress,
      }

      setResult(mockResult)
      setIsVerifying(false)
    }, 3000)
  }

  const handleReset = () => {
    setFile(null)
    setResult(null)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold">Verify Document</h2>
        <p className="text-sm text-muted-foreground">
          Upload and verify your academic documents using blockchain technology
        </p>
      </div>

      {/* Mobile App Note */}
      <Card className="p-4 bg-primary/5 border-primary/20">
        <div className="flex items-start gap-3">
          <Camera className="h-5 w-5 text-primary mt-0.5" />
          <div>
            <h3 className="font-medium text-sm mb-1">Mobile App Available</h3>
            <p className="text-sm text-muted-foreground">
              On our mobile app, you can scan documents directly with your camera for instant verification.
            </p>
          </div>
        </div>
      </Card>

      {/* Upload Area */}
      {!result && (
        <Card className="p-8">
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
              isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/25"
            }`}
          >
            {!file ? (
              <div className="space-y-4">
                <div className="mx-auto w-fit rounded-full bg-primary/10 p-4">
                  <Upload className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Drop your document here</h3>
                  <p className="text-sm text-muted-foreground mb-4">or click to browse</p>
                  <input type="file" id="file-upload" accept=".pdf" onChange={handleFileSelect} className="hidden" />
                  <Button asChild variant="outline" className="bg-transparent">
                    <label htmlFor="file-upload" className="cursor-pointer">
                      Browse Files
                    </label>
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">Supported format: PDF (max 10MB)</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="mx-auto w-fit rounded-full bg-primary/10 p-4">
                  <FileText className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">{file.name}</h3>
                  <p className="text-sm text-muted-foreground">{(file.size / 1024).toFixed(2)} KB</p>
                </div>
                <div className="flex items-center justify-center gap-3">
                  <Button onClick={handleVerify} disabled={isVerifying} className="gap-2">
                    {isVerifying ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Verifying...
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="h-4 w-4" />
                        Verify Document
                      </>
                    )}
                  </Button>
                  <Button variant="outline" onClick={handleReset} disabled={isVerifying} className="bg-transparent">
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </div>
        </Card>
      )}

      {/* Verification Result */}
      {result && (
        <Card className="p-6">
          <div className="flex items-start gap-4 mb-6">
            {result.success ? (
              <div className="rounded-full bg-green-500/10 p-3">
                <CheckCircle2 className="h-6 w-6 text-green-500" />
              </div>
            ) : (
              <div className="rounded-full bg-red-500/10 p-3">
                <XCircle className="h-6 w-6 text-red-500" />
              </div>
            )}
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-1">
                {result.success ? "Document Verified Successfully" : "Verification Failed"}
              </h3>
              <p className="text-sm text-muted-foreground">
                {result.success
                  ? "Your document has been verified and recorded on the blockchain"
                  : "We couldn't verify this document"}
              </p>
            </div>
          </div>

          {result.success && (
            <div className="space-y-3 border-t pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Document Hash</p>
                  <p className="text-sm font-mono break-all">{result.documentHash}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Blockchain TX</p>
                  <p className="text-sm font-mono break-all">{result.blockchainTxHash}</p>
                </div>
                {result.issuer && (
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Issuer</p>
                    <p className="text-sm font-medium">{result.issuer}</p>
                  </div>
                )}
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Verification Date</p>
                  <p className="text-sm font-medium">{new Date(result.timestamp).toLocaleString()}</p>
                </div>
              </div>
            </div>
          )}

          <div className="flex items-center gap-3 mt-6 pt-4 border-t">
            <Button onClick={handleReset} className="flex-1">
              Verify Another Document
            </Button>
            <Button variant="outline" onClick={() => router.push("/dashboard")} className="flex-1 bg-transparent">
              View All Documents
            </Button>
          </div>
        </Card>
      )}
    </div>
  )
}
