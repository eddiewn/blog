type Props = {
    id: number;
    title: string;
    summary: string;
    cover_image: string;
}


// Kappa chungus life ändra databasen till att storea URL och lägg upp bilder någon annastans det var fucked att göra med BYTEA och BLOB.
// Skopna mig jag vill inte bli av med min streak ajg ska pusha en kommentar
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