import { createLazyFileRoute } from '@tanstack/react-router'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

// Types
interface SocialLink {
  href: string
  label: string
  username: string
  icon: React.ReactNode
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

// Components
interface SocialLinkProps {
  social: SocialLink
}

const SocialLink = ({ social }: SocialLinkProps) => (
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
  <section className="flex flex-col items-center justify-center space-y-8 text-center min-h-[60vh]">
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

const HomePage = () => (
  <div className="container mx-auto px-4">
    <HeroSection />
  </div>
)

export const Route = createLazyFileRoute('/')({
  component: HomePage,
})
