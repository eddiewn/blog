type Props = {
    title: string;
}

const BlogPreviewCard = ({title}: Props) => {
    return(
        <h1>{title}</h1>
    )
}

export default BlogPreviewCard;