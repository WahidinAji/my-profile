import {createRootRouteWithContext, Link, Outlet} from '@tanstack/react-router'
import {TanStackRouterDevtools} from '@tanstack/router-devtools'
import {ThemeProvider} from "@/components/theme-provider"
import {ModeToggle} from "@/components/mode-toggle";
import {QueryClient} from '@tanstack/react-query'

export const Route = createRootRouteWithContext<{
    queryClient: QueryClient
}>()({
    component: RootComponent,
})

function RootComponent() {
    const appDebug = import.meta.env.DEV && import.meta.env.VITE_APP_DEBUG === 'true';
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <header className="min-h-[8vh] max-h-[10vh] flex flex-row items-center justify-around px-2 border-b">
                <div className="p-2 flex gap-6">
                    <Link to="/" className="[&.active]:font-bold">
                        Home
                    </Link>
                    <Link to="/about" className="[&.active]:font-bold">
                        About
                    </Link>
                    <Link to="/portfolio" className={"[&.active]:font-bold"}>
                        Portfolio
                    </Link>
                </div>
                <ModeToggle/>
            </header>
            <main
                className="min-h-[75vh] flex flex-col items-center justify-center space-y-4 font-mono font-semibold my-4">
                {/*className="min-h-[75vh] flex flex-col items-center justify-center space-y-4 font-mono font-semibold my-4">*/}
                <Outlet/>
            </main>
            <footer className="flex items-center justify-center h-24 border-t">
                <span className="text-sm">
                    {/*&copy; {new Date().getFullYear()} WahidinAji*/}
                    &copy; 2024 WahidinAji
                </span>
            </footer>
            {appDebug && <TanStackRouterDevtools/>}
        </ThemeProvider>
    );
}

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
