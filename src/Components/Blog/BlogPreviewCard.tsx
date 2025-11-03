import {useNavigate} from "react-router-dom";

type Props = {
    id: number;
    title: string;
    summary: string;
    cover_image_url: string;
};

const BlogPreviewCard = ({id, title, summary, cover_image_url}: Props) => {
    const navigate = useNavigate();

    //wtf
    function slugify(title: string) {
    return title
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/--+/g, '-');
    }

    const handlePostClick = () => {
        alert(`Will now take you to POST: ${id}`);
        const slugTitle = slugify(title)
        navigate(`/posts?id=${id}&title=${slugTitle}`);
    };

    return (
        <article
            className="w-9/10 flex justify-center gap-2 h-40 bg-white text-black"
            onClick={() => {
                handlePostClick();
            }}
        >
            <img
                className="h-full mr-auto self-start aspect-square object-cover"
                src={cover_image_url}
                alt=""
            />
            <div className="w-full">
                <h1 className="text-2xl">{title}</h1>
                <p>
                    {summary} id: {id}
                </p>
            </div>
        </article>
    );
};

export default BlogPreviewCard;
