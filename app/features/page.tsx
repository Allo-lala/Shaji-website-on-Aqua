import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Shield,
  Lock,
  Zap,
  FileCheck,
  Globe,
  CheckCircle,
  Smartphone,
  Database,
  Eye,
  Clock,
  Users,
  BarChart3,
} from "lucide-react"

export default function FeaturesPage() {
  return (
    <div className="min-h-screen">
      <Navigation />

      <div className="container mx-auto px-4 pt-32 pb-20">
        {/* Hero Section */}
        <div className="mx-auto mb-20 max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm text-primary">
            <Zap className="h-4 w-4" />
            Platform Features
          </div>
          <h1 className="mb-6 text-4xl font-bold md:text-5xl lg:text-6xl text-balance">
            Everything You Need for Secure Document Verification
          </h1>
          <p className="text-lg text-muted-foreground text-pretty md:text-xl">
            Shaji combines cutting-edge blockchain technology with intuitive design to deliver the most comprehensive
            academic verification platform available.
          </p>
        </div>

        {/* Core Features */}
        <section className="mb-20">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">Core Features</h2>
            <p className="text-lg text-muted-foreground">
              Powerful capabilities designed for institutions, employers, and students
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="border-border/50 bg-card p-6">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Lock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Zero-Knowledge Verification</h3>
              <p className="text-muted-foreground leading-relaxed">
                Verify credentials without exposing sensitive personal information using advanced cryptographic proofs
                that protect student privacy.
              </p>
            </Card>

            <Card className="border-border/50 bg-card p-6">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Instant Results</h3>
              <p className="text-muted-foreground leading-relaxed">
                Get verification results in seconds, not days. Our blockchain-powered system provides real-time
                authentication of academic documents.
              </p>
            </Card>

            <Card className="border-border/50 bg-card p-6">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Blockchain Security</h3>
              <p className="text-muted-foreground leading-relaxed">
                Immutable records on Aqua Protocol ensure documents cannot be forged, tampered with, or fraudulently
                created.
              </p>
            </Card>

            <Card className="border-border/50 bg-card p-6">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <FileCheck className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Multiple Document Types</h3>
              <p className="text-muted-foreground leading-relaxed">
                Support for diplomas, transcripts, certificates, badges, and more from institutions worldwide.
              </p>
            </Card>

            <Card className="border-border/50 bg-card p-6">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Globe className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Global Coverage</h3>
              <p className="text-muted-foreground leading-relaxed">
                Verify credentials from institutions in over 50 countries with support for multiple languages and
                formats.
              </p>
            </Card>

            <Card className="border-border/50 bg-card p-6">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Smartphone className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Mobile-First Design</h3>
              <p className="text-muted-foreground leading-relaxed">
                Easy-to-use mobile app makes verification accessible anywhere, anytime, from any device.
              </p>
            </Card>
          </div>
        </section>

        {/* For Institutions */}
        <section className="mb-20">
          <Card className="border-border/50 bg-card p-8 md:p-12">
            <div className="mb-8">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm text-primary">
                <Database className="h-4 w-4" />
                For Institutions
              </div>
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">Institutional Features</h2>
              <p className="text-lg text-muted-foreground">
                Powerful tools for universities and educational institutions to manage and issue credentials
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <CheckCircle className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="mb-2 font-semibold">Bulk Document Issuance</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Issue and register thousands of credentials at once with our batch processing system.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <CheckCircle className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="mb-2 font-semibold">Custom Branding</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Add your institution's logo, colors, and branding to all issued credentials.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <CheckCircle className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="mb-2 font-semibold">API Integration</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Seamlessly integrate with your existing student information systems and databases.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <CheckCircle className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="mb-2 font-semibold">Analytics Dashboard</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Track verification requests, issuance metrics, and usage statistics in real-time.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <CheckCircle className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="mb-2 font-semibold">Role-Based Access</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Control who can issue, verify, and manage credentials with granular permissions.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <CheckCircle className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="mb-2 font-semibold">Compliance Support</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Meet FERPA, GDPR, and other regulatory requirements with built-in compliance features.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* For Employers */}
        <section className="mb-20">
          <Card className="border-border/50 bg-card p-8 md:p-12">
            <div className="mb-8">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm text-primary">
                <Users className="h-4 w-4" />
                For Employers
              </div>
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">Employer Features</h2>
              <p className="text-lg text-muted-foreground">
                Streamline your hiring process with instant credential verification
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="mb-2 font-semibold">Instant Background Checks</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Verify candidate credentials in seconds instead of waiting weeks for traditional checks.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <BarChart3 className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="mb-2 font-semibold">Verification History</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Keep detailed records of all credential verifications for compliance and auditing.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Eye className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="mb-2 font-semibold">Fraud Detection</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Automatically identify forged or tampered documents with blockchain verification.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Database className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="mb-2 font-semibold">ATS Integration</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Connect with popular applicant tracking systems for seamless workflow integration.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Security Features */}
        <section className="mb-20">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">Enterprise-Grade Security</h2>
            <p className="text-lg text-muted-foreground">Built with security and privacy as top priorities</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="border-border/50 bg-card p-6 text-center">
              <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Lock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 font-semibold">End-to-End Encryption</h3>
              <p className="text-sm text-muted-foreground">All data encrypted in transit and at rest</p>
            </Card>

            <Card className="border-border/50 bg-card p-6 text-center">
              <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 font-semibold">Immutable Records</h3>
              <p className="text-sm text-muted-foreground">Blockchain ensures tamper-proof verification</p>
            </Card>

            <Card className="border-border/50 bg-card p-6 text-center">
              <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Eye className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 font-semibold">Privacy First</h3>
              <p className="text-sm text-muted-foreground">Zero-knowledge proofs protect personal data</p>
            </Card>

            <Card className="border-border/50 bg-card p-6 text-center">
              <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <CheckCircle className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 font-semibold">Compliance Ready</h3>
              <p className="text-sm text-muted-foreground">FERPA, GDPR, and SOC 2 compliant</p>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section>
          <Card className="border-primary/20 bg-gradient-to-br from-primary/10 to-accent/10 p-12 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">Ready to Get Started?</h2>
            <p className="mb-8 text-lg text-muted-foreground">
              Experience the future of academic credential verification today
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/verify">
                <Button size="lg">Verify a Document</Button>
              </Link>
              <Link href="/pricing">
                <Button size="lg" variant="outline" className="bg-transparent">
                  View Pricing
                </Button>
              </Link>
            </div>
          </Card>
        </section>
      </div>

      {/* Footer */}
      <footer className="border-t border-border/40 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              <span className="font-semibold">Shaji</span>
              <span className="text-sm text-muted-foreground">· Powered by Aqua Protocol</span>
            </div>

            <div className="flex items-center gap-6">
              <Link href="/features" className="text-sm text-muted-foreground hover:text-foreground">
                Features
              </Link>
              <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground">
                About
              </Link>
              <Link href="/pricing" className="text-sm text-muted-foreground hover:text-foreground">
                Pricing
              </Link>
            </div>

            <div className="flex items-center gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-foreground"
                aria-label="GitHub"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-foreground"
                aria-label="X (Twitter)"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>

          <div className="mt-6 border-t border-border/40 pt-6 text-center text-sm text-muted-foreground">
            © 2025 Shaji. All rights reserved.
          </div>
        </div>
      </footer>
      
    </div>
  )
}
