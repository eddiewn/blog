type Props = {
    id: number;
    title: string;
    summary: string;
    cover_image_url: string;
}


// Kappa chungus life ändra databasen till att storea URL och lägg upp bilder någon annastans det var fucked att göra med BYTEA och BLOB.
// Skopna mig jag vill inte bli av med min streak ajg ska pusha en kommentar



const BlogPreviewCard = ({id, title, summary, cover_image_url}: Props) => {

    const handlePostClick = () => {
        alert(`Will now take you to POST: ${id}`)
    }

    return(
        <article className="w-9/10 flex justify-center gap-2 h-40 bg-white text-black"
        onClick={() => {
            handlePostClick();
        }}
        >
            <img className="h-full mr-auto self-start aspect-square object-cover" src={cover_image_url} alt="" />
            <div className="w-full">
                <h1 className="text-2xl">{title}</h1>
                <p>{summary} id: {id}</p>
            </div>
        </article>
    )
}

export default BlogPreviewCard;