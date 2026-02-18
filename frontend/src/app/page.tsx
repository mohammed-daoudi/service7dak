import Link from 'next/link'
import { ArrowRight, CheckCircle, Users, Shield, Clock, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Navigation } from '@/components/navigation'
import { ClientToaster } from '@/components/client-toaster'

export default function HomePage() {
  const features = [
    {
      icon: Users,
      title: 'Connect with Trusted Providers',
      description: 'Find verified service providers in your area with ratings and reviews from real customers.'
    },
    {
      icon: Shield,
      title: 'Secure Platform',
      description: 'Safe and secure platform with user verification and dispute resolution system.'
    },
    {
      icon: Clock,
      title: 'Quick Response',
      description: 'Get responses from providers quickly and manage everything from your dashboard.'
    },
    {
      icon: Star,
      title: 'Quality Assurance',
      description: 'Rate and review services to maintain high quality standards across the platform.'
    }
  ]

  const steps = [
    {
      number: '1',
      title: 'Post Your Service',
      description: 'Describe what you need done, set your budget, and post your service request.'
    },
    {
      number: '2',
      title: 'Receive Applications',
      description: 'Get applications from qualified providers with their proposals and rates.'
    },
    {
      number: '3',
      title: 'Choose & Connect',
      description: 'Select the best provider for your needs and connect directly with them.'
    },
    {
      number: '4',
      title: 'Get It Done',
      description: 'Work with your chosen provider to complete the service and leave a review.'
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <ClientToaster />

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Connect with Local
              <span className="text-primary"> Service Providers</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Find trusted professionals for any task, from home repairs to tutoring.
              Post your service needs and get connected with verified providers in your area.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-lg">
              <Link href="/post-service">
                Post a Service
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg">
              <Link href="/services">Browse Services</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-muted/50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Why Choose Service7dak?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our platform makes it easy to find and hire trusted service providers for any task.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <Card key={feature.title} className="text-center">
                <CardHeader>
                  <div className="mx-auto mb-4 h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">How It Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Getting help with your tasks is simple with our 4-step process.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step) => (
              <div key={step.number} className="text-center space-y-4">
                <div className="mx-auto h-12 w-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-lg">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-primary py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-primary-foreground">
            <div className="space-y-2">
              <div className="text-4xl font-bold">10,000+</div>
              <div className="text-lg opacity-90">Services Completed</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold">5,000+</div>
              <div className="text-lg opacity-90">Trusted Providers</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold">4.8★</div>
              <div className="text-lg opacity-90">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">Ready to Get Started?</h2>
            <p className="text-xl text-muted-foreground">
              Join thousands of satisfied customers who trust Service7dak for their service needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/register">Sign Up Today</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/login">Sign In</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/50 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2">
              <div className="h-6 w-6 bg-primary rounded-md flex items-center justify-center">
                <CheckCircle className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-semibold">Service7dak</span>
            </div>
            <div className="text-sm text-muted-foreground">
              © 2024 Service7dak. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
