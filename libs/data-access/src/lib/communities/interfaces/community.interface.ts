export interface Community {
  id: number
  admin: Admin
  name: string
  themes: string[]
  tags: string[]
  bannerUrl: string | null
  avatarUrl: string | null
  description: string
  subscribersAmount: number
  createdAt: string
  isJoined: boolean
}

interface Admin {
  id: number
  username: string
  avatarUrl: string | null
  subscribersAmount: number
  firstName: string
  lastName: string
  isActive: boolean
  stack: string[]
  city: string
  description: string
}

export interface CommunityPage extends Community {
  posts: string[]
}
