import { createLazyFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createLazyFileRoute('/about')({
    component: About,
})

function About() {
    const [selectedSport, setSelectedSport] = useState<string | null>(null)

    // Mock documentation images data
    const sportsDocumentation = {
        'mini-soccer': [
            { id: 1, title: 'Team Match at Local Field', url: '/images/1725281319887.jpg', description: 'Playing with the local team' },
            { id: 2, title: 'Tournament Victory', url: '/images/1725281319887.jpg', description: 'Celebrating our championship win' },
            { id: 3, title: 'Training Session', url: '/images/1725281319887.jpg', description: 'Daily practice with teammates' },
            { id: 4, title: 'Community League', url: '/images/1725281319887.jpg', description: 'Participating in community events' },
            { id: 5, title: 'Community League', url: '/images/1725281319887.jpg', description: 'Participating in community events' },
        ],
        'swimming': [
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
        ]
    }

    const handleSportClick = (sportKey: string) => {
        setSelectedSport(selectedSport === sportKey ? null : sportKey)
    }
    return (
        <div className="max-w-screen-lg font-normal">
            <p>
                Hello there, I'm a Software Engineer who loves to build things and learn new things.
                I'm currently working as a Software Engineer at <a href="https://pandai.org" target="_blank" className='font-bold underline text-blue-600'>Pandai Education, Sdn Bhd</a>.
                {/* I'm currently working as a Software Engineer at <a href="https://www.linkedin.com/in/wahidinaji/" target="_blank">LinkedIn</a>. */}
                {/* I have a Bachelor's degree in Computer Science from <a href="https://www.uaeu.ac.ae/" target="_blank">UAE University</a>. */}
            </p>
            <br/>
            <p>
                I started programming when I was in University, and I've been programming ever since.
                The first programming language I learned was <a href="https://en.wikipedia.org/wiki/C_(programming_language)" target="_blank" className='font-bold underline text-blue-600'>C</a>.
                I've been programming in <a href="https://en.wikipedia.org/wiki/C_(programming_language)" target="_blank" className='font-bold underline text-blue-600'>C</a>, <a href="https://en.wikipedia.org/wiki/C%2B%2B" target="_blank" className='font-bold underline text-blue-600'>C++</a>, <a href="https://learn.microsoft.com/en-us/dotnet/csharp/" target="_blank" className='font-bold underline text-blue-600'>C#</a>, and <a href="https://en.wikipedia.org/wiki/SQL" target="_blank" className='font-bold underline text-blue-600'>SQL</a> in college.
                When I got my first job, My company was using <a href="https://laravel.com/" target="_blank" className='font-bold underline text-blue-600'>Laravel</a> and <a href="https://www.php.net/" target="_blank" className='font-bold underline text-blue-600'>PHP</a>.
                That's how I got into programming and I've been programming ever since.
            </p>
            <br/>
            <p>
                With 3 years of experience, I reliezed that programming languages are not the only thing that matters. The other important thing is what you do with your programming skills.
                Otherwise, programming languages are just a tool to help you do your job. Choosing the right programming language is not the same as choosing the right job.
                So, with that in mind, I can code in any language that I or my team wants to use. I've also been working with <a href="https://www.typescriptlang.org/" target="_blank" className='font-bold underline text-blue-600'>TypeScript</a>, <a href="https://en.wikipedia.org/wiki/JavaScript" target="_blank" className='font-bold underline text-blue-600'>JavaScript</a>, <a href="https://www.python.org/" target="_blank" className='font-bold underline text-blue-600'>Python</a>, and <a href="https://go.dev/" target="_blank" className='font-bold underline text-blue-600'>Go</a>.
                Lately, I'm falling in love with Open-Source projects and I'm always increasing my knowledge and skills in the field of Open-Source.
            </p>
            {/* <a href="https://github.com/WahidinAJi" target="_blank" className='font-bold underline text-blue-600'>Github</a> */}
            <br/>
            <p>
                Beyond coding, I also love staying active through sports! I particularly enjoy <span className='font-bold text-blue-600'>mini soccer</span>, <span className='font-bold text-blue-600'>swimming</span>, and other recreational activities. 
                Sports help me maintain a healthy work-life balance and keep my mind sharp for problem-solving.
            </p>
            <br/>
            
            {/* Sports Gallery Section */}
            <div className="mb-8">
                <h3 className="text-xl font-bold mb-4 text-center">My Sports & Activities</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Mini Soccer Card */}
                    <div 
                        onClick={() => handleSportClick('mini-soccer')}
                        className="group relative overflow-hidden rounded-lg bg-gradient-to-br from-green-400 to-blue-500 p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
                    >
                        <div className="flex items-center justify-center mb-4">
                            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                                    <circle cx="12" cy="12" r="11"/>
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM8 12c0-.55.45-1 1-1s1 .45 1 1-.45 1-1 1-1-.45-1-1zm8 0c0-.55.45-1 1-1s1 .45 1 1-.45 1-1 1-1-.45-1-1z" fill="none" stroke="currentColor" strokeWidth="2"/>
                                </svg>
                            </div>
                        </div>
                        <h4 className="text-lg font-semibold text-center mb-2">Mini Soccer</h4>
                        <p className="text-sm text-center opacity-90">Fast-paced fun with friends on smaller fields</p>
                        <p className="text-xs text-center mt-2 opacity-75">Click to see documentation</p>
                    </div>

                    {/* Swimming Card */}
                    <div 
                        onClick={() => handleSportClick('swimming')}
                        className="group relative overflow-hidden rounded-lg bg-gradient-to-br from-blue-400 to-cyan-500 p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
                    >
                        <div className="flex items-center justify-center mb-4">
                            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 2C8.13 2 5 5.13 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.87-3.13-7-7-7z"/>
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 14c.83 0 1.5-.67 1.5-1.5S8.83 11 8 11s-1.5.67-1.5 1.5S7.17 14 8 14z"/>
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 14c.83 0 1.5-.67 1.5-1.5S16.83 11 16 11s-1.5.67-1.5 1.5S15.17 14 16 14z"/>
                                </svg>
                            </div>
                        </div>
                        <h4 className="text-lg font-semibold text-center mb-2">Swimming</h4>
                        <p className="text-sm text-center opacity-90">Great cardio workout and relaxation</p>
                        <p className="text-xs text-center mt-2 opacity-75">Click to see documentation</p>
                    </div>

                    {/* Other Sports Card */}
                    <div 
                        onClick={() => handleSportClick('other-activities')}
                        className="group relative overflow-hidden rounded-lg bg-gradient-to-br from-purple-400 to-pink-500 p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
                    >
                        <div className="flex items-center justify-center mb-4">
                            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                                </svg>
                            </div>
                        </div>
                        <h4 className="text-lg font-semibold text-center mb-2">Other Activities</h4>
                        <p className="text-sm text-center opacity-90">Always exploring new ways to stay active</p>
                        <p className="text-xs text-center mt-2 opacity-75">Click to see documentation</p>
                    </div>
                </div>

                {/* Documentation Images Display */}
                {selectedSport && (
                    <div className="mt-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
                        <div className="flex justify-between items-center mb-4">
                            <h4 className="text-lg font-bold">
                                {selectedSport === 'mini-soccer' && 'Mini Soccer Documentation'}
                                {selectedSport === 'swimming' && 'Swimming Documentation'}
                                {selectedSport === 'other-activities' && 'Other Activities Documentation'}
                            </h4>
                            <button 
                                onClick={() => setSelectedSport(null)}
                                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                                </svg>
                            </button>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {sportsDocumentation[selectedSport as keyof typeof sportsDocumentation]?.map((image) => (
                                <div key={image.id} className="group relative">
                                    <div className="aspect-square bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-600 dark:to-gray-700 rounded-lg overflow-hidden">
                                        {/* Actual image thumbnail */}
                                        <img 
                                            src={image.url} 
                                            alt={image.title}
                                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                            onError={(e) => {
                                                // Fallback to placeholder if image fails to load
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
                                        {/* Overlay with image info */}
                                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex items-end">
                                            <div className="p-3 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <h5 className="font-semibold text-sm">{image.title}</h5>
                                                <p className="text-xs">{image.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        <div className="mt-4 text-center">
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                📸 Documentation images showcase my journey in {selectedSport.replace('-', ' ')}
                            </p>
                        </div>
                    </div>
                )}
                
                {/* Fun fact about sports */}
                <div className="mt-6 p-4 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-lg">
                    <p className="text-center text-sm italic">
                        💡 <strong>Fun fact:</strong> Playing sports helps me think more creatively when coding. 
                        The strategic thinking in mini soccer often translates to better problem-solving in development!
                    </p>
                </div>
            </div>

            <small>
                Sincerely,
                <br/>
                Wahidin Aji
            </small>
        </div>
    )
}
