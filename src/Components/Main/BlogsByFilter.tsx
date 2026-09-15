import { getBlogs, getPostTags, fetchTags } from "../../api/api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { renderBlogs } from "../../utils/RenderBlogs";

type BlogsByFilterProps = {
    selectedTagId: number;
};

function BlogsByFilter({ selectedTagId }: BlogsByFilterProps) {
    const navigate = useNavigate();

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

    // console.log(blogs);
    // console.log(postTags);

    if (!blogs) return;

    return (
        <>
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-2">
                {blogs &&
                    renderBlogs(
                        blogs,
                        postTags,
                        tags,
                        (blog) =>
                            selectedTagId === 0 ||
                            postTags.some(
                                (postTag) =>
                                    postTag.post_id === blog.id &&
                                    postTag.tag_id === selectedTagId,
                            ),
                    )}
            </section>
            <button
                className="bg-blue-400 hover:bg-blue-600 text-white font-semibold px-5 py-2.5 rounded-lg transition-colors duration-200 w-fit mt-10"
                onClick={() => {
                    navigate("/view-blogs");
                }}
            >
                View Latest Posts
            </button>
        </>
    );
}

export default BlogsByFilter;
