import { createLazyFileRoute } from '@tanstack/react-router'
import { useState, useMemo, useCallback, useEffect } from 'react'
import { portfolio } from '@/data/portfolio'

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
  'family-pool': [
    { id: 1, title: 'Rooms Overview', url: '/images/family-pool/rooms-list.png', description: 'Invite-only rooms for shared pools' },
    { id: 2, title: 'Cost Split Pool', url: '/images/family-pool/pool-cost-split.png', description: 'Recurring shared cost tracking' },
    { id: 3, title: 'Arisan Pool', url: '/images/family-pool/pool-arisan.png', description: 'Rotating savings pot management' },
    { id: 4, title: 'Mobile Pool View', url: '/images/family-pool/mobile-pool.png', description: 'Responsive pool details screen' },
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
const generateProjectSlug = (title: string): string => 
  title.toLowerCase().replace(/\s+/g, '-')

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

const ZoomInIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35M11 8v6m-3-3h6m5 0a8 8 0 11-16 0 8 8 0 0116 0z"/>
  </svg>
)

const ZoomOutIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35M8 11h6m5 0a8 8 0 11-16 0 8 8 0 0116 0z"/>
  </svg>
)

const ChevronLeftIcon = () => (
  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/>
  </svg>
)

const ChevronRightIcon = () => (
  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
  </svg>
)

const ImagePlaceholderIcon = () => (
  <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
  </svg>
)

// Components
interface ProjectCardProps {
  project: typeof portfolio[0]
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
    
    <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs">
      In Progress
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

const MIN_ZOOM = 1
const MAX_ZOOM = 3
const ZOOM_STEP = 0.5

interface ImageLightboxProps {
  images: DocumentationImage[]
  index: number
  onClose: () => void
  onNavigate: (index: number) => void
}

const ImageLightbox = ({ images, index, onClose, onNavigate }: ImageLightboxProps) => {
  const image = images[index]
  const hasMultiple = images.length > 1
  const [zoom, setZoom] = useState(1)

  const goPrev = useCallback(() => {
    onNavigate((index - 1 + images.length) % images.length)
  }, [index, images.length, onNavigate])

  const goNext = useCallback(() => {
    onNavigate((index + 1) % images.length)
  }, [index, images.length, onNavigate])

  const zoomIn = useCallback(() => {
    setZoom(z => Math.min(MAX_ZOOM, +(z + ZOOM_STEP).toFixed(2)))
  }, [])

  const zoomOut = useCallback(() => {
    setZoom(z => Math.max(MIN_ZOOM, +(z - ZOOM_STEP).toFixed(2)))
  }, [])

  useEffect(() => {
    setZoom(1)
  }, [index])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft' && hasMultiple) goPrev()
      if (e.key === 'ArrowRight' && hasMultiple) goNext()
      if (e.key === '+' || e.key === '=') zoomIn()
      if (e.key === '-') zoomOut()
    }
    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [onClose, goPrev, goNext, zoomIn, zoomOut, hasMultiple])

  if (!image) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={image.title}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
        aria-label="Close preview"
      >
        <CloseIcon />
      </button>

      {hasMultiple && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); goPrev() }}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white transition-colors bg-black/30 hover:bg-black/50 rounded-full p-2"
            aria-label="Previous image"
          >
            <ChevronLeftIcon />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); goNext() }}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white transition-colors bg-black/30 hover:bg-black/50 rounded-full p-2"
            aria-label="Next image"
          >
            <ChevronRightIcon />
          </button>
        </>
      )}

      <figure
        className="max-w-4xl max-h-full flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="max-w-[90vw] max-h-[70vh] overflow-auto rounded-lg">
          <img
            src={image.url}
            alt={image.title}
            style={{ transform: `scale(${zoom})`, transformOrigin: 'center' }}
            className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-2xl transition-transform duration-200"
          />
        </div>

        <div className="mt-3 flex items-center gap-3 bg-black/40 rounded-full px-3 py-1.5">
          <button
            onClick={zoomOut}
            disabled={zoom <= MIN_ZOOM}
            className="text-white/80 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            aria-label="Zoom out"
          >
            <ZoomOutIcon />
          </button>
          <span className="text-white/80 text-xs w-10 text-center tabular-nums">
            {Math.round(zoom * 100)}%
          </span>
          <button
            onClick={zoomIn}
            disabled={zoom >= MAX_ZOOM}
            className="text-white/80 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            aria-label="Zoom in"
          >
            <ZoomInIcon />
          </button>
        </div>

        <figcaption className="mt-3 text-center text-white">
          <h4 className="font-semibold">{image.title}</h4>
          <p className="text-sm text-white/70">{image.description}</p>
          {hasMultiple && (
            <p className="text-xs text-white/50 mt-1">{index + 1} / {images.length}</p>
          )}
        </figcaption>
      </figure>
    </div>
  )
}

interface DocumentationModalProps {
  selectedProject: string
  onClose: () => void
}

const DocumentationModal = ({ selectedProject, onClose }: DocumentationModalProps) => {
  const selectedProjectData = useMemo(
    () => portfolio.find(p => generateProjectSlug(p.title) === selectedProject),
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

      {lightboxIndex !== null && (
        <ImageLightbox
          images={documentationImages}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
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
          <h2 className="text-2xl font-bold mb-4">Ongoing Projects</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Click on any project to see development documentation and progress images
          </p>
        </header>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {portfolio.map((project) => {
            const projectSlug = generateProjectSlug(project.title)
            return (
              <ProjectCard
                key={project.title}
                project={project}
                onClick={() => handleProjectClick(projectSlug)}
              />
            )
          })}
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