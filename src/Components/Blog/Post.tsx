import { useEffect, useState } from "react"

import Header from "../Header"
import Footer from "../Footer"

const Post = () => {

    type BlogType = {
        title: string,
        summary: string,
        content: string,
        cover_image_url: string | null;
        id: number;
    }
    
    const [blog, setBlog] = useState<BlogType | null>()

    const getId = () => {
        const parameters = new URLSearchParams(window.location.search)
        return parameters.get("id")
    }

    const getPost = async() => {
        try {
            console.log(getId())
            const URL = `http://localhost:4000/posts?id=${getId()}`
            const response = await fetch(URL)

            const data = await response.json();
            setBlog(data)
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getPost();
    },[])

    if(blog === null) return (<>No blogpost</>)

    if(blog === undefined) return

    return(
        <>
            <Header/>
            <main className="px-100 py-10 flex flex-col gap-10">
                <section>
                    <div className="flex items-center gap-5 h-100 text-white">
                        {blog.cover_image_url !== null ? <img className="h-full aspect-square object-cover" src={blog.cover_image_url} alt="" /> : ""}
                        <div className="flex flex-col gap-4">
                            <h1 className="text-4xl font-bold">{blog.title}</h1>
                            <p>{blog.summary}</p>
                        </div>
                    </div>
                </section>
                <section>
                    {blog.content}
                </section>
                <section>
                    <h2>Comment section</h2>
                </section>
            </main>
            <Footer />
        </>
    )
}

export default Post;