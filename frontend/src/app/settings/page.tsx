'use client'

import { useState } from 'react'
import { Navigation } from '@/components/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
  User,
  Bell,
  Shield,
  CreditCard,
  Smartphone,
  Mail,
  MessageSquare,
  Star,
  Briefcase,
  Eye,
  EyeOff,
  Save,
  Camera,
  Trash2,
  AlertTriangle
} from 'lucide-react'
import { mockUsers } from '@/lib/mock-data'

export default function SettingsPage() {
  const currentUser = mockUsers[0] // Mock current user

  // Profile settings state
  const [profileData, setProfileData] = useState({
    name: currentUser.name,
    email: currentUser.email,
    phone: currentUser.phone,
    location: currentUser.location,
    bio: 'Experienced professional with 5+ years in home repair and maintenance. Licensed plumber and electrician.',
    website: 'https://johndoe.com',
    hourlyRate: '75'
  })

  // Notification preferences state
  const [notifications, setNotifications] = useState({
    email: {
      newApplications: true,
      applicationUpdates: true,
      serviceReminders: true,
      reviews: true,
      marketing: false,
      weeklyDigest: true
    },
    push: {
      newApplications: true,
      applicationUpdates: true,
      serviceReminders: true,
      reviews: true,
      messages: true
    },
    sms: {
      urgentOnly: true,
      serviceReminders: false,
      applicationUpdates: false
    }
  })

  // Privacy settings state
  const [privacy, setPrivacy] = useState({
    profileVisibility: 'public',
    showEmail: false,
    showPhone: true,
    showLocation: true,
    showRating: true,
    allowMessages: true,
    showWorkHistory: true
  })

  // Password state
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  const [showPassword, setShowPassword] = useState(false)

  const handleProfileUpdate = () => {
    console.log('Profile updated:', profileData)
    alert('Profile updated successfully!')
  }

  const handleNotificationUpdate = () => {
    console.log('Notifications updated:', notifications)
    alert('Notification preferences updated!')
  }

  const handlePrivacyUpdate = () => {
    console.log('Privacy updated:', privacy)
    alert('Privacy settings updated!')
  }

  const handlePasswordUpdate = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('Passwords do not match')
      return
    }
    console.log('Password update requested')
    alert('Password updated successfully!')
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })
  }

  const handleDeactivateAccount = () => {
    if (confirm('Are you sure you want to deactivate your account? This action cannot be undone.')) {
      console.log('Account deactivation requested')
      alert('Account deactivation process initiated. You will receive an email with further instructions.')
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Settings</h1>
            <p className="text-muted-foreground">Manage your account preferences and settings</p>
          </div>

          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="privacy">Privacy</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="account">Account</TabsTrigger>
            </TabsList>

            {/* Profile Settings */}
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Profile Information
                  </CardTitle>
                  <CardDescription>
                    Update your personal information and professional details
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Profile Picture */}
                  <div className="flex items-center gap-4">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                      <AvatarFallback className="text-lg">
                        {currentUser.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="space-y-2">
                      <Button size="sm">
                        <Camera className="h-4 w-4 mr-2" />
                        Change Photo
                      </Button>
                      <Button size="sm" variant="outline">
                        Remove Photo
                      </Button>
                    </div>
                  </div>

                  <Separator />

                  {/* Basic Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={profileData.name}
                        onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={profileData.phone}
                        onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={profileData.location}
                        onChange={(e) => setProfileData(prev => ({ ...prev, location: e.target.value }))}
                      />
                    </div>
                  </div>

                  {/* Professional Information */}
                  <Separator />
                  <h3 className="text-lg font-semibold">Professional Information</h3>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        placeholder="Tell potential clients about your experience and expertise..."
                        rows={4}
                        value={profileData.bio}
                        onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="website">Website (Optional)</Label>
                        <Input
                          id="website"
                          type="url"
                          placeholder="https://yourwebsite.com"
                          value={profileData.website}
                          onChange={(e) => setProfileData(prev => ({ ...prev, website: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="hourlyRate">Hourly Rate (USD)</Label>
                        <Input
                          id="hourlyRate"
                          type="number"
                          placeholder="75"
                          value={profileData.hourlyRate}
                          onChange={(e) => setProfileData(prev => ({ ...prev, hourlyRate: e.target.value }))}
                        />
                      </div>
                    </div>
                  </div>

                  <Button onClick={handleProfileUpdate}>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Notification Settings */}
            <TabsContent value="notifications">
              <div className="space-y-6">
                {/* Email Notifications */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Mail className="h-5 w-5" />
                      Email Notifications
                    </CardTitle>
                    <CardDescription>
                      Choose what email notifications you'd like to receive
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {Object.entries(notifications.email).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">
                            {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {getNotificationDescription(key)}
                          </p>
                        </div>
                        <Switch
                          checked={value}
                          onCheckedChange={(checked) =>
                            setNotifications(prev => ({
                              ...prev,
                              email: { ...prev.email, [key]: checked }
                            }))
                          }
                        />
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Push Notifications */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Smartphone className="h-5 w-5" />
                      Push Notifications
                    </CardTitle>
                    <CardDescription>
                      Manage push notifications for mobile and desktop
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {Object.entries(notifications.push).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">
                            {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {getNotificationDescription(key)}
                          </p>
                        </div>
                        <Switch
                          checked={value}
                          onCheckedChange={(checked) =>
                            setNotifications(prev => ({
                              ...prev,
                              push: { ...prev.push, [key]: checked }
                            }))
                          }
                        />
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* SMS Notifications */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageSquare className="h-5 w-5" />
                      SMS Notifications
                    </CardTitle>
                    <CardDescription>
                      Control SMS notifications for important updates
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {Object.entries(notifications.sms).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">
                            {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {getNotificationDescription(key)}
                          </p>
                        </div>
                        <Switch
                          checked={value}
                          onCheckedChange={(checked) =>
                            setNotifications(prev => ({
                              ...prev,
                              sms: { ...prev.sms, [key]: checked }
                            }))
                          }
                        />
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Button onClick={handleNotificationUpdate}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Notification Preferences
                </Button>
              </div>
            </TabsContent>

            {/* Privacy Settings */}
            <TabsContent value="privacy">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="h-5 w-5" />
                    Privacy & Visibility
                  </CardTitle>
                  <CardDescription>
                    Control what information is visible to other users
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label>Profile Visibility</Label>
                    <Select value={privacy.profileVisibility} onValueChange={(value) =>
                      setPrivacy(prev => ({ ...prev, profileVisibility: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="public">Public - Anyone can view</SelectItem>
                        <SelectItem value="registered">Registered Users Only</SelectItem>
                        <SelectItem value="private">Private - Hidden from search</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h4 className="font-medium">Contact Information Visibility</h4>
                    {[
                      { key: 'showEmail', label: 'Email Address', desc: 'Show your email on your profile' },
                      { key: 'showPhone', label: 'Phone Number', desc: 'Show your phone number on your profile' },
                      { key: 'showLocation', label: 'Location', desc: 'Show your location on your profile' }
                    ].map(item => (
                      <div key={item.key} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{item.label}</p>
                          <p className="text-sm text-muted-foreground">{item.desc}</p>
                        </div>
                        <Switch
                          checked={privacy[item.key as keyof typeof privacy] as boolean}
                          onCheckedChange={(checked) =>
                            setPrivacy(prev => ({ ...prev, [item.key]: checked }))
                          }
                        />
                      </div>
                    ))}
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h4 className="font-medium">Profile Content</h4>
                    {[
                      { key: 'showRating', label: 'Rating & Reviews', desc: 'Show your rating and reviews' },
                      { key: 'allowMessages', label: 'Allow Messages', desc: 'Allow other users to message you' },
                      { key: 'showWorkHistory', label: 'Work History', desc: 'Show your completed jobs and projects' }
                    ].map(item => (
                      <div key={item.key} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{item.label}</p>
                          <p className="text-sm text-muted-foreground">{item.desc}</p>
                        </div>
                        <Switch
                          checked={privacy[item.key as keyof typeof privacy] as boolean}
                          onCheckedChange={(checked) =>
                            setPrivacy(prev => ({ ...prev, [item.key]: checked }))
                          }
                        />
                      </div>
                    ))}
                  </div>

                  <Button onClick={handlePrivacyUpdate}>
                    <Save className="h-4 w-4 mr-2" />
                    Save Privacy Settings
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Security Settings */}
            <TabsContent value="security">
              <div className="space-y-6">
                {/* Password Change */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5" />
                      Change Password
                    </CardTitle>
                    <CardDescription>
                      Update your password to keep your account secure
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <div className="relative">
                        <Input
                          id="currentPassword"
                          type={showPassword ? 'text' : 'password'}
                          value={passwordData.currentPassword}
                          onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input
                        id="newPassword"
                        type="password"
                        value={passwordData.newPassword}
                        onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        value={passwordData.confirmPassword}
                        onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                      />
                    </div>

                    <Button onClick={handlePasswordUpdate}>Update Password</Button>
                  </CardContent>
                </Card>

                {/* Two-Factor Authentication */}
                <Card>
                  <CardHeader>
                    <CardTitle>Two-Factor Authentication</CardTitle>
                    <CardDescription>
                      Add an extra layer of security to your account
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">SMS Authentication</p>
                        <p className="text-sm text-muted-foreground">
                          Receive verification codes via SMS
                        </p>
                      </div>
                      <Button variant="outline">Enable</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Account Settings */}
            <TabsContent value="account">
              <div className="space-y-6">
                {/* Account Information */}
                <Card>
                  <CardHeader>
                    <CardTitle>Account Information</CardTitle>
                    <CardDescription>
                      View your account details and status
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Account Type</p>
                        <div className="flex items-center gap-2">
                          <p className="font-medium">Professional</p>
                          <Badge variant="secondary">Verified</Badge>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Member Since</p>
                        <p className="font-medium">{currentUser.createdAt.toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Account Status</p>
                        <p className="font-medium text-green-600">Active</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Last Login</p>
                        <p className="font-medium">Today at 2:30 PM</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Danger Zone */}
                <Card className="border-red-200">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-red-600">
                      <AlertTriangle className="h-5 w-5" />
                      Danger Zone
                    </CardTitle>
                    <CardDescription>
                      Irreversible and destructive actions
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg">
                      <div>
                        <p className="font-medium">Deactivate Account</p>
                        <p className="text-sm text-muted-foreground">
                          Temporarily disable your account. You can reactivate it later.
                        </p>
                      </div>
                      <Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-50">
                        Deactivate
                      </Button>
                    </div>

                    <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg">
                      <div>
                        <p className="font-medium">Delete Account</p>
                        <p className="text-sm text-muted-foreground">
                          Permanently delete your account and all associated data.
                        </p>
                      </div>
                      <Button
                        variant="destructive"
                        onClick={handleDeactivateAccount}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete Account
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

function getNotificationDescription(key: string): string {
  const descriptions: Record<string, string> = {
    newApplications: 'When someone applies to your posted services',
    applicationUpdates: 'When the status of your applications change',
    serviceReminders: 'Reminders about upcoming or ongoing services',
    reviews: 'When someone leaves a review for your work',
    marketing: 'Product updates, tips, and promotional content',
    weeklyDigest: 'Weekly summary of your account activity',
    messages: 'When you receive direct messages',
    urgentOnly: 'Only critical notifications via SMS',
  }
  return descriptions[key] || 'Notification setting'
}
