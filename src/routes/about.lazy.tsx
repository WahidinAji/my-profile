import { createLazyFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { ChevronDown, ChevronUp, FileText, Activity, Waves, Mountain, Bike, Dumbbell } from 'lucide-react'
import cvPdf from '../assets/cv.pdf'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

// Constants
const ACTIVITIES: { label: string; icon: React.ReactNode }[] = [
  { label: 'Mini Soccer', icon: <Activity className="size-3.5" /> },
  { label: 'Swimming', icon: <Waves className="size-3.5" /> },
  { label: 'Hiking', icon: <Mountain className="size-3.5" /> },
  { label: 'Cycling', icon: <Bike className="size-3.5" /> },
  { label: 'Basketball', icon: <Dumbbell className="size-3.5" /> },
]

// Utility Functions
const createExternalLink = (href: string, text: string) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="font-medium underline underline-offset-2 decoration-muted-foreground/50 hover:decoration-foreground transition-colors"
  >
    {text}
  </a>
)

// Components
const ProfessionalBio = () => (
  <section className="prose prose-lg dark:prose-invert max-w-none">
    <div className="space-y-6">
      <p>
        I'm a Software Engineer currently working at {createExternalLink('https://pandai.org', 'Pandai Education, Sdn Bhd')}.
        I picked up programming in university, starting with {createExternalLink('https://en.wikipedia.org/wiki/C_(programming_language)', 'C')}, {createExternalLink('https://en.wikipedia.org/wiki/C%2B%2B', 'C++')}, {createExternalLink('https://learn.microsoft.com/en-us/dotnet/csharp/', 'C#')}, and {createExternalLink('https://en.wikipedia.org/wiki/SQL', 'SQL')}.
        My first job ran on {createExternalLink('https://laravel.com/', 'Laravel')} and {createExternalLink('https://www.php.net/', 'PHP')}, and I've been building things professionally ever since.
      </p>

      <p>
        A few years in, I stopped thinking of any one language as "my language" — these days I reach for
        whatever the team and the problem call for, most often {createExternalLink('https://www.typescriptlang.org/', 'TypeScript')}, {createExternalLink('https://www.python.org/', 'Python')}, and {createExternalLink('https://go.dev/', 'Go')}.
        Lately I've been spending a lot of that time contributing to and building open-source projects.
      </p>

      <p>
        Outside of code, I stay active with sports — it's a good counterbalance to sitting in front of a screen all day.
      </p>
    </div>
  </section>
)

const CVSection = () => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <Card className="mt-12">
      <button
        onClick={() => setIsExpanded((prev) => !prev)}
        className="flex w-full items-center justify-between p-6 text-left transition-colors hover:bg-accent/50"
        aria-expanded={isExpanded}
        aria-controls="cv-iframe-container"
      >
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-primary p-2 text-primary-foreground">
            <FileText className="size-5" />
          </div>
          <div>
            <CardTitle className="text-lg">View My CV</CardTitle>
            <CardDescription>Click to {isExpanded ? 'hide' : 'view'} my curriculum vitae</CardDescription>
          </div>
        </div>
        {isExpanded ? <ChevronUp className="size-5 text-muted-foreground" /> : <ChevronDown className="size-5 text-muted-foreground" />}
      </button>

      {isExpanded && (
        <CardContent id="cv-iframe-container" className="pt-0">
          <div className="overflow-hidden rounded-lg border">
            <iframe src={cvPdf} title="Curriculum Vitae" className="h-[700px] w-full border-0" loading="lazy" />
          </div>
        </CardContent>
      )}
    </Card>
  )
}

const SportsSection = () => (
  <section className="mt-12">
    <CardHeader className="px-0">
      <CardTitle className="text-xl">Sports & Activities</CardTitle>
      <CardDescription>Things I do to stay off the screen for a while</CardDescription>
    </CardHeader>

    <div className="flex flex-wrap gap-2">
      {ACTIVITIES.map((activity) => (
        <Badge key={activity.label} variant="secondary" className="gap-1.5 py-1.5 px-3 text-sm font-normal">
          {activity.icon}
          {activity.label}
        </Badge>
      ))}
    </div>
  </section>
)

// Main Component
const AboutPage = () => (
  <div className="max-w-4xl mx-auto px-4 py-8">
    <ProfessionalBio />
    <CVSection />
    <SportsSection />
  </div>
)

export const Route = createLazyFileRoute('/about')({
  component: AboutPage,
})
