import {useNavigate} from "react-router-dom";

type Props = {
    id: number;
    title: string;
    summary: string;
    cover_image_url: string;
    tags: string[];
};

const BlogPreviewCard = ({id, title, summary, cover_image_url, tags}: Props) => {
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
        <>
        <div className="m-auto w-4/5 h-px bg-black opacity-30"></div>
        <article
            className="w-10/10 flex flex-col  text-black rounded-xl shadow-md"
            onClick={() => {
                handlePostClick();
            }}
        >

            <img
                className="h-70 m-auto self-start w-full object-cover rounded-t-xl"
                src={cover_image_url}
                alt=""
            />
                            
                <div className="flex flex-col gap-5 p-5 text">    
                    {tags.map((tag) => {
                        return(<p>{tag}</p>)
                    }
                    )}        
                    <h1 className="text-2xl">{title}</h1>
                    <p className="text-stone-500">
                        {summary}
                    </p>
                    <button className="w-40">
                        Read Now
                    </button>
                </div>
        </article>
        </>
    );
};

export default BlogPreviewCard;
