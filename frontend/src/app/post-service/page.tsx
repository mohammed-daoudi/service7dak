'use client'

import { useState } from 'react'
import { Navigation } from '@/components/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ArrowLeft, DollarSign, MapPin, Tag } from 'lucide-react'
import Link from 'next/link'
import { SERVICE_CATEGORIES } from '@/lib/types'

export default function PostServicePage() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
    location: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.title || !formData.description || !formData.category || !formData.price || !formData.location) {
      alert('Please fill in all fields')
      return
    }

    // Mock service creation
    console.log('Service posted:', formData)
    alert('Service posted successfully!')
    window.location.href = '/dashboard'
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      category: value
    }))
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-6">
            <Link href="/dashboard" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-4">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Dashboard
            </Link>
            <h1 className="text-3xl font-bold">Post a Service</h1>
            <p className="text-muted-foreground">Describe your service need and connect with providers</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Service Details</CardTitle>
              <CardDescription>
                Provide clear details about the service you need. The more specific you are, the better applications you'll receive.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Service Title *</Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="e.g., Fix Kitchen Faucet, House Cleaning, Website Design"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    Be clear and specific about what you need done
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Describe in detail what you need done, any specific requirements, timeline, etc."
                    rows={5}
                    value={formData.description}
                    onChange={handleChange}
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    Include important details like timeline, materials needed, and any special requirements
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select onValueChange={handleSelectChange} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {SERVICE_CATEGORIES.map(category => (
                          <SelectItem key={category} value={category}>
                            <div className="flex items-center">
                              <Tag className="h-4 w-4 mr-2" />
                              {category}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="price">Budget (USD) *</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="price"
                        name="price"
                        type="number"
                        placeholder="0"
                        className="pl-10"
                        value={formData.price}
                        onChange={handleChange}
                        required
                        min="1"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Set a fair budget for the work required
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location *</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="location"
                      name="location"
                      placeholder="City, State or 'Remote' for online services"
                      className="pl-10"
                      value={formData.location}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Specify where the service needs to be performed
                  </p>
                </div>

                <div className="bg-muted/50 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">What happens next?</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Your service will be posted and visible to providers</li>
                    <li>• Interested providers will send you applications with their proposals</li>
                    <li>• You can review applications and choose the best provider</li>
                    <li>• You'll be able to communicate directly with your chosen provider</li>
                  </ul>
                </div>

                <div className="flex gap-4">
                  <Button type="submit" className="flex-1">
                    Post Service
                  </Button>
                  <Button type="button" variant="outline" asChild>
                    <Link href="/dashboard">Cancel</Link>
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
