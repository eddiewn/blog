type Props = {
    id: number;
    title: string;
    summary: string;
    cover_image: Blob;
}



const BlogPreviewCard = ({id, title, summary, cover_image}: Props) => {
    
    return(
        <article className="
        flex justify-center gap-2
        bg-white text-black">
            <p>{id}</p>
            <img src={cover_image} alt="" />
            <h1>{title}</h1>
            <p>{summary}</p>
            <button>View blog</button>
        </article>
    )
}

export default BlogPreviewCard;