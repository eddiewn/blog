import { useEffect, useState } from "react";
import { fetchUserInfo, getBlogs, getPostTags, fetchTags } from "../../api/api";
import BlogPreviewCard from "../Blog/BlogPreviewCard";

import blogPostProfilePlaceholder from "../../Assets/images/blogPostProfilePlaceholder.webp"
import { renderBlogs } from "../../utils/RenderBlogs";

const Profile = () => {
    type userInfo = {
        username: string;
        id: number;
        bio: string;
    }

    const [userInfo, setUserInfo] = useState<userInfo>();
        const userId = window.location.pathname.slice(9)

    useEffect(() => {


        const fetch = async() =>{
            try {
                console.log(userId)
                const response = await fetchUserInfo(Number(userId));
                setUserInfo(response)
                console.log(response)
            } catch (error) {
                
            }
        }
        fetch();
    },[])

        type BlogType = {
            id: number;
            title: string;
            summary: string;
            cover_image_url: string;
            tags: string[];
            author_id: number | undefined;
        };
    
        type PostTagType = {
            tag_id: number;
            post_id: number;
        };
    
        type TagType = {
            id: number;
            name: string;
        };
    
        const [blogs, setBlogs] = useState<BlogType[] | null>(null);
        const [postTags, setPostTags] = useState<PostTagType[]>([]);
        const [tags, setTags] = useState<TagType[]>([]);
    
        useEffect(() => {
            const fetch = async () => {
                try {
                    const data = await getBlogs();
    
                    setBlogs(data.blogs);
                } catch (error) {
                    console.log(error);
                }
            };
            fetch();
        }, []);
    
        useEffect(() => {
            const fetch = async () => {
                try {
                    const data = await fetchTags();
    
                    // console.log(data.rows)
                    setTags(data.rows);
                } catch (error) {}
            };
            fetch();
        }, []);
    
        useEffect(() => {
            const fetch = async () => {
                try {
                    const data = await getPostTags();
    
                    setPostTags(data);
                } catch (error) {
                    console.log(error);
                }
            };
            fetch();
        }, []);


    if(!userInfo)return <p>Loading...</p>

    return(
        <main className="w-4/5 m-auto">
            <section>
                <div className="flex ">
                    <img className="h-10 rounded-full aspect-square" src={blogPostProfilePlaceholder} alt="" />
                    <h1>{`${userInfo?.username}`}</h1>
                </div>
                <p>{`${userInfo.bio ? userInfo.bio : "They dont say much about themself... but we are sure they are a great person."}`}</p>
            </section>
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-2">
             {blogs && renderBlogs(blogs, postTags, tags, (blog) => blog.author_id === Number(userId))}
            </section>
        </main>
    )
}
export default Profile;