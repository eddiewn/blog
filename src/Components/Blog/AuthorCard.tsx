import profilePlaceholder from "../../Assets/images/blogPostProfilePlaceholder.webp"
import { useState, useEffect } from "react"

type AuthorCardProps={
    author_id: number | undefined
    created_at: string | undefined
}

type AuthorProps={
    username: string;
    id: number;
    role: string;
    display_name: string;
}

function AuthorCard({author_id, created_at}: AuthorCardProps){

    const [author, setAuthor] = useState<AuthorProps| undefined>(undefined);

    useEffect(() => {
        if (author_id === null) return;

        const getAuthor = async () => {
            try {
                const URL = `http://localhost:4000/api/author?author_id=${author_id}`;

                const response = await fetch(URL);

                if (!response.ok) {
                    throw new Error(`HTTP error: ${response.status}`);
                }

                const data = await response.json();

                console.log("Is this NAN?", data);
                setAuthor(data);
            } catch (error) {
                console.log(error);
            }
        };

        getAuthor();
    }, [author_id]);

    return(
        <>
            <section className={`flex ${created_at == undefined ? "h-7" : "h-15"} gap-2`}>
                <div className="h-full aspect-square">
                    <img className="rounded-full" src={profilePlaceholder} alt="" />
                </div>
                <div className="flex flex-col">
                    <div className="my-auto text-1xl">
                        <p className="font-bold">{author !== undefined ? (author.display_name ? author.display_name : author.username) : "John Doe"}</p>
                        <p className="opacity-50">{created_at !== undefined ? new Date(created_at).toLocaleString() : "01-09-24 00:00:00"}</p>
                    </div>
                </div>
            </section>
        </>
    )
}
export default AuthorCard;