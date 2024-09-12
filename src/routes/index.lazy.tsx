import {createLazyFileRoute} from '@tanstack/react-router'
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip.tsx";

export const Route = createLazyFileRoute('/')({
    component: Index,
})

function Index() {
    return (
        // <div className="p-2">
        //     <h3>Welcome Home!</h3>
        // </div>
        <>
            {/* {
                        Array.from({length: 10}).map((_, i) => (
                            <h1 key={i} className="text-2xl md:text-4xl lg:text-6xl text-center text-slate-900 dark:text-slate-100 animate-pulse">Hello, I'm Wahidin!</h1>
                        ))
                    } */}

            <h1 className="text-2xl md:text-4xl lg:text-6xl text-center text-slate-900 dark:text-slate-100 animate-pulse">Hello,
                I'm Wahidin!</h1>
            <p className="text-xl md:text-lg">
                I'm a Software Engineer
            </p>
            <a href="https://github.com/WahidinAJi" className="text-xl md:text-lg" target="_blank">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                                <span className="flex justify-around items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="34"
                                         height="34" viewBox="0 0 24 24" fill="none"
                                         stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                         strokeLinejoin="round"
                                         className="lucide lucide-github">
                                        <path
                                            d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
                                        <path d="M9 18c-4.51 2-5-2-7-2"/>
                                    </svg>
                                    <span className="w-1"/>
                                    <p>Github Profile</p>
                                </span>
                        </TooltipTrigger>
                        <TooltipContent>
                            <span>@WahidinAji</span>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </a>
        </>
    )
}
