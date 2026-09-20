import { useEffect, useState } from "react";
import { fetchUserInfo, getBlogs, getPostTags, fetchTags } from "../../api/api";
import { useParams } from "react-router";


import blogPostProfilePlaceholder from "../../Assets/images/blogPostProfilePlaceholder.webp";
import { renderBlogs } from "../../utils/RenderBlogs";

const Profile = () => {
    type userInfo = {
        username: string;
        display_name : string;
        id: number;
        bio: string;
        profile_pic_url: string;
    };

    const { id } = useParams();
    const userId = Number(id);

    const [userInfo, setUserInfo] = useState<userInfo>();

    useEffect(() => {
        const fetch = async () => {
            try {
                console.log(userId);
                const response = await fetchUserInfo(Number(userId));
                setUserInfo(response);
                console.log(response);
            } catch (error) {}
        };
        fetch();
    }, [userId]);

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
    const [loading, setLoading] = useState<boolean>(false);

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

    if (!userInfo) return <p>Loading...</p>;
    if (!blogs) return <p>Loading</p>;

    console.log(blogs)

    console.log(userInfo)
    return (
        <main className="m-auto">
            <section className=" bg-violet-200">
                <div className="pt-15 pb-30 w-6/7 lg:w-1/2 m-auto">
                    <div className="flex flex-col  lg:flex-row justify-center gap-10 h-full">
                        <img
                            className="h-40 w-40 rounded-full aspect-square border-2 border-violet-300 m-auto lg:m-0"
                            src={userInfo.profile_pic_url ? userInfo.profile_pic_url : blogPostProfilePlaceholder}
                            alt=""
                        />
                        <div className="flex flex-col gap-2 w-3/5">
                            <h1 className="text-3xl font-bold">{`${userInfo.display_name ? userInfo.display_name : userInfo.username}`}</h1>
                            <p className="opacity-65">{`${userInfo.bio ? userInfo.bio : "They dont say much about themself... but we are sure they are a great person."}`}</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="flex flex-col items-center">
                {blogs && (
                    <>
                        <h2 className="text-3xl pt-20 pb-10">
                            Posts by {userInfo.display_name ? userInfo.display_name : userInfo.username}
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-5 w-4/5 lg:w-3/5 pb-20">
                            {renderBlogs(
                                blogs,
                                postTags,
                                tags,
                                (blog) => blog.author_id === Number(userId),
                            )}
                        </div>
                    </>
                )}
            </section>
        </main>
    );
};
export default Profile;
