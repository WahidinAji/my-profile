import { createRootRouteWithContext, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { ThemeProvider } from '@/components/theme-provider'
import { ModeToggle } from '@/components/mode-toggle'
import { QueryClient } from '@tanstack/react-query'

// Types
interface RootRouteContext {
  queryClient: QueryClient
}

// Navigation items configuration
const NAVIGATION_ITEMS = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/portfolio', label: 'Portfolio' },
] as const

// Components
const Navigation = () => (
  <nav className="flex gap-6" role="navigation" aria-label="Main navigation">
    {NAVIGATION_ITEMS.map(({ to, label }) => (
      <Link
        key={to}
        to={to}
        className="text-sm font-medium transition-colors hover:text-primary [&.active]:font-bold [&.active]:text-primary"
        activeOptions={{ exact: to === '/' }}
      >
        {label}
      </Link>
    ))}
  </nav>
)

const Header = () => (
  <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
    <div className="container flex h-14 items-center justify-between px-4">
      <Navigation />
      <ModeToggle />
    </div>
  </header>
)

const Footer = () => (
  <footer className="border-t bg-background">
    <div className="container flex h-16 items-center justify-center px-4">
      <p className="text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} WahidinAji. All rights reserved.
      </p>
    </div>
  </footer>
)

const RootLayout = () => {
  const isDevMode = import.meta.env.DEV
  const showDevtools = isDevMode && import.meta.env.VITE_APP_DEBUG === 'true'

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-1 container mx-auto px-4 py-8">
          <Outlet />
        </main>
        
        <Footer />
        
        {showDevtools && <TanStackRouterDevtools position="bottom-right" />}
      </div>
    </ThemeProvider>
  )
}

export const Route = createRootRouteWithContext<RootRouteContext>()({
  component: RootLayout,
})

//
// export const Route = createRootRoute({
//     component: () => (
//         <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
//             <header className="min-h-[8vh] max-h-[10vh] flex flex-row items-center justify-around px-2 border-b">
//                 <div className="p-2 flex gap-6">
//                     <Link to="/" className="[&.active]:font-bold">
//                         Home
//                     </Link>{' '}
//                     <Link to="/about" className="[&.active]:font-bold">
//                         About
//                     </Link>
//                     <Link to="/portfolio" className={"[&.active]:font-bold"}>
//                         Portfolio
//                     </Link>
//                     <Link to="/notes_" className="[&.active]:font-bold">
//                         Notes
//                     </Link>
//                     <Link
//                         to={'/posts'}
//                         activeProps={{
//                             className: 'font-bold',
//                         }}
//                     >
//                         Posts
//                     </Link>
//                 </div>
//                 <ModeToggle />
//             </header>
//             <main
//                 className="min-h-[75vh] flex flex-col items-center justify-center space-y-4 font-mono font-semibold my-4">
//                 <Outlet/>
//             </main>
//             <footer className="flex items-center justify-center h-24 border-t">
//                 <span className="text-sm">
//                     {/*&copy; {new Date().getFullYear()} WahidinAji*/}
//                     &copy; 2024 WahidinAji
//                 </span>
//             </footer>
//             <TanStackRouterDevtools/>
//         </ThemeProvider>
//     ),
// })
