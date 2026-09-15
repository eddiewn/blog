    import BlogPreviewCard from "../Components/Blog/BlogPreviewCard";
    
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


export const renderBlogs = (
    blogs: BlogType[],
    postTags: PostTagType[],
    tags: TagType[],
    filter: (blog: BlogType) => boolean
) => {
    return blogs
        .filter(filter)
        .map((blog) => {
            const tagNames = postTags
                .filter(
                    (postTag) =>
                        postTag.post_id === blog.id
                )
                .map((postTag) => {
                    const tag = tags.find(
                        (tag) => tag.id === postTag.tag_id
                    );

                    return tag?.name;
                })
                .filter(
                    (name): name is string =>
                        name !== undefined
                );

            return (
                <BlogPreviewCard
                    key={blog.id}
                    id={blog.id}
                    title={blog.title}
                    summary={blog.summary}
                    cover_image_url={blog.cover_image_url}
                    tags={tagNames}
                    author_id={blog.author_id}
                />
            );
        });
};