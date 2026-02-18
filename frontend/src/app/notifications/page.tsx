'use client'

import { useState } from 'react'
import { Navigation } from '@/components/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Bell, BellOff, Check, ExternalLink, MessageSquare, Star, Eye, Trash2 } from 'lucide-react'
import { mockNotifications, mockUsers } from '@/lib/mock-data'

export default function NotificationsPage() {
  const currentUser = mockUsers[0] // Mock current user
  const [notifications, setNotifications] = useState(
    mockNotifications.filter(notification => notification.userId === currentUser.id)
  )

  const unreadCount = notifications.filter(n => !n.isRead).length

  const markAsRead = (notificationId: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === notificationId
          ? { ...notification, isRead: true }
          : notification
      )
    )
  }

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, isRead: true }))
    )
  }

  const deleteNotification = (notificationId: string) => {
    setNotifications(prev =>
      prev.filter(notification => notification.id !== notificationId)
    )
  }

  const getNotificationIcon = (message: string) => {
    if (message.includes('accepted')) return <Check className="h-4 w-4 text-green-600" />
    if (message.includes('rate') || message.includes('review')) return <Star className="h-4 w-4 text-yellow-600" />
    if (message.includes('application')) return <MessageSquare className="h-4 w-4 text-blue-600" />
    return <Bell className="h-4 w-4 text-gray-600" />
  }

  const getActionButton = (notification: typeof notifications[0]) => {
    if (notification.actionText && notification.actionUrl) {
      return (
        <Button size="sm" variant="outline" className="gap-2">
          <ExternalLink className="h-3 w-3" />
          {notification.actionText}
        </Button>
      )
    }
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold">Notifications</h1>
              <p className="text-muted-foreground">
                Stay updated with your service activities
              </p>
            </div>
            <div className="flex gap-2">
              {unreadCount > 0 && (
                <Button variant="outline" onClick={markAllAsRead}>
                  <Check className="h-4 w-4 mr-2" />
                  Mark All as Read
                </Button>
              )}
            </div>
          </div>

          {/* Notification Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Bell className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{notifications.length}</p>
                    <p className="text-sm text-muted-foreground">Total Notifications</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <BellOff className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{unreadCount}</p>
                    <p className="text-sm text-muted-foreground">Unread</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Check className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{notifications.length - unreadCount}</p>
                    <p className="text-sm text-muted-foreground">Read</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Notifications List */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Notifications</CardTitle>
              <CardDescription>
                {unreadCount > 0
                  ? `You have ${unreadCount} unread notification${unreadCount !== 1 ? 's' : ''}`
                  : 'All notifications have been read'
                }
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              {notifications.length === 0 ? (
                <div className="p-8 text-center">
                  <div className="h-12 w-12 bg-muted rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Bell className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="font-medium mb-2">No notifications yet</h3>
                  <p className="text-sm text-muted-foreground">
                    When you have new activity, notifications will appear here.
                  </p>
                </div>
              ) : (
                <div className="divide-y">
                  {notifications.map((notification, index) => (
                    <div
                      key={notification.id}
                      className={`p-6 transition-colors hover:bg-muted/50 ${
                        !notification.isRead ? 'bg-blue-50/50 border-l-4 border-l-blue-500' : ''
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-3 flex-1">
                          <div className="mt-1">
                            {getNotificationIcon(notification.message)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <p className={`text-sm ${!notification.isRead ? 'font-medium' : 'text-muted-foreground'}`}>
                                {notification.message}
                              </p>
                              {!notification.isRead && (
                                <Badge variant="secondary" className="text-xs">New</Badge>
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground">
                              {notification.createdAt.toLocaleDateString()} at{' '}
                              {notification.createdAt.toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          {getActionButton(notification)}

                          {!notification.isRead && (
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => markAsRead(notification.id)}
                            >
                              <Eye className="h-3 w-3" />
                            </Button>
                          )}

                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => deleteNotification(notification.id)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks you might want to perform</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button variant="outline" className="h-auto p-4 flex flex-col gap-2">
                  <MessageSquare className="h-5 w-5" />
                  <span>View Applications</span>
                  <span className="text-xs text-muted-foreground">Check service applications</span>
                </Button>

                <Button variant="outline" className="h-auto p-4 flex flex-col gap-2">
                  <Star className="h-5 w-5" />
                  <span>Leave Reviews</span>
                  <span className="text-xs text-muted-foreground">Rate your experience</span>
                </Button>

                <Button variant="outline" className="h-auto p-4 flex flex-col gap-2">
                  <Bell className="h-5 w-5" />
                  <span>Notification Settings</span>
                  <span className="text-xs text-muted-foreground">Manage preferences</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
