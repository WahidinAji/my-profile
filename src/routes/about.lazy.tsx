import { createLazyFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { ChevronDown, ChevronUp, FileText, GitPullRequest, Star, Activity, Waves, Mountain, Bike, Dumbbell } from 'lucide-react'
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

interface OssRepo {
  name: string
  url: string
  stars: number
  prs: number[]
}

// Teknologi Umum: an Indonesian dev community — 26 merged PRs across these 6 repos, 2022–2025
const TEKNOLOGI_UMUM_REPOS: OssRepo[] = [
  { name: 'conference', url: 'https://github.com/teknologi-umum/conference', stars: 3, prs: [9, 10, 22, 42, 48, 56, 65, 74, 80, 94] },
  { name: 'blog', url: 'https://github.com/teknologi-umum/blog', stars: 24, prs: [72, 81, 82, 167, 171] },
  { name: 'tgif', url: 'https://github.com/teknologi-umum/tgif', stars: 2, prs: [5, 6, 7, 35, 51] },
  { name: 'bot', url: 'https://github.com/teknologi-umum/bot', stars: 23, prs: [200, 226] },
  { name: 'pehape', url: 'https://github.com/teknologi-umum/pehape', stars: 6, prs: [27, 34, 35] },
  { name: 'captcha', url: 'https://github.com/teknologi-umum/captcha', stars: 10, prs: [40] },
]

const OTHER_OSS_REPOS: OssRepo[] = [
  { name: 'can1357/oh-my-pi', url: 'https://github.com/can1357/oh-my-pi', stars: 32500, prs: [6363] },
  { name: 'rustrak/rustrak', url: 'https://github.com/rustrak/rustrak', stars: 149, prs: [146, 147] },
  { name: 'alexmacarthur/local-docker-db', url: 'https://github.com/alexmacarthur/local-docker-db', stars: 299, prs: [20] },
  { name: 'aldy505/jokes-bapak2', url: 'https://github.com/aldy505/jokes-bapak2', stars: 65, prs: [13] },
]

const formatStars = (stars: number) => (stars >= 1000 ? `${(stars / 1000).toFixed(1)}k` : String(stars))

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

const OssRepoRow = ({ repo }: { repo: OssRepo }) => (
  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1.5 py-2">
    <a
      href={repo.url}
      target="_blank"
      rel="noopener noreferrer"
      className="font-medium underline underline-offset-2 decoration-muted-foreground/50 hover:decoration-foreground transition-colors"
    >
      {repo.name}
    </a>
    <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
      <Star className="size-3" />
      {formatStars(repo.stars)}
    </span>
    <div className="flex flex-wrap gap-1.5">
      {repo.prs.map((pr) => (
        <a
          key={pr}
          href={`${repo.url}/pull/${pr}/commits`}
          target="_blank"
          rel="noopener noreferrer"
          title={`View commits for PR #${pr}`}
          className="rounded border px-1.5 py-0.5 text-xs text-muted-foreground hover:border-foreground hover:text-foreground transition-colors"
        >
          #{pr}
        </a>
      ))}
    </div>
  </div>
)

const OpenSourceSection = () => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <Card className="mt-12">
      <button
        onClick={() => setIsExpanded((prev) => !prev)}
        className="flex w-full items-center justify-between p-6 text-left transition-colors hover:bg-accent/50"
        aria-expanded={isExpanded}
        aria-controls="open-source-content"
      >
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-primary p-2 text-primary-foreground">
            <GitPullRequest className="size-5" />
          </div>
          <div>
            <CardTitle className="text-lg">Open Source Contributions</CardTitle>
            <CardDescription>Click to {isExpanded ? 'hide' : 'view'} what I've contributed</CardDescription>
          </div>
        </div>
        {isExpanded ? <ChevronUp className="size-5 text-muted-foreground" /> : <ChevronDown className="size-5 text-muted-foreground" />}
      </button>

      {isExpanded && (
        <CardContent id="open-source-content" className="pt-0">
          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-semibold">Teknologi Umum</h4>
              <p className="mb-1 text-sm text-muted-foreground">
                26 merged PRs across 6 repos in this Indonesian dev community, 2022–2025.
              </p>
              <div className="divide-y">
                {TEKNOLOGI_UMUM_REPOS.map((repo) => (
                  <OssRepoRow key={repo.name} repo={repo} />
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold">Other projects</h4>
              <p className="mb-1 text-sm text-muted-foreground">One-off merged contributions to public tools.</p>
              <div className="divide-y">
                {OTHER_OSS_REPOS.map((repo) => (
                  <OssRepoRow key={repo.name} repo={repo} />
                ))}
              </div>
            </div>
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
    <OpenSourceSection />
    <SportsSection />
  </div>
)

export const Route = createLazyFileRoute('/about')({
  component: AboutPage,
})
