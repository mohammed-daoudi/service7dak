'use client'
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { useState } from 'react'
import { Navigation } from '@/components/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  ArrowLeft,
  Search,
  Filter,
  MapPin,
  DollarSign,
  Clock,
  Star,
  TrendingUp,
  Users,
  Award,
  Wrench,
  Sparkles,
  Truck,
  Monitor,
  BookOpen,
  Palette,
  PenTool,
  Camera
} from 'lucide-react'
import { mockUsers } from '@/lib/mock-data'
import { SERVICE_CATEGORIES, Service } from '@/lib/types'

const categoryIcons: Record<string, React.ElementType> = {
  'Home Repair': Wrench,
  'Cleaning': Sparkles,
  'Moving': Truck,
  'Technology': Monitor,
  'Tutoring': BookOpen,
  'Design': Palette,
  'Writing': PenTool,
  'Photography': Camera,
  'Other': Star
}

const categoryColors: Record<string, string> = {
  'Home Repair': 'bg-orange-100 text-orange-800',
  'Cleaning': 'bg-blue-100 text-blue-800',
  'Moving': 'bg-green-100 text-green-800',
  'Technology': 'bg-purple-100 text-purple-800',
  'Tutoring': 'bg-yellow-100 text-yellow-800',
  'Design': 'bg-pink-100 text-pink-800',
  'Writing': 'bg-indigo-100 text-indigo-800',
  'Photography': 'bg-red-100 text-red-800',
  'Other': 'bg-gray-100 text-gray-800'
}

type CategoryFilter = { key: string; label: string; options: string[] };
const categorySpecificFilters: Record<string, CategoryFilter[]> = {
  'Home Repair': [
    { key: 'urgency', label: 'Urgency', options: ['Emergency', 'This Week', 'This Month', 'Flexible'] },
    { key: 'propertyType', label: 'Property Type', options: ['House', 'Apartment', 'Commercial', 'Other'] },
    { key: 'skillLevel', label: 'Skill Level Required', options: ['Basic', 'Intermediate', 'Expert', 'Licensed Professional'] }
  ],
  'Cleaning': [
    { key: 'cleaningType', label: 'Type', options: ['Regular', 'Deep Clean', 'Move-in/out', 'Post-construction'] },
    { key: 'frequency', label: 'Frequency', options: ['One-time', 'Weekly', 'Bi-weekly', 'Monthly'] },
    { key: 'supplies', label: 'Supplies', options: ['Provided by client', 'Bring own supplies', 'Eco-friendly only'] }
  ],
  'Technology': [
    { key: 'techType', label: 'Technology', options: ['Web Development', 'Mobile Apps', 'IT Support', 'Data Analysis'] },
    { key: 'experience', label: 'Experience Level', options: ['Entry Level', 'Mid Level', 'Senior Level', 'Expert'] },
    { key: 'duration', label: 'Project Duration', options: ['1-2 weeks', '1 month', '2-3 months', '6+ months'] }
  ],
  'Tutoring': [
    { key: 'subject', label: 'Subject', options: ['Math', 'Science', 'English', 'History', 'Languages', 'Test Prep'] },
    { key: 'level', label: 'Level', options: ['Elementary', 'Middle School', 'High School', 'College', 'Adult'] },
    { key: 'format', label: 'Format', options: ['In-person', 'Online', 'Group', 'One-on-one'] }
  ]
}

