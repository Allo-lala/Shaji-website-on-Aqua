"use client"

import type React from "react"

import { useState } from "react"
import { usePrivy } from "@privy-io/react-auth"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Upload, FileCheck, AlertCircle, CheckCircle2, Shield, Clock, Building2, Camera, Wallet } from "lucide-react"

type VerificationStatus = "idle" | "uploading" | "verifying" | "verified" | "failed"

interface VerificationResult {
  status: "authentic" | "invalid"
  documentType: string
  institution: string
  issueDate: string
  studentName: string
  verificationId: string
  blockchainHash: string
}

export default function VerifyPage() {
  const { ready, authenticated, login } = usePrivy()
  const [verificationStatus, setVerificationStatus] = useState<VerificationStatus>("idle")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [verificationResult, setVerificationResult] = useState<VerificationResult | null>(null)
  const [dragActive, setDragActive] = useState(false)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (!authenticated) {
      alert("Please connect your wallet first to verify documents")
      return
    }

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!authenticated) {
      alert("Please connect your wallet first to verify documents")
      return
    }

    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  const handleFile = (file: File) => {
    const validTypes = ["application/pdf", "image/jpeg", "image/jpg", "image/png"]
    if (!validTypes.includes(file.type)) {
      alert("Please upload a PDF or image file (JPG, PNG)")
      return
    }

    setSelectedFile(file)
    setVerificationStatus("idle")
    setVerificationResult(null)
  }

  const handleVerify = async () => {
    if (!selectedFile) return

    if (!authenticated) {
      alert("Please connect your wallet first to verify documents")
      return
    }

    setVerificationStatus("uploading")

    await new Promise((resolve) => setTimeout(resolve, 1500))

    setVerificationStatus("verifying")

    await new Promise((resolve) => setTimeout(resolve, 2500))

    const mockResult: VerificationResult = {
      status: Math.random() > 0.3 ? "authentic" : "invalid",
      documentType: "Bachelor's Degree",
      institution: "Victoria University ",
      issueDate: "October 15, 2025",
      studentName: "Kyagulanyi Allan",
      verificationId: "VRF-" + Math.random().toString(36).substring(2, 11).toUpperCase(),
      blockchainHash: "0x" + Math.random().toString(16).substring(2, 66),
    }

    setVerificationResult(mockResult)
    setVerificationStatus(mockResult.status === "authentic" ? "verified" : "failed")
  }

  const resetVerification = () => {
    setVerificationStatus("idle")
    setSelectedFile(null)
    setVerificationResult(null)
  }

  return (
    <div className="min-h-screen">
      <Navigation />

      <div className="container mx-auto px-4 pt-32 pb-20">
        <div className="mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm text-primary">
              {/* <Shield className="h-4 w-4" /> */}
              Blockchain Verification
            </div>
            <h1 className="mb-4 text-4xl font-bold md:text-5xl text-balance">Verify Academic Document</h1>
            <p className="text-lg text-muted-foreground text-pretty">
              Upload your document to verify its authenticity using blockchain technology
            </p>
            <div className="mt-4 inline-flex items-center gap-2 rounded-lg border border-accent/20 bg-accent/10 px-4 py-2 text-sm text-accent">
              <Camera className="h-4 w-4" />
              <span>Mobile app users can scan documents directly with their camera</span>
            </div>
          </div>

          {ready && !authenticated ? (
            <Card className="border-border/50 bg-card p-12 text-center">
              <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Wallet className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Connect Your Wallet</h3>
              <p className="mb-6 text-muted-foreground">
                You need to connect your crypto wallet to verify documents on the blockchain
              </p>
              <Button onClick={login} size="lg" className="gap-2">
                <Wallet className="h-4 w-4" />
                Connect Wallet
              </Button>
            </Card>
          ) : null}

          {ready && authenticated && (verificationStatus === "idle" || verificationStatus === "uploading") ? (
            <Card className="border-border/50 bg-card p-8">
              <div
                className={`relative rounded-lg border-2 border-dashed p-12 text-center transition-colors ${
                  dragActive
                    ? "border-primary bg-primary/5"
                    : selectedFile
                      ? "border-primary/50 bg-primary/5"
                      : "border-border/50 bg-muted/20"
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  id="file-upload"
                  className="sr-only"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileInput}
                  disabled={verificationStatus === "uploading"}
                />

                {!selectedFile ? (
                  <>
                    <Upload className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                    <h3 className="mb-2 text-lg font-semibold">Upload Document</h3>
                    <p className="mb-4 text-sm text-muted-foreground">
                      Drag and drop your file here, or click to browse
                    </p>
                    <label htmlFor="file-upload">
                      <Button variant="outline" className="cursor-pointer bg-transparent" asChild>
                        <span>Choose File</span>
                      </Button>
                    </label>
                    <p className="mt-4 text-xs text-muted-foreground">Supports PDF, JPG, PNG (Max 10MB)</p>
                  </>
                ) : (
                  <>
                    <FileCheck className="mx-auto mb-4 h-12 w-12 text-primary" />
                    <h3 className="mb-2 text-lg font-semibold">{selectedFile.name}</h3>
                    <p className="mb-4 text-sm text-muted-foreground">
                      {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                    {verificationStatus === "uploading" ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                        <span className="text-sm text-muted-foreground">Uploading...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-3">
                        <Button onClick={handleVerify}>Verify Document</Button>
                        <Button variant="outline" onClick={resetVerification}>
                          Remove
                        </Button>
                      </div>
                    )}
                  </>
                )}
              </div>
            </Card>
          ) : null}

          {verificationStatus === "verifying" ? (
            <Card className="border-border/50 bg-card p-12 text-center">
              <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Verifying Document</h3>
              <p className="text-muted-foreground">Checking cryptographic proofs on the Aqua Protocol blockchain...</p>
            </Card>
          ) : null}

          {(verificationStatus === "verified" || verificationStatus === "failed") && verificationResult ? (
            <div className="space-y-6">
              <Card
                className={`border-2 p-8 ${
                  verificationResult.status === "authentic"
                    ? "border-green-500/50 bg-green-500/5"
                    : "border-red-500/50 bg-red-500/5"
                }`}
              >
                <div className="flex items-start gap-4">
                  {verificationResult.status === "authentic" ? (
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-green-500/20">
                      <CheckCircle2 className="h-6 w-6 text-green-500" />
                    </div>
                  ) : (
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-500/20">
                      <AlertCircle className="h-6 w-6 text-red-500" />
                    </div>
                  )}

                  <div className="flex-1">
                    <h3 className="mb-2 text-2xl font-bold">
                      {verificationResult.status === "authentic" ? "Document Verified" : "Verification Failed"}
                    </h3>
                    <p className="text-muted-foreground">
                      {verificationResult.status === "authentic"
                        ? "This document has been verified as authentic on the blockchain"
                        : "This document could not be verified. It may be fraudulent or not registered."}
                    </p>
                  </div>
                </div>
              </Card>

              {verificationResult.status === "authentic" ? (
                <Card className="border-border/50 bg-card p-8">
                  <h4 className="mb-6 text-lg font-semibold">Document Details</h4>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                        <FileCheck className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Document Type</p>
                        <p className="font-medium">{verificationResult.documentType}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                        <Building2 className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Institution</p>
                        <p className="font-medium">{verificationResult.institution}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                        <Clock className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Issue Date</p>
                        <p className="font-medium">{verificationResult.issueDate}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                        <Shield className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Student Name</p>
                        <p className="font-medium">{verificationResult.studentName}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 space-y-3 rounded-lg border border-border/50 bg-muted/20 p-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Verification ID</p>
                      <p className="font-mono text-sm">{verificationResult.verificationId}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Blockchain Hash</p>
                      <p className="break-all font-mono text-xs">{verificationResult.blockchainHash}</p>
                    </div>
                  </div>
                </Card>
              ) : null}

              <div className="flex justify-center">
                <Button onClick={resetVerification} size="lg">
                  Verify Another Document
                </Button>
              </div>
            </div>
          ) : null}

          {ready && authenticated && verificationStatus === "idle" && !selectedFile ? (
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              <Card className="border-border/50 bg-card p-6 text-center">
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Shield className="h-5 w-5 text-primary" />
                </div>
                <h4 className="mb-2 font-semibold">Secure</h4>
                <p className="text-sm text-muted-foreground">Your documents are encrypted and never stored</p>
              </Card>

              <Card className="border-border/50 bg-card p-6 text-center">
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                </div>
                <h4 className="mb-2 font-semibold">Instant</h4>
                <p className="text-sm text-muted-foreground">Get verification results in seconds</p>
              </Card>

              <Card className="border-border/50 bg-card p-6 text-center">
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <FileCheck className="h-5 w-5 text-primary" />
                </div>
                <h4 className="mb-2 font-semibold">Reliable</h4>
                <p className="text-sm text-muted-foreground">Powered by blockchain technology</p>
              </Card>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}
