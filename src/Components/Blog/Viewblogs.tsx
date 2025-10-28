import { useEffect, useState } from "react";

import Header from "../Header";
import Footer from "../Footer";
import BlogPreviewCard from "./BlogPreviewCard";

const Viewblogs = () => {

    type BlogType = {
        title: string;
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
                <main className="h-200">
                    {blogs?.map((blog) => {
                        return <BlogPreviewCard title={blog.title} />
                    })}
                </main>
            <Footer />
        </>
    )
}

export default Viewblogs;