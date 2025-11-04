import { useEffect, useState } from "react"

import Header from "../Header"

const Post = () => {

    type BlogType = {
        title: string,
        summary: string,
        content: string,
        cover_image_url: string;
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
            setBlog(data[0])
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
        <main className="p-10 flex flex-col gap-10">
            <section>
                <div className="flex h-100 bg-white text-black">
                    <img className="h-full aspect-square object-cover" src={blog.cover_image_url} alt="" />
                    <div>
                        <h1>{blog.title}</h1>
                        <p>{blog.summary}</p>
                    </div>
                </div>
            </section>
            <section>
                {blog.content}
            </section>
        </main>

        </>
    )
}

export default Post;