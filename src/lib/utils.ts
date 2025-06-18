import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import type { Project } from '@/types'

// Tailwind CSS class merging utility
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// String utilities
export const truncateText = (text: string, maxLength: number): string =>
  text.length > maxLength ? `${text.substring(0, maxLength)}...` : text

export const slugify = (text: string): string =>
  text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')

export const generateProjectSlug = (title: string): string => 
  title.toLowerCase().replace(/\s+/g, '-')

export const capitalizeFirst = (text: string): string =>
  text.charAt(0).toUpperCase() + text.slice(1)

// Array utilities
export const groupBy = <T, K extends keyof T>(array: T[], key: K): Record<string, T[]> => {
  return array.reduce((groups, item) => {
    const group = String(item[key])
    return {
      ...groups,
      [group]: [...(groups[group] || []), item]
    }
  }, {} as Record<string, T[]>)
}

export const sortBy = <T>(array: T[], key: keyof T, direction: 'asc' | 'desc' = 'asc'): T[] => {
  return [...array].sort((a, b) => {
    const aVal = a[key]
    const bVal = b[key]
    
    if (aVal < bVal) return direction === 'asc' ? -1 : 1
    if (aVal > bVal) return direction === 'asc' ? 1 : -1
    return 0
  })
}

// Project utilities
export const filterProjectsByTags = (projects: Project[], tags: string[]): Project[] => {
  if (tags.length === 0) return projects
  
  return projects.filter(project =>
    tags.some(tag => project.tags.includes(tag))
  )
}

export const getUniqueProjectTags = (projects: Project[]): string[] => {
  const allTags = projects.flatMap(project => project.tags)
  return Array.from(new Set(allTags)).sort()
}

// Image utilities
export const optimizeImageUrl = (url: string, width?: number, height?: number, quality?: number): string => {
  if (!url.includes('unsplash.com')) return url
  
  const params = new URLSearchParams()
  if (width) params.set('w', width.toString())
  if (height) params.set('h', height.toString())
  if (quality) params.set('q', quality.toString())
  
  const separator = url.includes('?') ? '&' : '?'
  return `${url}${separator}${params.toString()}`
}

// Debounce utility
export function debounce<T extends (...args: never[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}
