import { Navigation } from "@/components/navigation"
import { Card } from "@/components/ui/card"
import { Shield, Target, Users, Zap, Lock, Globe } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Navigation />

      <div className="container mx-auto px-4 pt-32 pb-20">
        {/* Hero Section */}
        <div className="mx-auto mb-20 max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm text-primary">
            <Shield className="h-4 w-4" />
            About Shaji
          </div>
          <h1 className="mb-6 text-4xl font-bold md:text-5xl lg:text-6xl text-balance">
            Revolutionizing Academic Integrity with Blockchain
          </h1>
          <p className="text-lg text-muted-foreground text-pretty md:text-xl">
            Shaji is a cutting-edge platform that leverages blockchain technology and zero-knowledge proofs to provide
            instant, secure verification of academic documents worldwide.
          </p>
        </div>

        {/* Mission Section */}
        <section className="mb-20">
          <Card className="border-border/50 bg-card p-8 md:p-12">
            <div className="grid gap-8 md:grid-cols-2 md:items-center">
              <div>
                <h2 className="mb-4 text-3xl font-bold">Our Mission</h2>
                <p className="mb-4 text-muted-foreground leading-relaxed">
                  We believe that academic credentials should be instantly verifiable, completely secure, and
                  universally trusted. Traditional verification methods are slow, expensive, and vulnerable to fraud.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Shaji eliminates these problems by using the Aqua Protocol blockchain to create an immutable,
                  cryptographically secure record of every academic document, making verification instant and
                  fraud-proof.
                </p>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-primary/20 blur-3xl" />
                  <div className="relative flex h-64 w-64 items-center justify-center rounded-full border-2 border-primary/30 bg-primary/5">
                    <Shield className="h-32 w-32 text-primary" />
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Values Section */}
        <section className="mb-20">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">Our Core Values</h2>
            <p className="text-lg text-muted-foreground">The principles that guide everything we do</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="border-border/50 bg-card p-6">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Lock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Security First</h3>
              <p className="text-muted-foreground leading-relaxed">
                We use military-grade encryption and blockchain technology to ensure your documents are protected
                against fraud and tampering.
              </p>
            </Card>

            <Card className="border-border/50 bg-card p-6">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Privacy Matters</h3>
              <p className="text-muted-foreground leading-relaxed">
                Zero-knowledge proofs allow verification without exposing sensitive personal information, protecting
                student privacy at all times.
              </p>
            </Card>

            <Card className="border-border/50 bg-card p-6">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Speed & Efficiency</h3>
              <p className="text-muted-foreground leading-relaxed">
                Instant verification means no more waiting days or weeks for credential checks, accelerating hiring and
                admissions processes.
              </p>
            </Card>

            <Card className="border-border/50 bg-card p-6">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Globe className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Global Access</h3>
              <p className="text-muted-foreground leading-relaxed">
                Our platform works worldwide, making it easy to verify credentials from any institution, anywhere in the
                world.
              </p>
            </Card>

            <Card className="border-border/50 bg-card p-6">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Accuracy</h3>
              <p className="text-muted-foreground leading-relaxed">
                Blockchain-based verification eliminates human error and ensures 100% accurate credential validation
                every time.
              </p>
            </Card>

            <Card className="border-border/50 bg-card p-6">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Trust</h3>
              <p className="text-muted-foreground leading-relaxed">
                Built on transparent, immutable blockchain technology that creates an unbreakable chain of trust for
                academic credentials.
              </p>
            </Card>
          </div>
        </section>

        {/* Technology Section */}
        <section className="mb-20">
          <Card className="border-border/50 bg-card p-8 md:p-12">
            <div className="mb-8 text-center">
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">Powered by Aqua Protocol</h2>
              <p className="text-lg text-muted-foreground">
                Built on cutting-edge blockchain infrastructure for maximum security and reliability
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-lg border border-border/50 bg-muted/20 p-6">
                <h3 className="mb-3 text-lg font-semibold">Zero-Knowledge Proofs</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Advanced cryptographic techniques that allow verification of credentials without revealing sensitive
                  personal information, ensuring maximum privacy protection.
                </p>
              </div>

              <div className="rounded-lg border border-border/50 bg-muted/20 p-6">
                <h3 className="mb-3 text-lg font-semibold">Immutable Records</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Once a document is registered on the blockchain, it cannot be altered or deleted, creating a
                  permanent, tamper-proof record of authenticity.
                </p>
              </div>

              <div className="rounded-lg border border-border/50 bg-muted/20 p-6">
                <h3 className="mb-3 text-lg font-semibold">Decentralized Network</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  No single point of failure means the system is always available and resistant to attacks or
                  manipulation by bad actors.
                </p>
              </div>

              <div className="rounded-lg border border-border/50 bg-muted/20 p-6">
                <h3 className="mb-3 text-lg font-semibold">Smart Contracts</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Automated verification logic ensures consistent, reliable results without human intervention or the
                  possibility of bias.
                </p>
              </div>
            </div>
          </Card>
        </section>

        {/* Stats Section */}
        <section className="mb-20">
          <Card className="border-primary/20 bg-gradient-to-br from-primary/10 to-accent/10 p-8 md:p-12">
            <div className="grid gap-8 text-center md:grid-cols-3">
              <div>
                <div className="mb-2 text-4xl font-bold text-primary md:text-5xl">10K+</div>
                <p className="text-muted-foreground">Documents Verified</p>
              </div>
              <div>
                <div className="mb-2 text-4xl font-bold text-primary md:text-5xl">500+</div>
                <p className="text-muted-foreground">Partner Institutions</p>
              </div>
              <div>
                <div className="mb-2 text-4xl font-bold text-primary md:text-5xl">50+</div>
                <p className="text-muted-foreground">Countries Supported</p>
              </div>
            </div>
          </Card>
        </section>

        {/* Team Section */}
        <section>
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">Built by Experts</h2>
            <p className="text-lg text-muted-foreground">
              Our team combines expertise in blockchain, cryptography, and education technology
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <Card className="border-border/50 bg-card p-6 text-center">
              <div className="mb-4 inline-flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                <Users className="h-10 w-10 text-primary" />
              </div>
              <h3 className="mb-1 text-lg font-semibold">Blockchain Engineers</h3>
              <p className="text-sm text-muted-foreground">
                Experts in distributed systems and cryptographic protocols
              </p>
            </Card>

            <Card className="border-border/50 bg-card p-6 text-center">
              <div className="mb-4 inline-flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                <Shield className="h-10 w-10 text-primary" />
              </div>
              <h3 className="mb-1 text-lg font-semibold">Security Specialists</h3>
              <p className="text-sm text-muted-foreground">Dedicated to protecting your data and privacy</p>
            </Card>

            <Card className="border-border/50 bg-card p-6 text-center">
              <div className="mb-4 inline-flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                <Target className="h-10 w-10 text-primary" />
              </div>
              <h3 className="mb-1 text-lg font-semibold">Education Advisors</h3>
              <p className="text-sm text-muted-foreground">Understanding the needs of institutions and students</p>
            </Card>
          </div>
        </section>
      </div>
    </div>
  )
}
