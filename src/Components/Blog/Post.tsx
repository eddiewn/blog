import { useEffect, useState } from "react"
import ReactMarkdown from "react-markdown"
import { fetchPost } from "../../api/api";

import AuthorCard from "./AuthorCard"

const Post = () => {

    type BlogType = {
        title: string,
        summary: string,
        content: string,
        cover_image_url: string | null;
        id: number;
        author_id: number | undefined;
        created_at: string;
    }
    

    const [blog, setBlog] = useState<BlogType | null>()
    console.log(blog)

    const getId = () => {
        const parameters = new URLSearchParams(window.location.search)
        return parameters.get("id")
    }



    const getPost = async() => {
        try {
            const id = getId();
            if(!id){
                throw ("Error fetching post");
            }
                const data = await fetchPost(Number(id))
                setBlog(data)

        } catch (error) {
            console.log("Error fetching post")
        }
    }

    useEffect(() => {
        getPost();
    },[])

    if(blog === null) return (<>No blogpost</>)

    if(blog === undefined) return

    return(
        <>
            <main className="py-10 flex flex-col gap-10 min-h-screen">
            <div className="w-full md:w-4/5 md:m-auto lg:w-3/6 h-full">
                <div className="flex flex-col bg-white py-20 gap-10 text-black p-5">
                    <section className="flex flex-col gap-5">
                        <h1 className="text-4xl font-bold">{blog.title}</h1>
                        <AuthorCard author_id={blog.author_id} created_at={blog.created_at}/>
                        <div className="w-full bg-gray-200 h-px my-10"></div>
                        {blog.cover_image_url !== null ? <img className=" max-h-200 w-auto h-auto object-cover mx-auto rounded-2xl" src={blog.cover_image_url} alt="" /> : ""}
                    </section>
                    <section className="text-lg opacity-80">
                        <ReactMarkdown 
                                                components={{
                            h1: ({ children }) => (
                                <h1 className="text-4xl font-bold mt-8 mb-4">
                                    {children}
                                </h1>
                            ),
                            h2: ({ children }) => (
                                <h2 className="text-3xl font-bold mt-8 mb-4">
                                    {children}
                                </h2>
                            ),
                            h3: ({ children }) => (
                                <h3 className="text-2xl font-bold mt-6 mb-3">
                                    {children}
                                </h3>
                            ),
                            p: ({ children }) => (
                                <p className="mb-4">
                                    {children}
                                </p>
                            ),
                            ul: ({ children }) => (
                                <ul className="list-disc ml-6 mb-4">
                                    {children}
                                </ul>
                            ),
                            ol: ({ children }) => (
                                <ol className="list-decimal ml-6 mb-4">
                                    {children}
                                </ol>
                            ),
                            li: ({ children }) => (
                                <li className="mb-1">
                                    {children}
                                </li>
                            ),
                            pre:({children}) => (
                                <pre className="bg-gray-300 p-5 w-fit rounded-xl  border-purple-700 border-2">
                                    {children}
                                </pre>
                            )
                        }}>
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