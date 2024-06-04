import { ThemeProvider } from "./components/custom/theme-provider";
import { ModeToggle } from "./components/custom/mode-toggle";

export default function Home() {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
                <header className="flex flex-row justify-end p-5 mb-5">
                    <ModeToggle />
                </header>
            <main className="flex justify-center align-middle no-scrollbar">
                <h1 className="animate-pulse text-2xl md:text-4xl lg:text-6xl font-mono font-semibold text-center text-slate-900 dark:text-slate-100">
                    Hi, I'm Wahidin!
                </h1>
            </main>
            <footer className="sticky"></footer>
        </ThemeProvider>
    )
}
