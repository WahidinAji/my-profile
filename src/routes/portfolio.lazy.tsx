import { createLazyFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { portfolio } from "@/data/portfolio.tsx";
import bg from "@/assets/images/bg.png";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

export const Route = createLazyFileRoute('/portfolio')({
    component: Portfolio,
})

function Portfolio() {
    const [selectedProject, setSelectedProject] = useState<string | null>(null)

    // Ongoing projects with documentation images
    const ongoingProjects = {
        'marketplace': [
            { id: 1, title: 'Homepage Design', url: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=400&fit=crop', description: 'Landing page with product showcase' },
            { id: 2, title: 'Product Catalog', url: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=400&fit=crop', description: 'Product listing and filtering system' },
            { id: 3, title: 'Shopping Cart', url: 'https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?w=400&h=400&fit=crop', description: 'Cart functionality and checkout process' },
            { id: 4, title: 'Admin Dashboard', url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=400&fit=crop', description: 'Backend management interface' },
        ],
        'chat-app': [
            { id: 1, title: 'Chat Interface', url: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=400&fit=crop', description: 'Real-time messaging interface' },
            { id: 2, title: 'User Authentication', url: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=400&fit=crop', description: 'Login and registration system' },
            { id: 3, title: 'File Sharing', url: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=400&h=400&fit=crop', description: 'Document and media sharing' },
            { id: 4, title: 'Group Chats', url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=400&fit=crop', description: 'Multi-user conversation rooms' },
        ],
        'blogs': [
            { id: 1, title: 'Blog Editor', url: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=400&fit=crop', description: 'Rich text editor for posts' },
            { id: 2, title: 'Comment System', url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=400&fit=crop', description: 'User engagement features' },
            { id: 3, title: 'SEO Optimization', url: 'https://images.unsplash.com/photo-1432888622747-4eb9a8c2da2e?w=400&h=400&fit=crop', description: 'Search engine optimization' },
            { id: 4, title: 'Content Management', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop', description: 'Post categorization and tagging' },
        ],
        'ai-chatbot-platform': [
            { id: 1, title: 'AI Chatbot Interface', url: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=400&h=400&fit=crop', description: 'Interactive chatbot with natural language processing' },
            { id: 2, title: 'Machine Learning Pipeline', url: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=400&fit=crop', description: 'AI model training and deployment system' },
            { id: 3, title: 'Knowledge Base Integration', url: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=400&h=400&fit=crop', description: 'Vector database for intelligent responses' },
            { id: 4, title: 'AI Analytics Dashboard', url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=400&fit=crop', description: 'Performance metrics and conversation insights' },
        ]
    }

    const handleProjectClick = (projectKey: string) => {
        setSelectedProject(selectedProject === projectKey ? null : projectKey)
    }

    const getProjectKey = (title: string) => {
        return title.toLowerCase().replace(/\s+/g, '-')
    }

    return (
        <>
            <div className="max-w-screen-lg">
                {/* <h1 className="text-2xl md:text-4xl lg:text-6xl text-center text-slate-900 dark:text-slate-100 animate-pulse">Portfolio</h1> */}
                <p className="text-xl md:text-lg px-4 mb-8 text-center">
                    Here are some projects I've worked on to highlight my skills.
                </p>

                {/* Completed Projects Section */}
                {/* <div className="mb-12">
                    <h2 className="text-2xl font-bold mb-6 text-center">Completed Projects</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                        {portfolio.map((item, index) => (
                            <Card key={index} className="shadow-md rounded-md hover:shadow-lg transition-shadow duration-300">
                                <CardHeader className="pb-1">
                                    <img src={bg} alt={item.title} className="w-full h-48 object-cover rounded-md" />
                                    <CardTitle>{item.title}</CardTitle>
                                    <CardDescription>{item.description}</CardDescription>
                                </CardHeader>
                                <CardContent className="mb-0 pb-1">
                                    <a href={item.link} className="text-blue-500 dark:text-blue-300 hover:underline"
                                        target="_blank" rel="noopener noreferrer">View Project</a>
                                </CardContent>
                                <CardFooter className="grid grid-cols-2 gap-2 m-0 py-2">
                                    {item.tags.map((tag, tagIndex) => (
                                        <span key={tagIndex}
                                            className="bg-blue-500 dark:bg-blue-300 text-white dark:text-black px-2 py-1 rounded-md text-xs text-center">{tag}</span>
                                    ))}
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </div> */}

                {/* Ongoing Projects Section */}
                <div className="mb-8">
                    <h2 className="text-2xl font-bold mb-6 text-center">Ongoing Projects</h2>
                    <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
                        Click on any project to see development documentation and progress images
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
                        {portfolio.map((item, index) => {
                            const projectKey = getProjectKey(item.title)
                            return (
                                <div 
                                    key={index}
                                    onClick={() => handleProjectClick(projectKey)}
                                    className="group relative overflow-hidden rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
                                >
                                    <div className="flex items-center justify-center mb-4">
                                        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
                                            </svg>
                                        </div>
                                    </div>
                                    <h3 className="text-lg font-semibold text-center mb-2">{item.title}</h3>
                                    <p className="text-sm text-center opacity-90 mb-2">{item.description.substring(0, 60)}...</p>
                                    <p className="text-xs text-center opacity-75">Click to see documentation</p>
                                    
                                    {/* Status badge */}
                                    <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs">
                                        In Progress
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                    {/* Project Documentation Display */}
                    {selectedProject && (
                        <div className="mt-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-xl font-bold">
                                    {portfolio.find(p => getProjectKey(p.title) === selectedProject)?.title} - Development Documentation
                                </h3>
                                <button 
                                    onClick={() => setSelectedProject(null)}
                                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                                    </svg>
                                </button>
                            </div>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                {ongoingProjects[selectedProject as keyof typeof ongoingProjects]?.map((image) => (
                                    <div key={image.id} className="group relative">
                                        <div className="aspect-square bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-600 dark:to-gray-700 rounded-lg overflow-hidden">
                                            <img 
                                                src={image.url} 
                                                alt={image.title}
                                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                                onError={(e) => {
                                                    const target = e.target as HTMLImageElement;
                                                    target.style.display = 'none';
                                                    const parent = target.parentElement;
                                                    if (parent && !parent.querySelector('.fallback-icon')) {
                                                        const fallback = document.createElement('div');
                                                        fallback.className = 'fallback-icon w-full h-full flex items-center justify-center text-gray-500 dark:text-gray-400';
                                                        fallback.innerHTML = `
                                                            <div class="text-center">
                                                                <svg class="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                                                                </svg>
                                                                <p class="text-xs">Image not found</p>
                                                            </div>
                                                        `;
                                                        parent.appendChild(fallback);
                                                    }
                                                }}
                                            />
                                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex items-end">
                                                <div className="p-3 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                    <h4 className="font-semibold text-sm">{image.title}</h4>
                                                    <p className="text-xs">{image.description}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            
                            <div className="mt-4 text-center">
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    🚀 Development progress and implementation details for {portfolio.find(p => getProjectKey(p.title) === selectedProject)?.title}
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}