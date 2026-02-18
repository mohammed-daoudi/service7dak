'use client'

import { useState } from 'react'
import { Navigation } from '@/components/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { Search, Filter, MapPin, DollarSign, Clock, User, MessageSquare, Star } from 'lucide-react'
import { mockServices, mockUsers } from '@/lib/mock-data'
import { SERVICE_CATEGORIES, type Service } from '@/lib/types'
import { ClientToaster } from '@/components/client-toaster'

export default function ServicesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [locationFilter, setLocationFilter] = useState('')
  const [priceRange, setPriceRange] = useState('all')
  const [statusFilter, setStatusFilter] = useState('open')
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [applicationMessage, setApplicationMessage] = useState('')

  const filteredServices = mockServices.filter(service => {
    const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory
    const matchesLocation = !locationFilter || service.location.toLowerCase().includes(locationFilter.toLowerCase())
    const matchesStatus = statusFilter === 'all' || service.status === statusFilter

    let matchesPrice = true
    if (priceRange && priceRange !== 'all') {
      const price = service.price
      switch (priceRange) {
        case 'under-50':
          matchesPrice = price < 50
          break
        case '50-100':
          matchesPrice = price >= 50 && price <= 100
          break
        case '100-500':
          matchesPrice = price >= 100 && price <= 500
          break
        case 'over-500':
          matchesPrice = price > 500
          break
      }
    }

    return matchesSearch && matchesCategory && matchesLocation && matchesStatus && matchesPrice
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-green-100 text-green-800'
      case 'in_progress': return 'bg-blue-100 text-blue-800'
      case 'closed': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const handleApply = (serviceId: string) => {
    if (!applicationMessage.trim()) {
      alert('Please provide a message with your application')
      return
    }

    // Mock application submission
    console.log('Application submitted:', { serviceId, message: applicationMessage })
    alert('Application submitted successfully!')
    setSelectedService(null)
    setApplicationMessage('')
  }

  const clearFilters = () => {
    setSearchTerm('')
    setSelectedCategory('all')
    setLocationFilter('')
    setPriceRange('all')
    setStatusFilter('open')
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <ClientToaster />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Browse Services</h1>
          <p className="text-muted-foreground">Find services that match your skills and interests</p>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <div className="space-y-2">
                <Label htmlFor="search">Search</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="search"
                    placeholder="Search services..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Category</Label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="All categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All categories</SelectItem>
                    {SERVICE_CATEGORIES.map(category => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  placeholder="Filter by location"
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Price Range</Label>
                <Select value={priceRange} onValueChange={setPriceRange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Any price" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Any price</SelectItem>
                    <SelectItem value="under-50">Under $50</SelectItem>
                    <SelectItem value="50-100">$50 - $100</SelectItem>
                    <SelectItem value="100-500">$100 - $500</SelectItem>
                    <SelectItem value="over-500">Over $500</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Status</Label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All statuses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All statuses</SelectItem>
                    <SelectItem value="open">Open</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-between items-center mt-4">
              <p className="text-sm text-muted-foreground">
                {filteredServices.length} service{filteredServices.length !== 1 ? 's' : ''} found
              </p>
              <Button variant="outline" onClick={clearFilters}>
                Clear Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Services Grid */}
        <div className="grid gap-6">
          {filteredServices.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground">No services found matching your criteria.</p>
                <Button variant="outline" onClick={clearFilters} className="mt-4">
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          ) : (
            filteredServices.map(service => (
              <Card key={service.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-xl font-semibold">{service.title}</h3>
                        <Badge className={getStatusColor(service.status)}>
                          {service.status.replace('_', ' ')}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground mb-4">{service.description}</p>

                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-1">
                          <DollarSign className="h-4 w-4" />
                          <span className="font-medium">${service.price}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {service.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {service.createdAt.toLocaleDateString()}
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={service.client.avatar} alt={service.client.name} />
                          <AvatarFallback>
                            {service.client.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{service.client.name}</p>
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-xs text-muted-foreground">4.8 rating</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          className="flex-1"
                          disabled={service.status !== 'open'}
                          onClick={() => setSelectedService(service)}
                        >
                          <MessageSquare className="h-4 w-4 mr-2" />
                          {service.status === 'open' ? 'Apply Now' : 'Not Available'}
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle>Apply for Service</DialogTitle>
                          <DialogDescription>
                            Send a message to the client explaining why you're the right person for this job.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="message">Your Message</Label>
                            <Textarea
                              id="message"
                              placeholder="Explain your experience, availability, and why you're perfect for this job..."
                              rows={4}
                              value={applicationMessage}
                              onChange={(e) => setApplicationMessage(e.target.value)}
                            />
                          </div>
                          <div className="flex gap-2">
                            <Button
                              onClick={() => selectedService && handleApply(selectedService.id)}
                              className="flex-1"
                            >
                              Send Application
                            </Button>
                            <Button
                              variant="outline"
                              onClick={() => {
                                setSelectedService(null)
                                setApplicationMessage('')
                              }}
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>

                    <Button variant="outline">
                      <User className="h-4 w-4 mr-2" />
                      View Profile
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
