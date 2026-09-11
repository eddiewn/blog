import { getBlogs, getPostTags, fetchTags } from "../../api/api";
import { useEffect, useState } from "react";
import BlogPreviewCard from "../Blog/BlogPreviewCard";
import { useNavigate } from "react-router";


type BlogsByFilterProps = {
    selectedTagId: number;
};

function BlogsByFilter({ selectedTagId }: BlogsByFilterProps) {

    const navigate = useNavigate();


    type BlogType = {
        id: number;
        title: string;
        summary: string;
        cover_image_url: string;
        tags: string[];
    };

    type PostTagType = {
        tag_id: number;
        post_id: number;
    };

    type TagType = {
        id: number;
        name: string;
    }

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
        const fetch = async() => {
            try {
                const data = await  fetchTags();

                // console.log(data.rows)
                setTags(data.rows)
            } catch (error) {
                
            }
        }
        fetch();
    },[])

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
        <>
        <section className="grid grid-cols-1 gap-10">
            {blogs.map((blog) => {
                // console.log("Blog ID " + blog.id);
                // console.log("Selected Tag ID " + selectedTagId);


                const hasRelation = postTags.some((postTag) =>
                        postTag.post_id === blog.id &&
                        postTag.tag_id === selectedTagId,
                );

const tagNames = postTags
    .filter((postTag) => postTag.post_id === blog.id)
    .map((postTag) => {
        const tag = tags.find((tag) => tag.id === postTag.tag_id);
        return tag?.name;
    })
    .filter((name): name is string => name !== undefined);

                // console.log(tagNames)


                if (selectedTagId == 0) {
                    return <BlogPreviewCard
                        id={blog.id}
                        title={blog.title}
                        summary={blog.summary}
                        cover_image_url={blog.cover_image_url}
                        tags={tagNames}

                    />;
                } else if (hasRelation) {
                    return <BlogPreviewCard
                        id={blog.id}
                        title={blog.title}
                        summary={blog.summary}
                        cover_image_url={blog.cover_image_url} 
                        tags={tagNames}
                    />;                
                }
            })}

            <button
                onClick={() => {
                    navigate("/view-blogs");
                }}
            >
                View All Posts
            </button>
            </section>
        </>
    );
}

export default BlogsByFilter;
