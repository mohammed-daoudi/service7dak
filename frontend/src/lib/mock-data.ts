import type { User, Service, Application, Notification, Review, Report, Category } from './types'

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1234567890',
    location: 'New York, NY',
    role: 'user',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
    createdAt: new Date('2024-01-15')
  },
  {
    id: '2',
    name: 'Sarah Wilson',
    email: 'sarah@example.com',
    phone: '+1234567891',
    location: 'Los Angeles, CA',
    role: 'user',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b1-32&h=32&fit=crop&crop=face',
    createdAt: new Date('2024-01-20')
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike@example.com',
    phone: '+1234567892',
    location: 'Chicago, IL',
    role: 'user',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face',
    createdAt: new Date('2024-02-01')
  },
  {
    id: '4',
    name: 'Admin User',
    email: 'admin@example.com',
    phone: '+1234567893',
    location: 'San Francisco, CA',
    role: 'admin',
    createdAt: new Date('2024-01-01')
  }
]

export const mockServices: Service[] = [
  {
    id: '1',
    title: 'Fix Kitchen Faucet',
    description: 'Need someone to repair a leaky kitchen faucet. Basic plumbing knowledge required.',
    category: 'Home Repair',
    price: 75,
    location: 'New York, NY',
    status: 'open',
    clientId: '1',
    client: mockUsers[0],
    createdAt: new Date('2024-03-01')
  },
  {
    id: '2',
    title: 'House Cleaning Service',
    description: 'Looking for thorough house cleaning. 3-bedroom apartment, approximately 4 hours of work.',
    category: 'Cleaning',
    price: 120,
    location: 'Los Angeles, CA',
    status: 'in_progress',
    clientId: '2',
    client: mockUsers[1],
    createdAt: new Date('2024-03-05')
  },
  {
    id: '3',
    title: 'Website Design',
    description: 'Need a modern website for my small business. Experience with React/Next.js preferred.',
    category: 'Design',
    price: 500,
    location: 'Chicago, IL',
    status: 'open',
    clientId: '3',
    client: mockUsers[2],
    createdAt: new Date('2024-03-10')
  },
  {
    id: '4',
    title: 'Math Tutoring',
    description: 'Help needed with calculus for college student. Online sessions preferred.',
    category: 'Tutoring',
    price: 40,
    location: 'Online',
    status: 'closed',
    clientId: '1',
    client: mockUsers[0],
    createdAt: new Date('2024-02-20')
  }
]

export const mockApplications: Application[] = [
  {
    id: '1',
    serviceId: '1',
    providerId: '2',
    provider: mockUsers[1],
    message: 'I have 5 years of plumbing experience and can fix this for you today.',
    status: 'pending',
    createdAt: new Date('2024-03-02')
  },
  {
    id: '2',
    serviceId: '1',
    providerId: '3',
    provider: mockUsers[2],
    message: 'Licensed plumber with all necessary tools. Available this weekend.',
    status: 'accepted',
    createdAt: new Date('2024-03-01')
  },
  {
    id: '3',
    serviceId: '2',
    providerId: '1',
    provider: mockUsers[0],
    message: 'Professional cleaning service with 3+ years experience.',
    status: 'accepted',
    createdAt: new Date('2024-03-06')
  },
  {
    id: '4',
    serviceId: '3',
    providerId: '2',
    provider: mockUsers[1],
    message: 'Full-stack developer specializing in React. Portfolio available upon request.',
    status: 'pending',
    createdAt: new Date('2024-03-11')
  }
]

export const mockNotifications: Notification[] = [
  {
    id: '1',
    userId: '1',
    message: "You've been accepted for the service 'House Cleaning Service'. Contact the client at +1234567891.",
    isRead: false,
    actionText: 'Contact Client',
    actionUrl: '/contact/2',
    createdAt: new Date('2024-03-06')
  },
  {
    id: '2',
    userId: '2',
    message: "Please rate your experience with the provider for 'Fix Kitchen Faucet'.",
    isRead: false,
    actionText: 'Leave Review',
    actionUrl: '/review/1',
    createdAt: new Date('2024-03-05')
  },
  {
    id: '3',
    userId: '3',
    message: 'New application received for your service "Website Design".',
    isRead: true,
    actionText: 'View Applications',
    actionUrl: '/applications/3',
    createdAt: new Date('2024-03-11')
  },
  {
    id: '4',
    userId: '1',
    message: 'Your service "Fix Kitchen Faucet" has been marked as completed.',
    isRead: true,
    createdAt: new Date('2024-03-10')
  }
]

export const mockReviews: Review[] = [
  {
    id: '1',
    fromUserId: '1',
    toUserId: '3',
    serviceId: '4',
    rating: 5,
    comment: 'Excellent tutoring! Very patient and knowledgeable.',
    createdAt: new Date('2024-02-25')
  },
  {
    id: '2',
    fromUserId: '2',
    toUserId: '1',
    serviceId: '2',
    rating: 4,
    comment: 'Good cleaning service, arrived on time.',
    createdAt: new Date('2024-03-08')
  }
]

export const mockReports: Report[] = [
  {
    id: '1',
    reporterId: '1',
    reportedUserId: '2',
    reason: 'User was unprofessional and did not complete the agreed work.',
    status: 'pending',
    createdAt: new Date('2024-03-08')
  },
  {
    id: '2',
    reporterId: '3',
    reportedUserId: '1',
    reason: 'Spam messages and inappropriate behavior.',
    status: 'reviewed',
    createdAt: new Date('2024-03-05')
  }
]

export const mockCategories: Category[] = [
  { id: '1', name: 'Home Repair', description: 'Plumbing, electrical, carpentry, and general repairs' },
  { id: '2', name: 'Cleaning', description: 'House cleaning, office cleaning, and specialized cleaning' },
  { id: '3', name: 'Moving', description: 'Moving services, packing, and transportation' },
  { id: '4', name: 'Technology', description: 'IT support, web development, and tech consulting' },
  { id: '5', name: 'Tutoring', description: 'Academic tutoring and skill teaching' },
  { id: '6', name: 'Design', description: 'Graphic design, web design, and creative services' },
  { id: '7', name: 'Writing', description: 'Content writing, copywriting, and editing' },
  { id: '8', name: 'Photography', description: 'Event photography, portraits, and photo editing' },
  { id: '9', name: 'Other', description: 'Miscellaneous services not covered by other categories' }
]
