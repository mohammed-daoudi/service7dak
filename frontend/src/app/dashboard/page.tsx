'use client'

import { useState } from 'react'
import { Navigation } from '@/components/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  PlusCircle,
  Calendar,
  MapPin,
  DollarSign,
  Star,
  MessageSquare,
  CheckCircle,
  Clock,
  Users,
  AlertCircle
} from 'lucide-react'
import Link from 'next/link'
import { mockServices, mockApplications, mockNotifications, mockUsers } from '@/lib/mock-data'
import { ClientToaster } from '@/components/client-toaster'

export default function DashboardPage() {
  const currentUser = mockUsers[0] // Mock current user
  const [activeTab, setActiveTab] = useState('services')

  // Filter data for current user
  const userPostedServices = mockServices.filter(service => service.clientId === currentUser.id)
  const userApplications = mockApplications.filter(app => app.providerId === currentUser.id)
  const userNotifications = mockNotifications.filter(notif => notif.userId === currentUser.id)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'default'
      case 'in_progress': return 'secondary'
      case 'closed': return 'outline'
      case 'pending': return 'secondary'
      case 'accepted': return 'default'
      case 'rejected': return 'destructive'
      default: return 'default'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open': return <Clock className="h-4 w-4" />
      case 'in_progress': return <Users className="h-4 w-4" />
      case 'closed': return <CheckCircle className="h-4 w-4" />
      case 'pending': return <Clock className="h-4 w-4" />
      case 'accepted': return <CheckCircle className="h-4 w-4" />
      case 'rejected': return <AlertCircle className="h-4 w-4" />
      default: return null
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <ClientToaster />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Welcome back, {currentUser.name}</h1>
          <p className="text-muted-foreground">Manage your services and applications</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <PlusCircle className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-2xl font-bold">{userPostedServices.length}</p>
                  <p className="text-xs text-muted-foreground">Posted Services</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <MessageSquare className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="text-2xl font-bold">{userApplications.length}</p>
                  <p className="text-xs text-muted-foreground">Applications</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Star className="h-5 w-5 text-yellow-500" />
                <div>
                  <p className="text-2xl font-bold">4.8</p>
                  <p className="text-xs text-muted-foreground">Average Rating</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <div>
                  <p className="text-2xl font-bold">12</p>
                  <p className="text-xs text-muted-foreground">Completed</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="services">Posted Services</TabsTrigger>
            <TabsTrigger value="applications">My Applications</TabsTrigger>
            <TabsTrigger value="notifications">
              Notifications
              {userNotifications.filter(n => !n.isRead).length > 0 && (
                <Badge className="ml-2 h-5 w-5 p-0 text-xs">
                  {userNotifications.filter(n => !n.isRead).length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          {/* Posted Services Tab */}
          <TabsContent value="services" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Your Posted Services</h2>
              <Button asChild>
                <Link href="/post-service">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Post New Service
                </Link>
              </Button>
            </div>

            {userPostedServices.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <PlusCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No services posted yet</h3>
                  <p className="text-muted-foreground mb-4">Start by posting your first service request</p>
                  <Button asChild>
                    <Link href="/post-service">Post a Service</Link>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {userPostedServices.map(service => (
                  <Card key={service.id}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-lg font-semibold">{service.title}</h3>
                            <Badge variant={getStatusColor(service.status)} className="flex items-center gap-1">
                              {getStatusIcon(service.status)}
                              {service.status.replace('_', ' ').toUpperCase()}
                            </Badge>
                          </div>
                          <p className="text-muted-foreground mb-2">{service.description}</p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              {service.location}
                            </div>
                            <div className="flex items-center gap-1">
                              <DollarSign className="h-4 w-4" />
                              ${service.price}
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {service.createdAt.toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/applications/${service.id}`}>
                            View Applications
                          </Link>
                        </Button>
                        <Button variant="outline" size="sm">Edit</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Applications Tab */}
          <TabsContent value="applications" className="space-y-4">
            <h2 className="text-2xl font-semibold">Your Applications</h2>

            {userApplications.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No applications yet</h3>
                  <p className="text-muted-foreground mb-4">Browse available services and apply for work</p>
                  <Button asChild>
                    <Link href="/services">Browse Services</Link>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {userApplications.map(application => {
                  const service = mockServices.find(s => s.id === application.serviceId)
                  return (
                    <Card key={application.id}>
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="text-lg font-semibold">{service?.title}</h3>
                              <Badge variant={getStatusColor(application.status)} className="flex items-center gap-1">
                                {getStatusIcon(application.status)}
                                {application.status.toUpperCase()}
                              </Badge>
                            </div>
                            <p className="text-muted-foreground mb-2">"{application.message}"</p>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                Applied {application.createdAt.toLocaleDateString()}
                              </div>
                              <div className="flex items-center gap-1">
                                <DollarSign className="h-4 w-4" />
                                ${service?.price}
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            )}
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-4">
            <h2 className="text-2xl font-semibold">Notifications</h2>

            {userNotifications.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No notifications</h3>
                  <p className="text-muted-foreground">You're all caught up!</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-3">
                {userNotifications.map(notification => (
                  <Card key={notification.id} className={!notification.isRead ? 'border-primary/50 bg-primary/5' : ''}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="text-sm">{notification.message}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {notification.createdAt.toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          {!notification.isRead && (
                            <div className="h-2 w-2 bg-primary rounded-full" />
                          )}
                          {notification.actionText && (
                            <Button size="sm" variant="outline">
                              {notification.actionText}
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Reviews Tab */}
          <TabsContent value="reviews" className="space-y-4">
            <h2 className="text-2xl font-semibold">Reviews & Ratings</h2>

            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Your Rating Overview</CardTitle>
                  <CardDescription>Based on completed services</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold">4.8</div>
                      <div className="flex text-yellow-400 mb-1">
                        <Star className="h-4 w-4 fill-current" />
                        <Star className="h-4 w-4 fill-current" />
                        <Star className="h-4 w-4 fill-current" />
                        <Star className="h-4 w-4 fill-current" />
                        <Star className="h-4 w-4 fill-current" />
                      </div>
                      <div className="text-sm text-muted-foreground">12 reviews</div>
                    </div>
                    <div className="flex-1">
                      <div className="space-y-2">
                        {[5, 4, 3, 2, 1].map(rating => (
                          <div key={rating} className="flex items-center gap-2">
                            <span className="text-sm w-8">{rating}★</span>
                            <div className="flex-1 bg-muted h-2 rounded-full">
                              <div
                                className="bg-yellow-400 h-2 rounded-full"
                                style={{ width: rating === 5 ? '80%' : rating === 4 ? '15%' : '5%' }}
                              />
                            </div>
                            <span className="text-sm text-muted-foreground w-8">
                              {rating === 5 ? '10' : rating === 4 ? '2' : '0'}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Reviews</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={mockUsers[1].avatar} />
                      <AvatarFallback>SW</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">Sarah Wilson</span>
                        <div className="flex text-yellow-400">
                          <Star className="h-3 w-3 fill-current" />
                          <Star className="h-3 w-3 fill-current" />
                          <Star className="h-3 w-3 fill-current" />
                          <Star className="h-3 w-3 fill-current" />
                          <Star className="h-3 w-3 fill-current" />
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">"Excellent tutoring! Very patient and knowledgeable."</p>
                      <p className="text-xs text-muted-foreground mt-1">Math Tutoring • 3 days ago</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={mockUsers[2].avatar} />
                      <AvatarFallback>MJ</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">Mike Johnson</span>
                        <div className="flex text-yellow-400">
                          <Star className="h-3 w-3 fill-current" />
                          <Star className="h-3 w-3 fill-current" />
                          <Star className="h-3 w-3 fill-current" />
                          <Star className="h-3 w-3 fill-current" />
                          <Star className="h-3 w-3 text-gray-300" />
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">"Good cleaning service, arrived on time."</p>
                      <p className="text-xs text-muted-foreground mt-1">House Cleaning • 1 week ago</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
