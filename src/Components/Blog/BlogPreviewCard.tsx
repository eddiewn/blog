import {useNavigate} from "react-router-dom";
import AuthorCard from "./AuthorCard";

type Props = {
    id: number;
    title: string;
    summary: string;
    cover_image_url: string;
    tags: string[];
    author_id: number | undefined;
};

const BlogPreviewCard = ({id, title, summary, cover_image_url, tags, author_id}: Props) => {

    console.log(tags)
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
        // alert(`Will now take you to POST: ${id}`);
        const slugTitle = slugify(title)
        navigate(`/posts?id=${id}&title=${slugTitle}`);
    };

    return (
        <>
        <article
            className="group hover:shadow-xl w-full flex flex-col bg-white text-black transition-all duration-300 rounded-xl shadow-xs
            hover:-translate-y-1
            "
            onClick={() => {
                handlePostClick();
            }}
        >
            <div className="overflow-hidden rounded-t-xl">
            <img
                className="group-hover:scale-105 transition-transofmr duration-200 h-70 m-auto self-start w-full object-cover "
                src={cover_image_url}
                alt=""
            />
            </div>
                            
                <div className="flex flex-col gap-5 p-5 text">    
                    {tags.map((tag) => {
                        return(<p className="bg-blue-400 rounded p-2 uppercase font-bold w-fit text-white">{tag}</p>)
                    }
                    )}        
                    <h1 className="text-2xl">{title}</h1>
                    <p className="text-stone-500">
                        {summary}
                    </p>
                </div>
                <hr className="m-auto w-4/5 opacity-10 mt-5"/>
                <div className="text-xs font-extralight p-5">
                    <AuthorCard author_id={author_id} created_at={undefined} />
                </div>
        </article>
        </>
    );
};

export default BlogPreviewCard;
