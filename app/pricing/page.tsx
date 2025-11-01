import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Shield, Check, Zap, Building2, Users } from "lucide-react"

export default function PricingPage() {
  return (
    <div className="min-h-screen">
      <Navigation />

      <div className="container mx-auto px-4 pt-32 pb-20">
        {/* Hero Section */}
        <div className="mx-auto mb-20 max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm text-primary">
            <Shield className="h-4 w-4" />
            Simple, Transparent Pricing
          </div>
          <h1 className="mb-6 text-4xl font-bold md:text-5xl lg:text-6xl text-balance">
            Choose the Plan That's Right for You
          </h1>
          <p className="text-lg text-muted-foreground text-pretty md:text-xl">
            Whether you're an individual, institution, or enterprise, we have a plan that fits your verification needs
          </p>
        </div>

        {/* Pricing Cards */}
        <section className="mb-20">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Individual Plan */}
            <Card className="border-border/50 bg-card p-8">
              <div className="mb-6">
                <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-muted/50 px-3 py-1 text-xs font-medium">
                  <Users className="h-3 w-3" />
                  Individual
                </div>
                <h3 className="mb-2 text-2xl font-bold">Free</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold">$0</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <p className="text-sm text-muted-foreground">Perfect for students and job seekers</p>
              </div>

              <Link href="/verify">
                <Button variant="outline" className="mb-6 w-full bg-transparent">
                  Get Started
                </Button>
              </Link>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Check className="h-5 w-5 shrink-0 text-primary" />
                  <span className="text-sm">Up to 5 verifications per month</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="h-5 w-5 shrink-0 text-primary" />
                  <span className="text-sm">Basic document types</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="h-5 w-5 shrink-0 text-primary" />
                  <span className="text-sm">Mobile app access</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="h-5 w-5 shrink-0 text-primary" />
                  <span className="text-sm">Email support</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="h-5 w-5 shrink-0 text-primary" />
                  <span className="text-sm">Verification history (30 days)</span>
                </div>
              </div>
            </Card>

            {/* Professional Plan */}
            <Card className="relative border-2 border-primary bg-card p-8">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <div className="rounded-full bg-primary px-4 py-1 text-xs font-semibold text-primary-foreground">
                  Most Popular
                </div>
              </div>

              <div className="mb-6">
                <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  <Zap className="h-3 w-3" />
                  Professional
                </div>
                <h3 className="mb-2 text-2xl font-bold">Pro</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold">$49</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <p className="text-sm text-muted-foreground">For employers and recruiters</p>
              </div>

              <Link href="/verify">
                <Button className="mb-6 w-full">Start Free Trial</Button>
              </Link>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Check className="h-5 w-5 shrink-0 text-primary" />
                  <span className="text-sm">Unlimited verifications</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="h-5 w-5 shrink-0 text-primary" />
                  <span className="text-sm">All document types</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="h-5 w-5 shrink-0 text-primary" />
                  <span className="text-sm">Priority support</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="h-5 w-5 shrink-0 text-primary" />
                  <span className="text-sm">API access</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="h-5 w-5 shrink-0 text-primary" />
                  <span className="text-sm">Advanced analytics</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="h-5 w-5 shrink-0 text-primary" />
                  <span className="text-sm">Unlimited verification history</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="h-5 w-5 shrink-0 text-primary" />
                  <span className="text-sm">Bulk verification</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="h-5 w-5 shrink-0 text-primary" />
                  <span className="text-sm">ATS integration</span>
                </div>
              </div>
            </Card>

            {/* Enterprise Plan */}
            <Card className="border-border/50 bg-card p-8">
              <div className="mb-6">
                <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-muted/50 px-3 py-1 text-xs font-medium">
                  <Building2 className="h-3 w-3" />
                  Enterprise
                </div>
                <h3 className="mb-2 text-2xl font-bold">Enterprise</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold">Custom</span>
                </div>
                <p className="text-sm text-muted-foreground">For institutions and large organizations</p>
              </div>

              <Link href="#contact">
                <Button variant="outline" className="mb-6 w-full bg-transparent">
                  Contact Sales
                </Button>
              </Link>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Check className="h-5 w-5 shrink-0 text-primary" />
                  <span className="text-sm">Everything in Pro</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="h-5 w-5 shrink-0 text-primary" />
                  <span className="text-sm">Unlimited team members</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="h-5 w-5 shrink-0 text-primary" />
                  <span className="text-sm">Custom branding</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="h-5 w-5 shrink-0 text-primary" />
                  <span className="text-sm">Dedicated account manager</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="h-5 w-5 shrink-0 text-primary" />
                  <span className="text-sm">SLA guarantee</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="h-5 w-5 shrink-0 text-primary" />
                  <span className="text-sm">Custom integrations</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="h-5 w-5 shrink-0 text-primary" />
                  <span className="text-sm">On-premise deployment option</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="h-5 w-5 shrink-0 text-primary" />
                  <span className="text-sm">24/7 phone support</span>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Institutional Pricing */}
        <section className="mb-20">
          <Card className="border-primary/20 bg-gradient-to-br from-primary/10 to-accent/10 p-8 md:p-12">
            <div className="grid gap-8 md:grid-cols-2 md:items-center">
              <div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm text-primary">
                  <Building2 className="h-4 w-4" />
                  For Institutions
                </div>
                <h2 className="mb-4 text-3xl font-bold md:text-4xl">Special Institutional Pricing</h2>
                <p className="mb-6 text-muted-foreground leading-relaxed">
                  Universities and educational institutions can issue unlimited credentials to students with our
                  institutional plans. Contact us for volume pricing and custom solutions.
                </p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Check className="h-5 w-5 shrink-0 text-primary" />
                    <span className="text-sm">Unlimited credential issuance</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="h-5 w-5 shrink-0 text-primary" />
                    <span className="text-sm">White-label solution available</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="h-5 w-5 shrink-0 text-primary" />
                    <span className="text-sm">Integration with student information systems</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="h-5 w-5 shrink-0 text-primary" />
                    <span className="text-sm">Dedicated implementation support</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <Link href="#contact">
                  <Button size="lg">Request a Demo</Button>
                </Link>
              </div>
            </div>
          </Card>
        </section>

        {/* FAQ Section */}
        <section className="mb-20">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">Frequently Asked Questions</h2>
            <p className="text-lg text-muted-foreground">Everything you need to know about our pricing</p>
          </div>

          <div className="mx-auto max-w-3xl space-y-4">
            <Card className="border-border/50 bg-card p-6">
              <h3 className="mb-2 font-semibold">Is there a free trial?</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Yes! The Professional plan includes a 14-day free trial with full access to all features. No credit card
                required to start.
              </p>
            </Card>

            <Card className="border-border/50 bg-card p-6">
              <h3 className="mb-2 font-semibold">Can I change plans later?</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Absolutely. You can upgrade or downgrade your plan at any time. Changes take effect immediately, and
                we'll prorate any charges.
              </p>
            </Card>

            <Card className="border-border/50 bg-card p-6">
              <h3 className="mb-2 font-semibold">What payment methods do you accept?</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                We accept all major credit cards, PayPal, and wire transfers for Enterprise customers. All payments are
                processed securely.
              </p>
            </Card>

            <Card className="border-border/50 bg-card p-6">
              <h3 className="mb-2 font-semibold">Is my data secure?</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Yes. All data is encrypted end-to-end and stored on the blockchain. We never store sensitive personal
                information, and we're fully compliant with FERPA and GDPR.
              </p>
            </Card>

            <Card className="border-border/50 bg-card p-6">
              <h3 className="mb-2 font-semibold">Do you offer discounts for non-profits?</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Yes! We offer special pricing for non-profit organizations and educational institutions. Contact our
                sales team to learn more.
              </p>
            </Card>

            <Card className="border-border/50 bg-card p-6">
              <h3 className="mb-2 font-semibold">What happens if I exceed my verification limit?</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                On the Free plan, you'll be prompted to upgrade. Professional and Enterprise plans include unlimited
                verifications, so you never have to worry about limits.
              </p>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section>
          <Card className="border-primary/20 bg-gradient-to-br from-primary/10 to-accent/10 p-12 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">Ready to Get Started?</h2>
            <p className="mb-8 text-lg text-muted-foreground">
              Join thousands of users who trust Shaji for secure document verification
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/verify">
                <Button size="lg">Start Verifying</Button>
              </Link>
              <Link href="#contact">
                <Button size="lg" variant="outline" className="bg-transparent">
                  Contact Sales
                </Button>
              </Link>
            </div>
          </Card>
        </section>
      </div>
    </div>
  )
}
