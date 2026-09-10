import { getBlogs } from "../../../api/api";
import { useEffect, useState } from "react";

function BlogsByFilter(){

    type BlogType = {
        id: number;
        title: string;
        summary: string;
        cover_image_url: string;   
    }

    const [blogs, setBlogs] = useState<BlogType[] | null>(null)

    useEffect(() => {
        const fetch = async() => {
            try {
                const data = await getBlogs();
                setBlogs(data.blogs);
                console.log(blogs)
            } catch (error) {
                console.log(error)
            }
        }
        fetch();
    },[])

    return(
        <>
            {blogs?.map((blog) => {
                return(
                    <p>{blog.title}</p>
                )
            })}
        </>
    )
}

export default BlogsByFilter;