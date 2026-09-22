import { createLazyFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { ExternalLink, Github, Images, Code2 } from 'lucide-react'
import { projects, type Project } from '@/data/projects'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Lightbox from 'yet-another-react-lightbox'
import Zoom from 'yet-another-react-lightbox/plugins/zoom'
import Captions from 'yet-another-react-lightbox/plugins/captions'
import Counter from 'yet-another-react-lightbox/plugins/counter'
import 'yet-another-react-lightbox/styles.css'
import 'yet-another-react-lightbox/plugins/captions.css'
import 'yet-another-react-lightbox/plugins/counter.css'

// Types
interface GalleryImage {
  title: string
  url: string
  description: string
}

// Constants — only real, self-captured screenshots. No stock photos.
const PROJECT_GALLERY: Record<string, GalleryImage[]> = {
  tinylink: [
    { title: 'Homepage', url: '/images/tinylink/homepage.png', description: 'Paste a long URL and shorten it' },
    { title: 'Mobile View', url: '/images/tinylink/mobile.png', description: 'Responsive layout on mobile' },
  ],
  'my-thoughts': [
    { title: 'Homepage', url: '/images/my-thoughts/homepage.png', description: 'Bilingual post list with search and year filtering' },
    { title: 'Mobile View', url: '/images/my-thoughts/mobile.png', description: 'Responsive layout on mobile' },
  ],
  'family-pool': [
    { title: 'Login', url: '/images/family-pool/login.png', description: 'Passwordless, magic-link-only auth' },
    { title: 'Login — Retro Theme', url: '/images/family-pool/theme-login-retro.png', description: 'A full retro theme, pure CSS on shared component slots' },
    { title: 'Rooms Dashboard', url: '/images/family-pool/rooms-list.png', description: "Rooms you're in, what you owe, and pending approvals" },
    { title: 'Rooms Dashboard — Retro', url: '/images/family-pool/rooms-list-retro.png', description: 'Rooms dashboard in the retro theme' },
    { title: 'Room — Pools Tab', url: '/images/family-pool/room-pools-tab.png', description: 'The pools a family shares inside a room' },
    { title: 'Room — Pools Tab — Retro', url: '/images/family-pool/room-pools-tab-retro.png', description: 'Pools tab in the retro theme' },
    { title: 'Create Pool Dialog', url: '/images/family-pool/create-pool-dialog.png', description: 'Choose between a cost-split pool or a rotating arisan pot' },
    { title: 'Create Pool Dialog — Retro', url: '/images/family-pool/create-pool-dialog-retro.png', description: 'Create-pool dialog in the retro theme' },
    { title: 'Room — Members Tab', url: '/images/family-pool/room-members-tab.png', description: 'Manage who is in the room' },
    { title: 'Room — Members Tab — Retro', url: '/images/family-pool/room-members-tab-retro.png', description: 'Members tab in the retro theme' },
    { title: 'Room — Settings Tab', url: '/images/family-pool/room-settings-tab.png', description: "The room's reusable invite link" },
    { title: 'Room — Settings Tab — Retro', url: '/images/family-pool/room-settings-tab-retro.png', description: 'Settings tab in the retro theme' },
    { title: 'Cost-Split Pool', url: '/images/family-pool/pool-cost-split.png', description: 'Balance and paid-through period computed live from an append-only ledger' },
    { title: 'Cost-Split Pool — Retro', url: '/images/family-pool/theme-pool-retro.png', description: 'Cost-split pool in the retro theme' },
    { title: 'Arisan Pool', url: '/images/family-pool/pool-arisan.png', description: 'Rotating savings pot — one random winner per round' },
    { title: 'Arisan Pool — Retro', url: '/images/family-pool/pool-arisan-retro.png', description: 'Arisan pool in the retro theme' },
    { title: 'Approval Inbox', url: '/images/family-pool/inbox.png', description: "Every room you own's pending receipt approvals in one place" },
    { title: 'Approval Inbox — Retro', url: '/images/family-pool/inbox-retro.png', description: 'Approval inbox in the retro theme' },
    { title: 'Mobile View', url: '/images/family-pool/mobile-pool.png', description: 'Built mobile-first for uploading receipt photos' },
    { title: 'Mobile View — Retro', url: '/images/family-pool/mobile-pool-retro.png', description: 'Mobile view in the retro theme' },
  ],
}

const STATUS_LABEL: Record<Project['status'], string> = {
  completed: 'Completed',
  'in-progress': 'In Progress',
  planned: 'Planned',
}

const STATUS_VARIANT: Record<Project['status'], 'success' | 'warning' | 'secondary'> = {
  completed: 'success',
  'in-progress': 'warning',
  planned: 'secondary',
}

// Components
const ProjectThumbnail = ({ project }: { project: Project }) => {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-muted text-muted-foreground">
        <Code2 className="size-8" />
      </div>
    )
  }

  return (
    <img
      src={project.image}
      alt={`${project.title} screenshot`}
      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
      loading="lazy"
      onError={() => setFailed(true)}
    />
  )
}

interface ProjectCardProps {
  project: Project
  onOpenGallery: () => void
}

const ProjectCard = ({ project, onOpenGallery }: ProjectCardProps) => {
  const hasGallery = Boolean(PROJECT_GALLERY[project.id]?.length)

  return (
    <Card className="group flex h-full flex-col overflow-hidden">
      <div className="aspect-video overflow-hidden bg-muted">
        <ProjectThumbnail project={project} />
      </div>

      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-lg">{project.title}</CardTitle>
          <Badge variant={STATUS_VARIANT[project.status]} className="shrink-0">
            {STATUS_LABEL[project.status]}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="flex-1">
        <p className="text-sm text-muted-foreground">{project.description}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>

      <CardFooter className="flex flex-wrap gap-2">
        <Button asChild size="sm">
          <a href={project.link} target="_blank" rel="noopener noreferrer">
            <ExternalLink /> View Project
          </a>
        </Button>
        {project.sourceCode && (
          <Button asChild size="sm" variant="outline">
            <a href={project.sourceCode} target="_blank" rel="noopener noreferrer">
              <Github /> Source
            </a>
          </Button>
        )}
        {hasGallery && (
          <Button size="sm" variant="ghost" onClick={onOpenGallery}>
            <Images /> Screenshots
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

// Main Component
const Projects = () => {
  const [galleryProjectId, setGalleryProjectId] = useState<string | null>(null)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const galleryImages = galleryProjectId ? PROJECT_GALLERY[galleryProjectId] ?? [] : []

  return (
    <main className="max-w-screen-lg mx-auto px-4 py-8">
      <header className="text-center mb-12">
        <p className="text-xl md:text-lg mb-8">
          Here are some projects I've worked on to highlight my skills.
        </p>
      </header>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-center mb-8">Projects</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects
            .filter((project) => !project.hidden)
            .map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onOpenGallery={() => {
                  setGalleryProjectId(project.id)
                  setLightboxIndex(0)
                }}
              />
            ))}
        </div>
      </section>

      <Lightbox
        open={galleryProjectId !== null}
        close={() => setGalleryProjectId(null)}
        index={lightboxIndex}
        slides={galleryImages.map((image) => ({
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
    </main>
  )
}

export const Route = createLazyFileRoute('/projects')({
  component: Projects,
})
