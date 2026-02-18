'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { useState } from 'react'
import { Navigation } from '@/components/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import {
  ArrowLeft,
  Star,
  MapPin,
  Calendar,
  Phone,
  Mail,
  Briefcase,
  Award,
  TrendingUp,
  MessageSquare,
  Shield,
  Clock,
  DollarSign,
  CheckCircle,
  Camera,
  Globe,
  Users
} from 'lucide-react'
import { mockUsers, mockServices, mockApplications, mockReviews } from '@/lib/mock-data'
import { ReviewModal } from '@/components/review-modal'
import { ReportModal } from '@/components/report-modal'

export default function ProfilePage() {
  const params = useParams()
  const userId = params.userId as string
  const [selectedWork, setSelectedWork] = useState<string | null>(null)
  const [contactMessage, setContactMessage] = useState('')

  const user = mockUsers.find(u => u.id === userId)
  const currentUser = mockUsers[0] // Mock current user

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold">User Not Found</h1>
            <Link href="/services" className="text-primary hover:underline">
              Back to Services
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Get user's work history
  const userServices = mockServices.filter(s => s.clientId === userId)
  const userApplications = mockApplications.filter(a => a.providerId === userId && a.status === 'accepted')
  const userReviews = mockReviews.filter(r => r.toUserId === userId)

  const stats = {
    totalJobs: userApplications.length + userServices.length,
    avgRating: userReviews.length > 0 ? userReviews.reduce((sum, r) => sum + r.rating, 0) / userReviews.length : 0,
    completionRate: 98,
    responseTime: '2 hours',
    memberSince: user.createdAt,
    totalEarned: userApplications.length * 150 // Mock calculation
  }

  // Mock portfolio items
  const portfolioItems = [
    {
      id: '1',
      title: 'Modern Kitchen Renovation',
      description: 'Complete kitchen makeover with new appliances and countertops',
      category: 'Home Repair',
      images: ['https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop'],
      completedDate: new Date('2024-02-15'),
      clientReview: 'Excellent work! Very professional and completed on time.',
      rating: 5
    },
    {
      id: '2',
      title: 'Website Development Project',
      description: 'Built a responsive e-commerce website with payment integration',
      category: 'Technology',
      images: ['https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop'],
      completedDate: new Date('2024-01-20'),
      clientReview: 'Outstanding developer with great attention to detail.',
      rating: 5
    },
    {
      id: '3',
      title: 'Office Deep Cleaning',
      description: 'Professional cleaning service for a 50-person office space',
      category: 'Cleaning',
      images: ['https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop'],
      completedDate: new Date('2024-03-01'),
      clientReview: 'Very thorough and reliable service.',
      rating: 4
    }
  ]

  const skills = ['Plumbing', 'Electrical Work', 'Web Development', 'Project Management', 'Customer Service']
  const certifications = [
    { name: 'Licensed Plumber', issuer: 'State Board', year: 2020 },
    { name: 'Electrical Safety Certification', issuer: 'OSHA', year: 2021 },
    { name: 'Project Management Professional', issuer: 'PMI', year: 2019 }
  ]

  const isOwnProfile = currentUser.id === userId

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6">
            <Link href="/services" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-4">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Services
            </Link>
          </div>

          {/* Profile Header */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Main Profile Card */}
            <Card className="lg:col-span-2">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex flex-col items-center md:items-start">
                    <div className="relative">
                      <Avatar className="h-32 w-32">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback className="text-2xl">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      {isOwnProfile && (
                        <Button size="icon" variant="outline" className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full">
                          <Camera className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    {user.role === 'admin' && (
                      <Badge variant="secondary" className="mt-2">
                        <Shield className="h-3 w-3 mr-1" />
                        Admin
                      </Badge>
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                      <div>
                        <h1 className="text-2xl font-bold">{user.name}</h1>
                        <p className="text-muted-foreground flex items-center gap-1 mt-1">
                          <MapPin className="h-4 w-4" />
                          {user.location}
                        </p>
                        <p className="text-muted-foreground flex items-center gap-1 mt-1">
                          <Calendar className="h-4 w-4" />
                          Member since {user.createdAt.getFullYear()}
                        </p>
                      </div>

                      {!isOwnProfile && (
                        <div className="flex gap-2 mt-4 md:mt-0">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button>
                                <MessageSquare className="h-4 w-4 mr-2" />
                                Contact
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-md">
                              <DialogHeader>
                                <DialogTitle>Contact {user.name}</DialogTitle>
                                <DialogDescription>
                                  Send a message to connect about potential work opportunities.
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4">
                                <Textarea
                                  placeholder="Hi, I'm interested in your services for..."
                                  rows={4}
                                  value={contactMessage}
                                  onChange={(e) => setContactMessage(e.target.value)}
                                />
                                <div className="flex gap-2">
                                  <Button className="flex-1">Send Message</Button>
                                  <Button variant="outline" onClick={() => setContactMessage('')}>
                                    Cancel
                                  </Button>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>

                          <ReportModal
                            trigger={
                              <Button variant="outline">
                                Report User
                              </Button>
                            }
                            reportedUserName={user.name}
                            onSubmit={(reason, details) => {
                              console.log('Report submitted:', { reason, details })
                              alert('Report submitted successfully')
                            }}
                          />
                        </div>
                      )}
                    </div>

                    {/* Rating and Stats */}
                    <div className="flex items-center gap-6 mb-4">
                      <div className="flex items-center gap-2">
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-4 w-4 ${
                                star <= Math.round(stats.avgRating)
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="font-medium">{stats.avgRating.toFixed(1)}</span>
                        <span className="text-muted-foreground">({userReviews.length} reviews)</span>
                      </div>
                      <div className="flex items-center gap-1 text-green-600">
                        <CheckCircle className="h-4 w-4" />
                        <span className="text-sm font-medium">{stats.completionRate}% completion</span>
                      </div>
                    </div>

                    {/* Contact Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <span>{user.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <span>{user.phone}</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>Responds in {stats.responseTime}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Globe className="h-4 w-4 text-muted-foreground" />
                          <span>Available for remote work</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Stats Card */}
            <Card>
              <CardHeader>
                <CardTitle>Profile Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Jobs Completed</span>
                  <span className="font-semibold">{stats.totalJobs}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Total Earned</span>
                  <span className="font-semibold">${stats.totalEarned.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Success Rate</span>
                  <span className="font-semibold text-green-600">{stats.completionRate}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Repeat Clients</span>
                  <span className="font-semibold">67%</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tabs Content */}
          <Tabs defaultValue="portfolio" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
              <TabsTrigger value="reviews">Reviews ({userReviews.length})</TabsTrigger>
              <TabsTrigger value="skills">Skills</TabsTrigger>
              <TabsTrigger value="work-history">Work History</TabsTrigger>
              <TabsTrigger value="certifications">Certifications</TabsTrigger>
            </TabsList>

            <TabsContent value="portfolio">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {portfolioItems.map(item => (
                  <Card key={item.id} className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                        onClick={() => setSelectedWork(item)}>
                    <div className="aspect-video bg-muted">
                      <img
                        src={item.images[0]}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-2">{item.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
                      <div className="flex justify-between items-center">
                        <Badge variant="outline">{item.category}</Badge>
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm">{item.rating}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="reviews">
              <div className="space-y-4">
                {userReviews.length === 0 ? (
                  <Card>
                    <CardContent className="p-8 text-center">
                      <p className="text-muted-foreground">No reviews yet.</p>
                    </CardContent>
                  </Card>
                ) : (
                  userReviews.map(review => (
                    <Card key={review.id}>
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarFallback>
                                {mockUsers.find(u => u.id === review.fromUserId)?.name.split(' ').map(n => n[0]).join('') || 'U'}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">
                                {mockUsers.find(u => u.id === review.fromUserId)?.name || 'Anonymous'}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {review.createdAt.toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`h-4 w-4 ${
                                  star <= review.rating
                                    ? 'fill-yellow-400 text-yellow-400'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        {review.comment && (
                          <p className="text-sm">{review.comment}</p>
                        )}
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>

            <TabsContent value="skills">
              <Card>
                <CardHeader>
                  <CardTitle>Skills & Expertise</CardTitle>
                  <CardDescription>Areas of specialization and competency</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {skills.map(skill => (
                      <Badge key={skill} variant="secondary" className="text-sm">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="work-history">
              <div className="space-y-4">
                {userApplications.map(application => {
                  const service = mockServices.find(s => s.id === application.serviceId)
                  if (!service) return null

                  return (
                    <Card key={application.id}>
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold">{service.title}</h3>
                            <p className="text-sm text-muted-foreground mb-2">{service.description}</p>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span>Client: {service.client.name}</span>
                              <span>${service.price}</span>
                              <span>{application.createdAt.toLocaleDateString()}</span>
                            </div>
                          </div>
                          <Badge className="bg-green-100 text-green-800">Completed</Badge>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </TabsContent>

            <TabsContent value="certifications">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {certifications.map((cert, index) => (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-3">
                        <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Award className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{cert.name}</h3>
                          <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                          <p className="text-xs text-muted-foreground mt-1">Earned {cert.year}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          {/* Portfolio Detail Modal */}
          {selectedWork && (
            <Dialog open={!!selectedWork} onOpenChange={() => setSelectedWork(null)}>
              <DialogContent className="sm:max-w-2xl">
                <DialogHeader>
                  <DialogTitle>{selectedWork.title}</DialogTitle>
                  <DialogDescription>{selectedWork.category}</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                    <img
                      src={selectedWork.images[0]}
                      alt={selectedWork.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p>{selectedWork.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Completed: {selectedWork.completedDate.toLocaleDateString()}
                    </span>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>{selectedWork.rating}/5</span>
                    </div>
                  </div>
                  {selectedWork.clientReview && (
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <p className="text-sm italic">"{selectedWork.clientReview}"</p>
                    </div>
                  )}
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>
    </div>
  )
}
