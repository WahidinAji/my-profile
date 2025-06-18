// Portfolio data types and configuration
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

export const projects: Project[] = [
  {
    id: 'marketplace',
    title: 'E-Commerce Marketplace',
    description: 'A full-stack marketplace application featuring user authentication, product management, shopping cart functionality, and secure payment processing. Built with modern technologies for optimal performance.',
    image: '/images/marketplace-preview.jpg',
    link: 'https://wahidinaji.github.io/marketplace/',
    sourceCode: 'https://github.com/WahidinAJi/marketplace',
    tags: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Stripe'],
    status: 'in-progress',
    featured: true,
  },
  {
    id: 'chat-app',
    title: 'Real-time Chat Application',
    description: 'A modern chat application with real-time messaging, file sharing, group conversations, and user presence indicators. Features end-to-end encryption and responsive design.',
    image: '/images/chat-app-preview.jpg',
    link: 'https://wahidinaji.github.io/chat-app/',
    sourceCode: 'https://github.com/WahidinAJi/chat-app',
    tags: ['React', 'Socket.io', 'Node.js', 'MongoDB', 'WebRTC'],
    status: 'in-progress',
    featured: true,
  },
  {
    id: 'blog-platform',
    title: 'Content Management Platform',
    description: 'A comprehensive blogging platform with rich text editing, comment system, SEO optimization, and content categorization. Supports multiple authors and advanced analytics.',
    image: '/images/blog-platform-preview.jpg',
    link: 'https://wahidinaji.github.io/blog-platform/',
    sourceCode: 'https://github.com/WahidinAJi/blog-platform',
    tags: ['React', 'Next.js', 'MDX', 'Prisma', 'PostgreSQL'],
    status: 'in-progress',
    featured: false,
  },
  {
    id: 'ai-chatbot-platform',
    title: 'AI Chatbot Platform',
    description: 'An intelligent AI chatbot platform with machine learning capabilities, natural language processing, and real-time conversation analytics for enhanced user engagement.',
    image: '/images/ai-chatbot-preview.jpg',
    link: 'https://wahidinaji.github.io/ai-chatbot/',
    sourceCode: 'https://github.com/WahidinAJi/ai-chatbot',
    tags: ['Python', 'TensorFlow', 'React', 'FastAPI', 'OpenAI'],
    status: 'in-progress',
    featured: true,
  },
] as const

// Legacy export for backward compatibility
export const portfolio = projects.map(project => ({
  title: project.title,
  description: project.description,
  image: project.image,
  link: project.link,
  source: project.sourceCode || '',
  tags: project.tags,
}))

// Utility functions
export const getFeaturedProjects = (): Project[] => 
  projects.filter(project => project.featured)

export const getProjectsByStatus = (status: Project['status']): Project[] =>
  projects.filter(project => project.status === status)

export const getProjectById = (id: string): Project | undefined =>
  projects.find(project => project.id === id)