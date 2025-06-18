// Shared type definitions for the portfolio application

export interface Project {
  id: string
  title: string
  description: string
  image: string
  link: string
  sourceCode?: string
  tags: string[]
  status: 'completed' | 'in-progress' | 'planned'
  featured?: boolean
}

export interface DocumentationImage {
  id: number
  title: string
  url: string
  description: string
}

export interface ProjectDocumentation {
  [projectId: string]: DocumentationImage[]
}

export interface SportsDocumentation {
  [sportKey: string]: DocumentationImage[]
}

export interface SocialLink {
  href: string
  label: string
  username: string
  icon: React.ReactNode
}

export interface NavigationItem {
  to: string
  label: string
  exact?: boolean
}

export interface ExternalLink {
  name: string
  url: string
  description: string
}

// Theme types
export type Theme = 'dark' | 'light' | 'system'

export interface ThemeProviderProps {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

export interface ThemeProviderState {
  theme: Theme
  setTheme: (theme: Theme) => void
}

// Component prop types
export interface BaseComponentProps {
  className?: string
  children?: React.ReactNode
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  asChild?: boolean
}

// API Response types
export interface ApiResponse<T> {
  data: T
  message: string
  success: boolean
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

// Error types
export interface AppError {
  message: string
  code?: string
  details?: Record<string, unknown>
}

// Utility types
export type Status = 'idle' | 'loading' | 'success' | 'error'

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>

export type OptionalFields<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>
