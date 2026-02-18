export interface User {
  id: string
  name: string
  email: string
  phone: string
  location: string
  role: 'user' | 'admin'
  avatar?: string
  isDisabled?: boolean
  createdAt: Date
}

export interface Service {
  id: string
  title: string
  description: string
  category: string
  price: number
  location: string
  status: 'open' | 'in_progress' | 'closed'
  clientId: string
  client: User
  createdAt: Date
  applications?: Application[]
}

export interface Application {
  id: string
  serviceId: string
  providerId: string
  provider: User
  message: string
  status: 'pending' | 'accepted' | 'rejected'
  createdAt: Date
}

export interface Notification {
  id: string
  userId: string
  message: string
  isRead: boolean
  actionText?: string
  actionUrl?: string
  createdAt: Date
}

export interface Review {
  id: string
  fromUserId: string
  toUserId: string
  serviceId: string
  rating: number
  comment?: string
  createdAt: Date
}

export interface Report {
  id: string
  reporterId: string
  reportedUserId: string
  reason: string
  status: 'pending' | 'reviewed' | 'resolved'
  createdAt: Date
}

export interface Category {
  id: string
  name: string
  description?: string
}

export const SERVICE_CATEGORIES = [
  'Home Repair',
  'Cleaning',
  'Moving',
  'Technology',
  'Tutoring',
  'Design',
  'Writing',
  'Photography',
  'Other'
] as const

export type ServiceCategory = typeof SERVICE_CATEGORIES[number]
