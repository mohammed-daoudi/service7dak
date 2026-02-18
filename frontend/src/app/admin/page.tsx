'use client'

import { useState } from 'react'
import { Navigation } from '@/components/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  Users,
  Briefcase,
  AlertTriangle,
  Settings,
  Ban,
  CheckCircle,
  XCircle,
  Eye,
  Edit,
  Trash2,
  Plus,
  BarChart3,
  ShieldCheck
} from 'lucide-react'
import { mockUsers, mockServices, mockReports, mockCategories } from '@/lib/mock-data'

export default function AdminPage() {
  const [users, setUsers] = useState(mockUsers)
  const [services, setServices] = useState(mockServices)
  const [reports, setReports] = useState(mockReports)
  const [categories, setCategories] = useState(mockCategories)
  const [newCategory, setNewCategory] = useState({ name: '', description: '' })
  const [selectedReport, setSelectedReport] = useState(null)

  const toggleUserStatus = (userId: string) => {
    setUsers(prev =>
      prev.map(user =>
        user.id === userId
          ? { ...user, isDisabled: !user.isDisabled }
          : user
      )
    )
  }

  const updateReportStatus = (reportId: string, status: 'pending' | 'reviewed' | 'resolved') => {
    setReports(prev =>
      prev.map(report =>
        report.id === reportId
          ? { ...report, status }
          : report
      )
    )
  }

  const addCategory = () => {
    if (!newCategory.name.trim()) return

    const category = {
      id: (categories.length + 1).toString(),
      name: newCategory.name,
      description: newCategory.description
    }

    setCategories(prev => [...prev, category])
    setNewCategory({ name: '', description: '' })
  }

  const deleteCategory = (categoryId: string) => {
    setCategories(prev => prev.filter(cat => cat.id !== categoryId))
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary">Pending</Badge>
      case 'reviewed':
        return <Badge className="bg-blue-100 text-blue-800">Reviewed</Badge>
      case 'resolved':
        return <Badge className="bg-green-100 text-green-800">Resolved</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getServiceStatusBadge = (status: string) => {
    switch (status) {
      case 'open':
        return <Badge className="bg-green-100 text-green-800">Open</Badge>
      case 'in_progress':
        return <Badge className="bg-blue-100 text-blue-800">In Progress</Badge>
      case 'closed':
        return <Badge className="bg-gray-100 text-gray-800">Closed</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const stats = {
    totalUsers: users.length,
    activeUsers: users.filter(u => !u.isDisabled).length,
    totalServices: services.length,
    openServices: services.filter(s => s.status === 'open').length,
    pendingReports: reports.filter(r => r.status === 'pending').length,
    totalCategories: categories.length
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Admin Panel</h1>
          <p className="text-muted-foreground">Manage users, services, and platform settings</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Users className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.activeUsers}/{stats.totalUsers}</p>
                  <p className="text-sm text-muted-foreground">Active Users</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center text-3xl">
                  🎗️
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.openServices}/{stats.totalServices}</p>
                  <p className="text-sm text-muted-foreground">Open Services</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.pendingReports}</p>
                  <p className="text-sm text-muted-foreground">Pending Reports</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Settings className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.totalCategories}</p>
                  <p className="text-sm text-muted-foreground">Categories</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="users" className="space-y-6">
          <TabsList>
            <TabsTrigger value="users">Users ({users.length})</TabsTrigger>
            <TabsTrigger value="services">Services ({services.length})</TabsTrigger>
            <TabsTrigger value="reports">Reports ({reports.length})</TabsTrigger>
            <TabsTrigger value="categories">Categories ({categories.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>Manage user accounts and permissions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {users.map(user => (
                    <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <Avatar>
                          <AvatarImage src={user.avatar} alt={user.name} />
                          <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">{user.name}</h3>
                            {user.role === 'admin' && (
                              <Badge variant="secondary">
                                <ShieldCheck className="h-3 w-3 mr-1" />
                                Admin
                              </Badge>
                            )}
                            {user.isDisabled && (
                              <Badge variant="destructive">Disabled</Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                          <p className="text-xs text-muted-foreground">{user.location}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button
                          variant={user.isDisabled ? "default" : "destructive"}
                          size="sm"
                          onClick={() => toggleUserStatus(user.id)}
                        >
                          {user.isDisabled ? (
                            <>
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Enable
                            </>
                          ) : (
                            <>
                              <Ban className="h-4 w-4 mr-1" />
                              Disable
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="services">
            <Card>
              <CardHeader>
                <CardTitle>Service Management</CardTitle>
                <CardDescription>Monitor and manage posted services</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {services.map(service => (
                    <div key={service.id} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-medium">{service.title}</h3>
                            {getServiceStatusBadge(service.status)}
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{service.description}</p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span>By: {service.client.name}</span>
                            <span>Price: ${service.price}</span>
                            <span>Location: {service.location}</span>
                            <span>Posted: {service.createdAt.toLocaleDateString()}</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                          <Button variant="destructive" size="sm">
                            <Trash2 className="h-4 w-4 mr-1" />
                            Remove
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports">
            <Card>
              <CardHeader>
                <CardTitle>User Reports</CardTitle>
                <CardDescription>Review and moderate user reports</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reports.map(report => {
                    const reporter = users.find(u => u.id === report.reporterId)
                    const reported = users.find(u => u.id === report.reportedUserId)

                    return (
                      <div key={report.id} className="p-4 border rounded-lg">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              {getStatusBadge(report.status)}
                              <span className="text-sm text-muted-foreground">
                                {report.createdAt.toLocaleDateString()}
                              </span>
                            </div>
                            <p className="text-sm mb-2">
                              <strong>{reporter?.name}</strong> reported <strong>{reported?.name}</strong>
                            </p>
                            <p className="text-sm text-muted-foreground">{report.reason}</p>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateReportStatus(report.id, 'reviewed')}
                              disabled={report.status !== 'pending'}
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              Review
                            </Button>
                            <Button
                              variant="default"
                              size="sm"
                              onClick={() => updateReportStatus(report.id, 'resolved')}
                              disabled={report.status === 'resolved'}
                            >
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Resolve
                            </Button>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="categories">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Add New Category</CardTitle>
                  <CardDescription>Create a new service category</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="categoryName">Category Name</Label>
                      <Input
                        id="categoryName"
                        placeholder="e.g., Pet Care"
                        value={newCategory.name}
                        onChange={(e) => setNewCategory(prev => ({ ...prev, name: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="categoryDescription">Description</Label>
                      <Input
                        id="categoryDescription"
                        placeholder="Brief description of the category"
                        value={newCategory.description}
                        onChange={(e) => setNewCategory(prev => ({ ...prev, description: e.target.value }))}
                      />
                    </div>
                  </div>
                  <Button onClick={addCategory} className="mt-4">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Category
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Manage Categories</CardTitle>
                  <CardDescription>Edit or delete existing categories</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {categories.map(category => (
                      <div key={category.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <h3 className="font-medium">{category.name}</h3>
                          {category.description && (
                            <p className="text-sm text-muted-foreground">{category.description}</p>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => deleteCategory(category.id)}
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    ))}
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
