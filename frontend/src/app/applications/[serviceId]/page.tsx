'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { Navigation } from '@/components/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { ArrowLeft, Clock, Star, CheckCircle, XCircle, MessageSquare, User, Phone } from 'lucide-react'
import { mockServices, mockApplications, mockUsers } from '@/lib/mock-data'
import { ReviewModal } from '@/components/review-modal'
import { ReportModal } from '@/components/report-modal'
import { ClientToaster } from '@/components/client-toaster'

export default function ApplicationsPage() {
  const params = useParams()
  const serviceId = params.serviceId as string

  const [applications, setApplications] = useState(
    mockApplications.filter(app => app.serviceId === serviceId)
  )

  const service = mockServices.find(s => s.id === serviceId)

  if (!service) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <ClientToaster />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Service Not Found</h1>
            <Link href="/dashboard" className="text-primary hover:underline">
              Return to Dashboard
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const handleApplicationAction = (applicationId: string, action: 'accepted' | 'rejected') => {
    setApplications(prev =>
      prev.map(app =>
        app.id === applicationId
          ? { ...app, status: action }
          : app
      )
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'accepted': return 'bg-green-100 text-green-800'
      case 'rejected': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'accepted': return <CheckCircle className="h-4 w-4" />
      case 'rejected': return <XCircle className="h-4 w-4" />
      case 'pending': return <Clock className="h-4 w-4" />
      default: return null
    }
  }

  const pendingApplications = applications.filter(app => app.status === 'pending')
  const reviewedApplications = applications.filter(app => app.status !== 'pending')

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <ClientToaster />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Link href="/dashboard" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-4">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Dashboard
            </Link>
            <h1 className="text-3xl font-bold mb-2">Applications</h1>
            <p className="text-muted-foreground">Review applications for your service</p>
          </div>

          {/* Service Details */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-semibold mb-2">{service.title}</h2>
                  <p className="text-muted-foreground mb-4">{service.description}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>Budget: ${service.price}</span>
                    <span>Location: {service.location}</span>
                    <span>Posted: {service.createdAt.toLocaleDateString()}</span>
                  </div>
                </div>
                <Badge className={getStatusColor(service.status)}>
                  {service.status.replace('_', ' ')}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Applications Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{applications.length}</div>
                  <div className="text-sm text-muted-foreground">Total Applications</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-600">{pendingApplications.length}</div>
                  <div className="text-sm text-muted-foreground">Pending Review</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {applications.filter(app => app.status === 'accepted').length}
                  </div>
                  <div className="text-sm text-muted-foreground">Accepted</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Pending Applications */}
          {pendingApplications.length > 0 && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Pending Applications ({pendingApplications.length})</CardTitle>
                <CardDescription>Review and respond to new applications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {pendingApplications.map(application => (
                  <div key={application.id} className="border rounded-lg p-4">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={application.provider.avatar} alt={application.provider.name} />
                        <AvatarFallback>
                          {application.provider.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <h3 className="font-medium">{application.provider.name}</h3>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <span>{application.provider.location}</span>
                              <div className="flex items-center gap-1">
                                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                <span>4.8 rating</span>
                              </div>
                            </div>
                          </div>
                          <Badge className={`${getStatusColor(application.status)} flex items-center gap-1`}>
                            {getStatusIcon(application.status)}
                            {application.status}
                          </Badge>
                        </div>

                        <p className="text-sm mb-4">{application.message}</p>

                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">
                            Applied {application.createdAt.toLocaleDateString()}
                          </span>

                          <div className="flex gap-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="outline" size="sm">
                                  <User className="h-4 w-4 mr-1" />
                                  View Profile
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-md">
                                <DialogHeader>
                                  <DialogTitle>Provider Profile</DialogTitle>
                                </DialogHeader>
                                <div className="space-y-4">
                                  <div className="flex items-center gap-3">
                                    <Avatar className="h-16 w-16">
                                      <AvatarImage src={application.provider.avatar} alt={application.provider.name} />
                                      <AvatarFallback>
                                        {application.provider.name.split(' ').map(n => n[0]).join('')}
                                      </AvatarFallback>
                                    </Avatar>
                                    <div>
                                      <h3 className="font-semibold">{application.provider.name}</h3>
                                      <p className="text-sm text-muted-foreground">{application.provider.email}</p>
                                      <p className="text-sm text-muted-foreground">{application.provider.location}</p>
                                    </div>
                                  </div>

                                  <div className="flex items-center gap-4">
                                    <div className="text-center">
                                      <div className="text-lg font-bold">4.8</div>
                                      <div className="text-xs text-muted-foreground">Rating</div>
                                    </div>
                                    <div className="text-center">
                                      <div className="text-lg font-bold">47</div>
                                      <div className="text-xs text-muted-foreground">Jobs</div>
                                    </div>
                                    <div className="text-center">
                                      <div className="text-lg font-bold">98%</div>
                                      <div className="text-xs text-muted-foreground">Success</div>
                                    </div>
                                  </div>

                                  <div className="flex gap-2">
                                    <ReportModal
                                      trigger={
                                        <Button variant="outline" size="sm">
                                          Report User
                                        </Button>
                                      }
                                      reportedUserName={application.provider.name}
                                      onSubmit={(reason, details) => {
                                        console.log('Report submitted:', { reason, details })
                                        alert('Report submitted successfully')
                                      }}
                                    />
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>

                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleApplicationAction(application.id, 'rejected')}
                            >
                              <XCircle className="h-4 w-4 mr-1" />
                              Reject
                            </Button>

                            <Button
                              size="sm"
                              onClick={() => handleApplicationAction(application.id, 'accepted')}
                            >
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Accept
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Reviewed Applications */}
          {reviewedApplications.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Reviewed Applications ({reviewedApplications.length})</CardTitle>
                <CardDescription>Previously reviewed applications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {reviewedApplications.map(application => (
                  <div key={application.id} className="border rounded-lg p-4 opacity-75">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={application.provider.avatar} alt={application.provider.name} />
                          <AvatarFallback>
                            {application.provider.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium">{application.provider.name}</h3>
                          <p className="text-sm text-muted-foreground">{application.message}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Badge className={`${getStatusColor(application.status)} flex items-center gap-1`}>
                          {getStatusIcon(application.status)}
                          {application.status}
                        </Badge>

                        {application.status === 'accepted' && (
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Phone className="h-4 w-4 mr-1" />
                              Contact
                            </Button>
                            <ReviewModal
                              trigger={
                                <Button size="sm">
                                  <Star className="h-4 w-4 mr-1" />
                                  Review
                                </Button>
                              }
                              targetUserName={application.provider.name}
                              serviceTitle={service.title}
                              onSubmit={(rating, comment) => {
                                console.log('Review submitted:', { rating, comment })
                                alert('Review submitted successfully!')
                              }}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* No Applications */}
          {applications.length === 0 && (
            <Card>
              <CardContent className="p-8 text-center">
                <div className="h-12 w-12 bg-muted rounded-lg flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="font-medium mb-2">No Applications Yet</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Your service hasn't received any applications yet. Make sure your description is clear and the price is competitive.
                </p>
                <Button asChild variant="outline">
                  <Link href="/post-service">Edit Service</Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
