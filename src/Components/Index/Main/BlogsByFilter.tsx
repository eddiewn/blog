import { getBlogs, getPostTags } from "../../../api/api";
import { useEffect, useState } from "react";

type BlogsByFilterProps = {
    selectedTagId: number;
};

function BlogsByFilter({ selectedTagId }: BlogsByFilterProps) {
    type BlogType = {
        id: number;
        title: string;
        summary: string;
        cover_image_url: string;
    };

    type PostTagType = {
        tag_id: number;
        post_id: number;
    };

    const [blogs, setBlogs] = useState<BlogType[] | null>(null);
    const [postTags, setPostTags] = useState<PostTagType[]>([]);

    useEffect(() => {
        const fetch = async () => {
            try {
                const data = await getBlogs();

                setBlogs(data.blogs);
                console.log(blogs);
            } catch (error) {
                console.log(error);
            }
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

    console.log(blogs);
    console.log(postTags);

    if (!blogs) return;

    return (
        <>
            {blogs.map((blog) => {
                console.log("Blog ID " + blog.id);
                console.log("Selected Tag ID " + selectedTagId);

                const hasRelation = postTags.some(
                    (postTag) =>
                        postTag.post_id === blog.id &&
                        postTag.tag_id === selectedTagId,
                );

                if (selectedTagId == 0) {
                    return <p>{blog.title}</p>;
                } else if (hasRelation) {
                    return <p>{blog.title}</p>;
                }
            })}
        </>
    );
}

export default BlogsByFilter;
