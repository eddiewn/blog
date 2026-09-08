import { useEffect, useState } from "react"
import ReactMarkdown from "react-markdown"

import AuthorCard from "./AuthorCard"

const Post = () => {

    type BlogType = {
        title: string,
        summary: string,
        content: string,
        cover_image_url: string | null;
        id: number;
        author_id: number | undefined;
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
            <main className="py-10 flex flex-col gap-10">
            <div className="w-full h-full">
                <div className="flex flex-col bg-white py-20 gap-10 text-black p-5">
                    <section className="flex flex-col gap-5">
                        <h1 className="text-4xl font-bold">{blog.title}</h1>
                        <p className="text-3xl w-4/5">{blog.summary}</p>
                        <AuthorCard author_id={blog.author_id}/>
                        <div className="w-full bg-gray-200 h-px my-10"></div>
                        {blog.cover_image_url !== null ? <img className="w-full mx-auto rounded-2xl" src={blog.cover_image_url} alt="" /> : ""}

                    </section>
                    <section className="text-lg opacity-80">
                        <ReactMarkdown >
                            {blog.content}
                        </ReactMarkdown>
                    </section>
                </div>
            </div>
            </main>
        </>
    )
}

export default Post;