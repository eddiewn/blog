import { useEffect, useState } from "react";
import { getBlogs } from "../../api/api";

import BlogPreviewCard from "./BlogPreviewCard";

const Viewblogs = () => {

    type BlogType = {
        id: number;
        title: string;
        summary: string;
        cover_image_url: string;   
    }

    const [blogs, setBlogs] = useState<BlogType[] | null>(null)

    console.log(blogs)




useEffect(() => {
    const fetch = async() => {
        try {
            const data = await getBlogs();
            setBlogs(data.blogs);
        } catch (error) {
            console.log(error)
        }
    }
    fetch();
},[])

    return(
        <>
                <main className="w-screen">
                    <div className="py-5 m-auto w-9/10 grid grid-cols-1 gap-5">
                        {blogs?.map((blog) => {
                            return <BlogPreviewCard id={blog.id} title={blog.title} summary={blog.summary} cover_image_url={blog.cover_image_url}/>
                        })}
                    </div>
                </main>
        </>
    )
}

export default Viewblogs;