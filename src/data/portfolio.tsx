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
  hidden?: boolean
}

export const projects: Project[] = [
  {
    id: 'tinylink',
    title: 'TinyLink',
    description: 'A minimal URL shortener that turns long links into short, shareable ones.',
    image: '/images/tinylink/homepage.png',
    link: 'https://tinylink.wahidin-aji.my.id/',
    tags: ['URL Shortener'],
    status: 'completed',
    featured: true,
  },
  {
    id: 'family-pool',
    title: 'Family Pool',
    description: 'A self-hosted app for managing shared recurring costs and rotating savings pots in invite-only rooms, with tRPC APIs, SQLite persistence, and receipt OCR support.',
    image: '/images/family-pool/rooms-list.png',
    link: 'https://family-pool.wahidin-aji.my.id/',
    sourceCode: 'https://github.com/WahidinAji/family-pool',
    tags: ['React', 'TypeScript', 'tRPC', 'Effect', 'SQLite', 'Go'],
    status: 'completed',
    featured: true,
  },
  {
    id: 'my-thoughts',
    title: 'My Thoughts',
    description: 'A personal blog for notes and write-ups, in English and Indonesian, with search and year filtering.',
    image: '/images/my-thoughts/homepage.png',
    link: 'https://my-thoughts.wahidin-aji.my.id/',
    tags: ['Blog'],
    status: 'completed',
    featured: true,
  },
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
    hidden: true,
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
    hidden: true,
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
    hidden: true,
  },
] as const