import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/about')({
    component: About,
})

function About() {
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
            <small>
                Sincerely,
                <br/>
                Wahidin Aji
            </small>
        </div>
    )
}
