import profilePlaceholder from "../../Assets/images/blogPostProfilePlaceholder.webp"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router"
import { fetchUserInfo } from "../../api/api"

type AuthorCardProps={
    author_id: number | undefined
    created_at: string | undefined
}

type AuthorProps={
    username: string;
    id: number;
    role: string;
    display_name: string;
    profile_pic_url: string;
}

function AuthorCard({author_id, created_at}: AuthorCardProps){

    const [author, setAuthor] = useState<AuthorProps| undefined>(undefined);
        const navigate = useNavigate();


    useEffect(() => {
        console.log(author_id)
        if (author_id === null) return;

        const fetchAuthor = async() => {
            const data = await fetchUserInfo(Number(author_id))

            setAuthor(data); 
        }
        
        fetchAuthor();
    }, [author_id]);


    return(
        <>
            <section className={`flex ${created_at == undefined ? "h-7" : "h-15"} gap-2`}
                onClick={() => {
                    navigate(`/profile/${author_id}`)
                }}
            >
                <div className="h-full aspect-square">
                    <img className="rounded-full w-full h-full" src={author !== undefined && author.profile_pic_url ? author.profile_pic_url : profilePlaceholder} alt="" />
                </div>
                <div className="flex flex-col">
                    <div className="my-auto text-1xl">
                        <p className="font-bold">{author !== undefined ? (author.display_name ? author.display_name : author.username) : "John Doe"}</p>
                        <p className="opacity-50">{created_at !== undefined ? new Date(created_at).toLocaleString() : ""}</p>
                    </div>
                </div>
            </section>
        </>
    )
}
export default AuthorCard;