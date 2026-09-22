import { createLazyFileRoute } from '@tanstack/react-router'
import { useState, useMemo, useCallback } from 'react'
import { projects, type Project } from '@/data/portfolio'
import Lightbox from 'yet-another-react-lightbox'
import Zoom from 'yet-another-react-lightbox/plugins/zoom'
import Captions from 'yet-another-react-lightbox/plugins/captions'
import Counter from 'yet-another-react-lightbox/plugins/counter'
import 'yet-another-react-lightbox/styles.css'
import 'yet-another-react-lightbox/plugins/captions.css'
import 'yet-another-react-lightbox/plugins/counter.css'

// Types
interface DocumentationImage {
  id: number
  title: string
  url: string
  description: string
}

interface OngoingProjectDocumentation {
  [key: string]: DocumentationImage[]
}

// Constants
const PROJECT_DOCUMENTATION: OngoingProjectDocumentation = {
  tinylink: [
    { id: 1, title: 'Homepage', url: '/images/tinylink/homepage.png', description: 'Paste a long URL and shorten it' },
    { id: 2, title: 'Mobile View', url: '/images/tinylink/mobile.png', description: 'Responsive layout on mobile' },
  ],
  'my-thoughts': [
    { id: 1, title: 'Homepage', url: '/images/my-thoughts/homepage.png', description: 'Bilingual post list with search and year filtering' },
    { id: 2, title: 'Mobile View', url: '/images/my-thoughts/mobile.png', description: 'Responsive layout on mobile' },
  ],
  'family-pool': [
    { id: 1, title: 'Login', url: '/images/family-pool/login.png', description: 'Passwordless, magic-link-only auth' },
    { id: 2, title: 'Rooms Dashboard', url: '/images/family-pool/rooms-list.png', description: "Rooms you're in, what you owe, and pending approvals" },
    { id: 3, title: 'Room — Pools Tab', url: '/images/family-pool/room-pools-tab.png', description: 'The pools a family shares inside a room' },
    { id: 4, title: 'Create Pool Dialog', url: '/images/family-pool/create-pool-dialog.png', description: 'Choose between a cost-split pool or a rotating arisan pot' },
    { id: 5, title: 'Room — Members Tab', url: '/images/family-pool/room-members-tab.png', description: 'Manage who is in the room' },
    { id: 6, title: 'Room — Settings Tab', url: '/images/family-pool/room-settings-tab.png', description: "The room's reusable invite link" },
    { id: 7, title: 'Cost-Split Pool', url: '/images/family-pool/pool-cost-split.png', description: 'Balance and paid-through period computed live from an append-only ledger' },
    { id: 8, title: 'Arisan Pool', url: '/images/family-pool/pool-arisan.png', description: 'Rotating savings pot — one random winner per round' },
    { id: 9, title: 'Approval Inbox', url: '/images/family-pool/inbox.png', description: "Every room you own's pending receipt approvals in one place" },
    { id: 10, title: 'Login — Modern Theme', url: '/images/family-pool/theme-login-modern.png', description: 'The default modern theme' },
    { id: 11, title: 'Login — Retro Theme', url: '/images/family-pool/theme-login-retro.png', description: 'A full retro theme, pure CSS on shared component slots' },
    { id: 12, title: 'Pool — Modern Theme', url: '/images/family-pool/theme-pool-modern.png', description: 'Pool page in the modern theme' },
    { id: 13, title: 'Pool — Retro Theme', url: '/images/family-pool/theme-pool-retro.png', description: 'Pool page in the retro theme' },
    { id: 14, title: 'Mobile View', url: '/images/family-pool/mobile-pool.png', description: 'Built mobile-first for uploading receipt photos' },
  ],
  marketplace: [
    { id: 1, title: 'Homepage Design', url: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=400&fit=crop', description: 'Landing page with product showcase' },
    { id: 2, title: 'Product Catalog', url: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=400&fit=crop', description: 'Product listing and filtering system' },
    { id: 3, title: 'Shopping Cart', url: 'https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?w=400&h=400&fit=crop', description: 'Cart functionality and checkout process' },
    { id: 4, title: 'Admin Dashboard', url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=400&fit=crop', description: 'Backend management interface' },
  ],
  'chat-app': [
    { id: 1, title: 'Chat Interface', url: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=400&fit=crop', description: 'Real-time messaging interface' },
    { id: 2, title: 'User Authentication', url: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=400&fit=crop', description: 'Login and registration system' },
    { id: 3, title: 'File Sharing', url: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=400&h=400&fit=crop', description: 'Document and media sharing' },
    { id: 4, title: 'Group Chats', url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=400&fit=crop', description: 'Multi-user conversation rooms' },
  ],
  blogs: [
    { id: 1, title: 'Blog Editor', url: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=400&fit=crop', description: 'Rich text editor for posts' },
    { id: 2, title: 'Comment System', url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=400&fit=crop', description: 'User engagement features' },
    { id: 3, title: 'SEO Optimization', url: 'https://images.unsplash.com/photo-1432888622747-4eb9a8c2da2e?w=400&h=400&fit=crop', description: 'Search engine optimization' },
    { id: 4, title: 'Content Management', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop', description: 'Post categorization and tagging' },
  ],
  'ai-chatbot-platform': [
    { id: 1, title: 'AI Chatbot Interface', url: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=400&h=400&fit=crop', description: 'Interactive chatbot with natural language processing' },
    { id: 2, title: 'Machine Learning Pipeline', url: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=400&fit=crop', description: 'AI model training and deployment system' },
    { id: 3, title: 'Knowledge Base Integration', url: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=400&h=400&fit=crop', description: 'Vector database for intelligent responses' },
    { id: 4, title: 'AI Analytics Dashboard', url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=400&fit=crop', description: 'Performance metrics and conversation insights' },
  ],
} as const

// Utils
const STATUS_LABELS: Record<Project['status'], string> = {
  completed: 'Completed',
  'in-progress': 'In Progress',
  planned: 'Planned',
}

const STATUS_STYLES: Record<Project['status'], string> = {
  completed: 'bg-emerald-500',
  'in-progress': 'bg-amber-500',
  planned: 'bg-gray-500',
}

const truncateText = (text: string, maxLength: number): string =>
  text.length > maxLength ? `${text.substring(0, maxLength)}...` : text

// Icons
const CodeIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
  </svg>
)

const CloseIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
  </svg>
)

const ImagePlaceholderIcon = () => (
  <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
  </svg>
)

// Components
interface ProjectCardProps {
  project: Project
  onClick: () => void
}

const ProjectCard = ({ project, onClick }: ProjectCardProps) => (
  <article
    onClick={onClick}
    className="group relative overflow-hidden rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
    role="button"
    tabIndex={0}
    onKeyDown={(e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        onClick()
      }
    }}
    aria-label={`View documentation for ${project.title}`}
  >
    <header className="flex items-center justify-center mb-4">
      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
        <CodeIcon />
      </div>
    </header>
    
    <div className="text-center">
      <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
      <p className="text-sm opacity-90 mb-2">
        {truncateText(project.description, 60)}
      </p>
      <p className="text-xs opacity-75">Click to see documentation</p>
    </div>
    
    <div className={`absolute top-2 right-2 ${STATUS_STYLES[project.status]} text-white px-2 py-1 rounded-full text-xs`}>
      {STATUS_LABELS[project.status]}
    </div>
  </article>
)

interface DocumentationImageProps {
  image: DocumentationImage
  onClick: () => void
}

const DocumentationImage = ({ image, onClick }: DocumentationImageProps) => {
  const handleImageError = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement
    const parent = target.parentElement

    if (parent && !parent.querySelector('.fallback-icon')) {
      target.style.display = 'none'

      const fallback = document.createElement('div')
      fallback.className = 'fallback-icon w-full h-full flex items-center justify-center text-gray-500 dark:text-gray-400'
      fallback.innerHTML = `
        <div class="text-center">
          ${ImagePlaceholderIcon().props.children}
          <p class="text-xs">Image not found</p>
        </div>
      `
      parent.appendChild(fallback)
    }
  }, [])

  return (
    <article
      className="group relative cursor-zoom-in"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onClick()
        }
      }}
      aria-label={`Preview ${image.title}`}
    >
      <div className="aspect-square bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-600 dark:to-gray-700 rounded-lg overflow-hidden">
        <img
          src={image.url}
          alt={image.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          onError={handleImageError}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex items-end">
          <div className="p-3 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <h4 className="font-semibold text-sm">{image.title}</h4>
            <p className="text-xs">{image.description}</p>
          </div>
        </div>
      </div>
    </article>
  )
}

interface DocumentationModalProps {
  selectedProject: string
  onClose: () => void
}

const DocumentationModal = ({ selectedProject, onClose }: DocumentationModalProps) => {
  const selectedProjectData = useMemo(
    () => projects.find(p => p.id === selectedProject),
    [selectedProject]
  )

  const documentationImages = PROJECT_DOCUMENTATION[selectedProject] || []
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  if (!selectedProjectData) return null

  return (
    <section className="mt-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
      <header className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold">
          {selectedProjectData.title} - Development Documentation
        </h3>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
          aria-label="Close documentation"
        >
          <CloseIcon />
        </button>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {documentationImages.map((image, index) => (
          <DocumentationImage
            key={image.id}
            image={image}
            onClick={() => setLightboxIndex(index)}
          />
        ))}
      </div>

      <footer className="mt-4 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          🚀 Development progress and implementation details for {selectedProjectData.title}
        </p>
      </footer>

      <Lightbox
        open={lightboxIndex !== null}
        close={() => setLightboxIndex(null)}
        index={lightboxIndex ?? 0}
        slides={documentationImages.map((image) => ({
          src: image.url,
          alt: image.title,
          title: image.title,
          description: image.description,
        }))}
        plugins={[Zoom, Captions, Counter]}
        on={{ view: ({ index }) => setLightboxIndex(index) }}
        counter={{ container: { style: { top: 'unset', bottom: 0 } } }}
        zoom={{ maxZoomPixelRatio: 3, doubleTapDelay: 300 }}
      />
    </section>
  )
}

// Main Component
const Portfolio = () => {
  const [selectedProject, setSelectedProject] = useState<string | null>(null)

  const handleProjectClick = useCallback((projectSlug: string) => {
    setSelectedProject(current => current === projectSlug ? null : projectSlug)
  }, [])

  const closeDocumentation = useCallback(() => {
    setSelectedProject(null)
  }, [])

  return (
    <main className="max-w-screen-lg mx-auto px-4 py-8">
      <header className="text-center mb-12">
        <p className="text-xl md:text-lg mb-8">
          Here are some projects I've worked on to highlight my skills.
        </p>
      </header>

      <section className="mb-8">
        <header className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-4">Projects</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Click on any project to see development documentation and progress images
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {projects.filter((project) => !project.hidden).map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={() => handleProjectClick(project.id)}
            />
          ))}
        </div>

        {selectedProject && (
          <DocumentationModal
            selectedProject={selectedProject}
            onClose={closeDocumentation}
          />
        )}
      </section>
    </main>
  )
}

export const Route = createLazyFileRoute('/portfolio')({
  component: Portfolio,
})