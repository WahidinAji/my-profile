import { ThemeProvider } from "@/components/theme-provider"
import { ModeToggle } from "@/components/mode-toggle"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { projects } from "@/data/portfolio"
import { useState, useEffect } from "react"

// Types
interface SocialLink {
  href: string
  label: string
  username: string
  icon: React.ReactNode
}

interface DocumentationImage {
  id: number
  title: string
  url: string
  description: string
}

interface SportsDocumentation {
  [key: string]: DocumentationImage[]
}

// Constants
const SOCIAL_LINKS: SocialLink[] = [
  {
    href: 'https://github.com/WahidinAJi',
    label: 'GitHub Profile',
    username: '@WahidinAji',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="34"
        height="34"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-github"
      >
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
        <path d="M9 18c-4.51 2-5-2-7-2" />
      </svg>
    ),
  },
]

const SPORTS_DOCUMENTATION: SportsDocumentation = {
  'mini-soccer': [
    { id: 1, title: 'Team Match at Local Field', url: '/images/1725281319887.jpg', description: 'Playing with the local team' },
    { id: 2, title: 'Tournament Victory', url: '/images/1725281319887.jpg', description: 'Celebrating our championship win' },
    { id: 3, title: 'Training Session', url: '/images/1725281319887.jpg', description: 'Daily practice with teammates' },
  ],
  'other-sports': [
    { id: 1, title: 'Basketball Game', url: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=400&fit=crop', description: 'Friendly basketball match with teammates' },
    { id: 2, title: 'Volleyball Beach', url: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=400&h=400&fit=crop', description: 'Beach volleyball with friends' },
    { id: 3, title: 'Cycling Adventure', url: 'https://images.unsplash.com/photo-1558618666-fbd9c6cd4d0a?w=400&h=400&fit=crop', description: 'Weekend cycling exploration' },
    { id: 4, title: 'Hiking Trail', url: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&h=400&fit=crop', description: 'Mountain hiking adventure' },
  ],
}

// Navigation function
const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

// Components
const Navigation = () => (
  <nav className="flex gap-6" role="navigation" aria-label="Main navigation">
    <button
      onClick={() => scrollToSection('home')}
      className="text-sm font-medium transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md px-2 py-1"
    >
      Home
    </button>
    <button
      onClick={() => scrollToSection('about')}
      className="text-sm font-medium transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md px-2 py-1"
    >
      About
    </button>
    <button
      onClick={() => scrollToSection('portfolio')}
      className="text-sm font-medium transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md px-2 py-1"
    >
      Portfolio
    </button>
  </nav>
)

const SocialLink = ({ social }: { social: SocialLink }) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <a
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 text-xl md:text-lg transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md p-2"
          aria-label={social.label}
        >
          {social.icon}
          <span>{social.label}</span>
        </a>
      </TooltipTrigger>
      <TooltipContent>
        <span>{social.username}</span>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
)

const HeroSection = () => (
  <section id="home" className="min-h-screen flex flex-col items-center justify-center space-y-8 text-center px-4">
    <div className="space-y-4">
      <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight animate-pulse">
        Hello, I'm{' '}
        <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Wahidin
        </span>
        !
      </h1>
      
      <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl">
        I'm a <strong>Software Engineer</strong> passionate about building innovative solutions
        and creating exceptional digital experiences.
      </p>
    </div>

    <div className="flex flex-col sm:flex-row gap-4 items-center">
      {SOCIAL_LINKS.map((social) => (
        <SocialLink key={social.href} social={social} />
      ))}
    </div>
  </section>
)

const AboutSection = () => {
  const [selectedSport, setSelectedSport] = useState<string>('mini-soccer')

  return (
    <section id="about" className="min-h-screen py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">About Me</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Beyond coding, I'm passionate about sports and staying active. Here's a glimpse into my athletic pursuits and achievements.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <Card className="p-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span>🏈</span>
                Mini Soccer
              </CardTitle>
              <CardDescription>
                Passionate about team strategy and quick footwork in mini soccer matches.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                variant={selectedSport === 'mini-soccer' ? 'default' : 'outline'}
                onClick={() => setSelectedSport('mini-soccer')}
                className="w-full"
              >
                View Documentation
              </Button>
            </CardContent>
          </Card>

          <Card className="p-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span>�</span>
                Other Sports
              </CardTitle>
              <CardDescription>
                Exploring various sports activities including basketball, volleyball, cycling, and hiking.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                variant={selectedSport === 'other-sports' ? 'default' : 'outline'}
                onClick={() => setSelectedSport('other-sports')}
                className="w-full"
              >
                View Documentation
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {SPORTS_DOCUMENTATION[selectedSport]?.map((image) => (
            <Card key={image.id} className="overflow-hidden">
              <div className="aspect-square relative">
                <img
                  src={image.url}
                  alt={image.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-2">{image.title}</h3>
                <p className="text-sm text-muted-foreground">{image.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

const PortfolioSection = () => (
  <section id="portfolio" className="min-h-screen py-20 px-4">
    <div className="container mx-auto max-w-6xl">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">Portfolio</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Showcase of my ongoing and completed projects, demonstrating various technologies and development approaches.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-video bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
              </svg>
            </div>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold">{project.title}</h3>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  project.status === 'completed' 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                    : project.status === 'in-progress'
                    ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                    : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                }`}>
                  {project.status}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-1 mb-4">
                {project.tags.map((tag) => (
                  <span key={tag} className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <Button asChild size="sm" className="flex-1">
                  <a href={project.link} target="_blank" rel="noopener noreferrer">
                    View Project
                  </a>
                </Button>
                {project.sourceCode && (
                  <Button asChild variant="outline" size="sm">
                    <a href={project.sourceCode} target="_blank" rel="noopener noreferrer">
                      Code
                    </a>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </section>
)

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 p-3 rounded-full bg-primary text-primary-foreground shadow-lg transition-all duration-300 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 z-50 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
      }`}
      aria-label="Scroll to top"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"/>
      </svg>
    </button>
  )
}

function App() {
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'portfolio']
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            // You can add visual feedback here if needed
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold">Wahidin</h1>
          </div>
          
          <Navigation />
          
          <ModeToggle />
        </div>
      </header>

      <main>
        <HeroSection />
        <AboutSection />
        <PortfolioSection />
      </main>

      <footer className="border-t py-8">
        <div className="container mx-auto px-4 text-center">
          <span className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Wahidin. All rights reserved.
          </span>
        </div>
      </footer>

      <ScrollToTop />
    </ThemeProvider>
  )
}

export default App
