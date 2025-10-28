import { useEffect, useState } from "react";

import Header from "../Header";
import Footer from "../Footer";
import BlogPreviewCard from "./BlogPreviewCard";

const Viewblogs = () => {

    type BlogType = {
        id: number;
        title: string;
        summary: string;
        cover_image: Blob;
    }

    const [blogs, setBlogs] = useState<BlogType[] | null>(null)

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
                <main className="">
                    {blogs?.map((blog) => {
                        return <BlogPreviewCard id={blog.id} title={blog.title} summary={blog.summary} cover_image={blog.cover_image}/>
                    })}
                </main>
            <Footer />
        </>
    )
}

export default Viewblogs;