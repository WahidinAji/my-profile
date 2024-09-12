import {createLazyFileRoute, Link} from '@tanstack/react-router'
import {portfolio} from "@/data/portfolio.tsx";
import bg from "@/assets/images/bg.png";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

// import {  }

export const Route = createLazyFileRoute('/portfolio')({
    component: Portfolio,
})

function Portfolio() {

    return (
        <>
            <div className="max-w-screen-lg">
                <h1 className="text-2xl md:text-4xl lg:text-6xl text-center text-slate-900 dark:text-slate-100 animate-pulse">Portfolio</h1>
                <p className="text-xl md:text-lg px-4">
                    Here are some of my projects that I have made to show my projects and skills.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                    {portfolio.map((item, index) => (
                        <Card key={index} className="shadow-md rounded-md ">
                            <CardHeader className="pb-1">
                                <img src={bg} alt={item.title} className="w-full h-48 object-cover rounded-md"/>
                                <CardTitle>{item.title}</CardTitle>
                                <CardDescription>{item.description}</CardDescription>
                            </CardHeader>
                            <CardContent className="mb-0 pb-1">
                                <Link to={item.link} className="text-blue-500 dark:text-blue-300"
                                      target="_blank">View</Link>
                                {/*<p>Card Content</p>*/}

                            </CardContent>
                            <CardFooter className="grid grid-cols-2 gap-2 m-0 p-y-0">
                                {/*<p>Card Footer</p>*/}
                                {item.tags.map((tag, index) => (
                                    <span key={index}
                                          className="bg-blue-500 dark:bg-blue-300 text-white dark:text-black px-2 py-1 rounded-md text-xs">{tag}</span>
                                ))}
                            </CardFooter>
                        </Card>
                    ))}

                </div>

                {/*<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">*/}
                {/*    {portfolio.map((item, index) => (*/}
                {/*    <div key={index} className="bg-white dark:bg-slate-900 shadow-md rounded-md p-4">*/}
                {/*        <img src={bg} alt={item.title} className="w-full h-48 object-cover rounded-md"/>*/}
                {/*        <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">{item.title}</h3>*/}
                {/*        <p className="text-md text-slate-700 dark:text-slate-300">{item.description}</p>*/}
                {/*        <div className="flex justify-between items-center mt-2">*/}
                {/*        <a href={item.link} className="text-blue-500 dark:text-blue-300" target="_blank">View</a>*/}
                {/*        /!*<div className="flex gap-2">*!/*/}
                {/*        <div className="grid grid-cols-2 gap-2">*/}
                {/*            {item.tags.map((tag, index) => (*/}
                {/*            <span key={index} className="bg-blue-500 dark:bg-blue-300 text-white dark:text-black px-2 py-1 rounded-md text-sm">{tag}</span>*/}
                {/*            ))}*/}
                {/*        </div>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*    ))}*/}
                {/*</div>*/}

            </div>
            {/*<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 max-w-screen-md">*/}
            {/*    {data.map((item, index) => (*/}
            {/*    <div key={index} className="bg-white dark:bg-slate-900 shadow-md rounded-md p-4">*/}
            {/*        <img src={item.image} alt={item.title} className="w-full h-48 object-cover rounded-md"/>*/}
            {/*        <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">{item.title}</h3>*/}
            {/*        <p className="text-lg text-slate-700 dark:text-slate-300">{item.description}</p>*/}
            {/*        <div className="flex justify-between items-center mt-2">*/}
            {/*        <a href={item.link} className="text-blue-500 dark:text-blue-300" target="_blank">View</a>*/}
            {/*        <div className="flex gap-2">*/}
            {/*            {item.tags.map((tag, index) => (*/}
            {/*            <span key={index} className="bg-blue-500 dark:bg-blue-300 text-white dark:text-black px-2 py-1 rounded-md text-sm">{tag}</span>*/}
            {/*            ))}*/}
            {/*        </div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*    ))}*/}
            {/*</div>*/}
        </>
    )
}