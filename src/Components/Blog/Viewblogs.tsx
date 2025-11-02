import { useEffect, useState } from "react";

import Header from "../Header";
import Footer from "../Footer";
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

        const getBlogs = async() => {
        try {
            const URL = "http://localhost:4000/api/get-blogs";
            const response = await fetch(URL);

            const data = await response.json();

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            setBlogs(data.blogs)

        } catch (error) {
            console.log("Error: ", error)
        }
    }


useEffect(() => {
    getBlogs();
},[])

    return(
        <>
            <Header />
                <main className="w-screen">
                    <div className="m-auto w-4/5 grid grid-cols-2">
                        {blogs?.map((blog) => {
                            return <BlogPreviewCard id={blog.id} title={blog.title} summary={blog.summary} cover_image_url={blog.cover_image_url}/>
                        })}
                    </div>
                </main>
            <Footer />
        </>
    )
}

export default Viewblogs;