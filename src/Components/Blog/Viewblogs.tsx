import { getBlogs, getPostTags, fetchTags } from "../../api/api";
import { useEffect, useState } from "react";
import BlogPreviewCard from "./BlogPreviewCard";

function ViewBlogs() {
    type BlogType = {
        id: number;
        title: string;
        summary: string;
        cover_image_url: string;
        tags: string[];
        author_id: number;
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

    const [page, setPage] = useState(1);


    useEffect(() => {
        const fetch = async () => {
            try {
                const data = await getBlogs(page, 6);

                setBlogs(data.blogs);
            } catch (error) {
                console.log(error);
            }
        };
        fetch();
    }, [page]);

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

    // console.log(blogs);
    // console.log(postTags);

    if (!blogs) return;

    return (
        <main className="min-h-[90vh] w-full md:w-4/5 md:m-auto lg:w-3/5 mt-20">
            <h1 className="text-3xl m-auto w-fit my-10">All Blog Posts</h1>
            <section className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-10 lg:gap-2">
                {blogs.map((blog) => {
                    // console.log("Blog ID " + blog.id);
                    // console.log("Selected Tag ID " + selectedTagId);

                    const tagNames = postTags
                        .filter((postTag) => postTag.post_id === blog.id)
                        .map((postTag) => {
                            const tag = tags.find(
                                (tag) => tag.id === postTag.tag_id,
                            );
                            return tag?.name;
                        })
                        .filter((name): name is string => name !== undefined);

                    console.log(tagNames);

                    return (
                        <>
                            <BlogPreviewCard
                                id={blog.id}
                                title={blog.title}
                                summary={blog.summary}
                                cover_image_url={blog.cover_image_url}
                                tags={tagNames}
                                author_id={blog.author_id}
                            />
                        </>
                    );
                })}
            </section>
            <div className="flex justify-center gap-5">
                <button onClick={() => {
                    setPage(page => page - 1)
                }}>Previous</button>
                <button onClick={() => {
                    setPage(page => page + 1)

                }}>Next</button>
            </div>
        </main>
    );
}

export default ViewBlogs;