export default function CategoryPage() {
  const params = useParams()
  const categoryName = decodeURIComponent(params.category as string)

  const [searchTerm, setSearchTerm] = useState('')
  const [locationFilter, setLocationFilter] = useState('')
  const [priceRange, setPriceRange] = useState('')
  const [sortBy, setSortBy] = useState('newest')
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
  fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/services`)
    .then(res => res.json())
    .then(data => {
      setServices(data)
      setLoading(false)
    })
    .catch(() => setLoading(false))
}, [])
  const [specificFilters, setSpecificFilters] = useState<Record<string, string>>({})

  // Check if category exists
  if (!SERVICE_CATEGORIES.includes(categoryName as string)) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Category Not Found</h1>
            <Link href="/services" className="text-primary hover:underline">
              Browse All Services
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const categoryData = { description: '' }
  const CategoryIcon = categoryIcons[categoryName] || Star

  // Filter services for this category
  const categoryServices = services.filter(service => {
    const matchesCategory = service.category === categoryName
    const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesLocation = !locationFilter || service.location.toLowerCase().includes(locationFilter.toLowerCase())

    let matchesPrice = true
    if (priceRange) {
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

    return matchesCategory && matchesSearch && matchesLocation && matchesPrice
  })

  // Sort services
  const sortedServices = [...categoryServices].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price
      case 'price-high':
        return b.price - a.price
      case 'newest':
        return b.createdAt.getTime() - a.createdAt.getTime()
      case 'oldest':
        return a.createdAt.getTime() - b.createdAt.getTime()
      default:
        return 0
    }
  })

  const stats = {
    totalServices: categoryServices.length,
    avgPrice: categoryServices.length > 0 ? Math.round(categoryServices.reduce((sum, s) => sum + s.price, 0) / categoryServices.length) : 0,
    topProviders: [...new Set(categoryServices.map(s => s.clientId))].length
  }

  // Top providers in this category
  const topProviders = mockUsers.filter(user =>
    categoryServices.some(service => service.clientId === user.id)
  ).slice(0, 3)

  const clearFilters = () => {
    setSearchTerm('')
    setLocationFilter('')
    setPriceRange('')
    setSpecificFilters({})
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/services" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-4">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to All Services
          </Link>
        </div>

        {/* Category Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className={`h-16 w-16 rounded-lg flex items-center justify-center ${categoryColors[categoryName] || 'bg-gray-100 text-gray-800'}`}>
              <CategoryIcon className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">{categoryName}</h1>
              <p className="text-muted-foreground">{categoryData?.description}</p>
            </div>
          </div>

          {/* Category Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{stats.totalServices}</p>
                    <p className="text-sm text-muted-foreground">Active Services</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <DollarSign className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">${stats.avgPrice}</p>
                    <p className="text-sm text-muted-foreground">Average Price</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Users className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{stats.topProviders}</p>
                    <p className="text-sm text-muted-foreground">Active Providers</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Search */}
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

                {/* Location */}
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    placeholder="City, State"
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                  />
                </div>

                {/* Price Range */}
                <div className="space-y-2">
                  <Label>Price Range</Label>
                  <Select value={priceRange} onValueChange={setPriceRange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Any price" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Any price</SelectItem>
                      <SelectItem value="under-50">Under $50</SelectItem>
                      <SelectItem value="50-100">$50 - $100</SelectItem>
                      <SelectItem value="100-500">$100 - $500</SelectItem>
                      <SelectItem value="over-500">Over $500</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Category-Specific Filters */}
                {categorySpecificFilters[categoryName]?.map(filter => (
                  <div key={filter.key} className="space-y-2">
                    <Label>{filter.label}</Label>
                    <Select
                      value={specificFilters[filter.key] || ''}
                      onValueChange={(value) => setSpecificFilters(prev => ({ ...prev, [filter.key]: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={`Any ${filter.label.toLowerCase()}`} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Any {filter.label.toLowerCase()}</SelectItem>
                        {filter.options.map((option: string) => (
                          <SelectItem key={option} value={option}>{option}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                ))}

                <Button variant="outline" onClick={clearFilters} className="w-full">
                  Clear Filters
                </Button>
              </CardContent>
            </Card>

            {/* Top Providers */}
            {topProviders.length > 0 && (
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    Top Providers
                  </CardTitle>
                  <CardDescription>
                    Highly rated professionals in {categoryName}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {topProviders.map(provider => (
                    <Link key={provider.id} href={`/profile/${provider.id}`}>
                      <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={provider.avatar} alt={provider.name} />
                          <AvatarFallback>{provider.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{provider.name}</p>
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-xs text-muted-foreground">4.8</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Services List */}
          <div className="lg:col-span-3">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-semibold">
                  {sortedServices.length} service{sortedServices.length !== 1 ? 's' : ''} found
                </h2>
                <p className="text-sm text-muted-foreground">
                  Showing results for {categoryName}
                </p>
              </div>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              {sortedServices.length === 0 ? (
                <Card>
                  <CardContent className="p-8 text-center">
                    <div className={`h-16 w-16 rounded-lg flex items-center justify-center mx-auto mb-4 ${categoryColors[categoryName] || 'bg-gray-100 text-gray-800'}`}>
                      <CategoryIcon className="h-8 w-8" />
                    </div>
                    <h3 className="font-medium mb-2">No services found</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Try adjusting your filters or post the first service in this category.
                    </p>
                    <div className="flex gap-2 justify-center">
                      <Button variant="outline" onClick={clearFilters}>
                        Clear Filters
                      </Button>
                      <Button asChild>
                        <Link href="/post-service">Post Service</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                sortedServices.map(service => (
                  <Card key={service.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
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

                        <Badge className={`${categoryColors[categoryName] || 'bg-gray-100 text-gray-800'} ml-4`}>
                          {service.status.replace('_', ' ')}
                        </Badge>
                      </div>

                      <div className="flex gap-2">
                        <Button className="flex-1" disabled={service.status !== 'open'}>
                          {service.status === 'open' ? 'Apply Now' : 'Not Available'}
                        </Button>
                        <Button variant="outline" asChild>
                          <Link href={`/profile/${service.client.id}`}>View Profile</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
