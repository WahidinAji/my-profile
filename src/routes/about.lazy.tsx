import { createLazyFileRoute } from '@tanstack/react-router'
import { useState, useCallback, useMemo } from 'react'

// Types
interface DocumentationImage {
  id: number
  title: string
  url: string
  description: string
}

interface SportsDocumentation {
  [key: string]: DocumentationImage[]
}

interface SportCard {
  key: string
  title: string
  description: string
  icon: React.ReactNode
  gradient: string
}

// Constants
const SPORTS_DOCUMENTATION: SportsDocumentation = {
  'mini-soccer': [
    { id: 1, title: 'Team Match at Local Field', url: '/images/1725281319887.jpg', description: 'Playing with the local team' },
    { id: 2, title: 'Tournament Victory', url: '/images/1725281319887.jpg', description: 'Celebrating our championship win' },
    { id: 3, title: 'Training Session', url: '/images/1725281319887.jpg', description: 'Daily practice with teammates' },
    { id: 4, title: 'Community League', url: '/images/1725281319887.jpg', description: 'Participating in community events' },
    { id: 5, title: 'Team Celebration', url: '/images/1725281319887.jpg', description: 'Post-game team celebration' },
  ],
  swimming: [
    { id: 1, title: 'Morning Lap Session', url: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=400&h=400&fit=crop', description: 'Early morning training routine' },
    { id: 2, title: 'Pool Competition', url: 'https://images.unsplash.com/photo-1571019613540-996a5fa2f536?w=400&h=400&fit=crop', description: 'Local swimming competition' },
    { id: 3, title: 'Technique Practice', url: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=400&h=400&fit=crop', description: 'Working on stroke technique' },
    { id: 4, title: 'Open Water Swimming', url: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=400&fit=crop', description: 'Beach swimming adventure' },
  ],
  'other-activities': [
    { id: 1, title: 'Hiking Adventure', url: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&h=400&fit=crop', description: 'Weekend mountain hiking' },
    { id: 2, title: 'Cycling Tour', url: 'https://images.unsplash.com/photo-1558618666-fbd9c6cd4d0a?w=400&h=400&fit=crop', description: 'City cycling exploration' },
    { id: 3, title: 'Basketball Game', url: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=400&fit=crop', description: 'Friendly basketball match' },
    { id: 4, title: 'Volleyball Beach', url: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=400&h=400&fit=crop', description: 'Beach volleyball with friends' },
  ],
} as const

const SPORT_CARDS: SportCard[] = [
  {
    key: 'mini-soccer',
    title: 'Mini Soccer',
    description: 'Fast-paced fun with friends on smaller fields',
    gradient: 'from-green-400 to-blue-500',
    icon: (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="11"/>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM8 12c0-.55.45-1 1-1s1 .45 1 1-.45 1-1 1-1-.45-1-1zm8 0c0-.55.45-1 1-1s1 .45 1 1-.45 1-1 1-1-.45-1-1z" fill="none" stroke="currentColor" strokeWidth="2"/>
      </svg>
    ),
  },
  {
    key: 'swimming',
    title: 'Swimming',
    description: 'Great cardio workout and relaxation',
    gradient: 'from-blue-400 to-cyan-500',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 2C8.13 2 5 5.13 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.87-3.13-7-7-7z"/>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 14c.83 0 1.5-.67 1.5-1.5S8.83 11 8 11s-1.5.67-1.5 1.5S7.17 14 8 14z"/>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 14c.83 0 1.5-.67 1.5-1.5S16.83 11 16 11s-1.5.67-1.5 1.5S15.17 14 16 14z"/>
      </svg>
    ),
  },
  {
    key: 'other-activities',
    title: 'Other Activities',
    description: 'Always exploring new ways to stay active',
    gradient: 'from-purple-400 to-pink-500',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
      </svg>
    ),
  },
] as const

// Utility Functions
const createExternalLink = (href: string, text: string, className = 'font-bold underline text-blue-600 hover:text-blue-800 dark:hover:text-blue-400 transition-colors') => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer" 
    className={className}
  >
    {text}
  </a>
)

// Icons
const CloseIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
  </svg>
)

// Components
const ProfessionalBio = () => (
  <section className="prose prose-lg dark:prose-invert max-w-none">
    <div className="space-y-6">
      <p>
        Hello there, I'm a Software Engineer who loves to build things and learn new things.
        I'm currently working as a Software Engineer at {createExternalLink('https://pandai.org', 'Pandai Education, Sdn Bhd')}.
      </p>

      <p>
        I started programming when I was in University, and I've been programming ever since.
        The first programming language I learned was {createExternalLink('https://en.wikipedia.org/wiki/C_(programming_language)', 'C')}.
        I've been programming in {createExternalLink('https://en.wikipedia.org/wiki/C_(programming_language)', 'C')}, {createExternalLink('https://en.wikipedia.org/wiki/C%2B%2B', 'C++')}, {createExternalLink('https://learn.microsoft.com/en-us/dotnet/csharp/', 'C#')}, and {createExternalLink('https://en.wikipedia.org/wiki/SQL', 'SQL')} in college.
        When I got my first job, My company was using {createExternalLink('https://laravel.com/', 'Laravel')} and {createExternalLink('https://www.php.net/', 'PHP')}.
        That's how I got into programming and I've been programming ever since.
      </p>

      <p>
        With 3 years of experience, I realized that programming languages are not the only thing that matters. The other important thing is what you do with your programming skills.
        Otherwise, programming languages are just a tool to help you do your job. Choosing the right programming language is not the same as choosing the right job.
        So, with that in mind, I can code in any language that I or my team wants to use. I've also been working with {createExternalLink('https://www.typescriptlang.org/', 'TypeScript')}, {createExternalLink('https://en.wikipedia.org/wiki/JavaScript', 'JavaScript')}, {createExternalLink('https://www.python.org/', 'Python')}, and {createExternalLink('https://go.dev/', 'Go')}.
        Lately, I'm falling in love with Open-Source projects and I'm always increasing my knowledge and skills in the field of Open-Source.
      </p>

      <p>
        Beyond coding, I also love staying active through sports! I particularly enjoy <span className='font-bold text-blue-600'>mini soccer</span>, <span className='font-bold text-blue-600'>swimming</span>, and other recreational activities. 
        Sports help me maintain a healthy work-life balance and keep my mind sharp for problem-solving.
      </p>
    </div>
  </section>
)

interface SportCardProps {
  sport: SportCard
  onClick: () => void
}

const SportCard = ({ sport, onClick }: SportCardProps) => (
  <article
    onClick={onClick}
    className={`group relative overflow-hidden rounded-lg bg-gradient-to-br ${sport.gradient} p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer`}
    role="button"
    tabIndex={0}
    onKeyDown={(e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        onClick()
      }
    }}
    aria-label={`View documentation for ${sport.title}`}
  >
    <div className="flex items-center justify-center mb-4">
      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
        {sport.icon}
      </div>
    </div>
    <h3 className="text-lg font-semibold text-center mb-2">{sport.title}</h3>
    <p className="text-sm text-center opacity-90 mb-2">{sport.description}</p>
    <p className="text-xs text-center opacity-75">Click to see documentation</p>
  </article>
)

interface DocumentationImageProps {
  image: DocumentationImage
}

const DocumentationImage = ({ image }: DocumentationImageProps) => {
  const handleImageError = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement
    const parent = target.parentElement
    
    if (parent && !parent.querySelector('.fallback-icon')) {
      target.style.display = 'none'
      
      const fallback = document.createElement('div')
      fallback.className = 'fallback-icon w-full h-full flex items-center justify-center text-gray-500 dark:text-gray-400'
      fallback.innerHTML = `
        <div class="text-center">
          <svg class="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
          </svg>
          <p class="text-xs">Image not found</p>
        </div>
      `
      parent.appendChild(fallback)
    }
  }, [])

  return (
    <article className="group relative">
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

interface SportsDocumentationModalProps {
  selectedSport: string
  onClose: () => void
}

const SportsDocumentationModal = ({ selectedSport, onClose }: SportsDocumentationModalProps) => {
  const selectedSportData = useMemo(
    () => SPORT_CARDS.find(sport => sport.key === selectedSport),
    [selectedSport]
  )
  
  const documentationImages = SPORTS_DOCUMENTATION[selectedSport] || []

  if (!selectedSportData) return null

  return (
    <section className="mt-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
      <header className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold">
          {selectedSportData.title} Documentation
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
        {documentationImages.map((image) => (
          <DocumentationImage key={image.id} image={image} />
        ))}
      </div>
      
      <footer className="mt-4 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          📸 Documentation images showcase my journey in {selectedSportData.title.toLowerCase()}
        </p>
      </footer>
    </section>
  )
}

const SportsSection = () => {
  const [selectedSport, setSelectedSport] = useState<string | null>(null)

  const handleSportClick = useCallback((sportKey: string) => {
    setSelectedSport(current => current === sportKey ? null : sportKey)
  }, [])

  const closeDocumentation = useCallback(() => {
    setSelectedSport(null)
  }, [])

  return (
    <section className="mt-12">
      <header className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-4">My Sports & Activities</h2>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {SPORT_CARDS.map((sport) => (
          <SportCard
            key={sport.key}
            sport={sport}
            onClick={() => handleSportClick(sport.key)}
          />
        ))}
      </div>

      {selectedSport && (
        <SportsDocumentationModal
          selectedSport={selectedSport}
          onClose={closeDocumentation}
        />
      )}

      <div className="mt-8 p-4 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-lg">
        <p className="text-center text-sm italic">
          💡 <strong>Fun fact:</strong> Playing sports helps me think more creatively when coding. 
          The strategic thinking in mini soccer often translates to better problem-solving in development!
        </p>
      </div>
    </section>
  )
}

const Signature = () => (
  <footer className="mt-12 text-sm">
    <p>
      Sincerely,
      <br />
      <strong>Wahidin Aji</strong>
    </p>
  </footer>
)

// Main Component
const AboutPage = () => (
  <div className="max-w-4xl mx-auto px-4 py-8">
    <ProfessionalBio />
    <SportsSection />
    <Signature />
  </div>
)

export const Route = createLazyFileRoute('/about')({
  component: AboutPage,
})
