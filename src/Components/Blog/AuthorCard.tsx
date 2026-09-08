import profilePlaceholder from "../../Assets/images/blogPostProfilePlaceholder.webp"
import { useState, useEffect, useEffectEvent } from "react"

type AuthorCardProps={
    author_id: number | undefined
}

type AuthorProps={
    username: string;
    id: number;
    role: string;
}

function AuthorCard({author_id}: AuthorCardProps){

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

                console.log(data);
                setAuthor(data);
            } catch (error) {
                console.log(error);
            }
        };

        getAuthor();
    }, [author_id]);

    return(
        <>
            <section className="flex h-10 w-full gap-2">
                <div className="h-full aspect-square ">
                    <img className="rounded-full" src={profilePlaceholder} alt="" />
                </div>
                <div className="flex flex-col">
                    <div>
                        <p className="font-bold">{author !== undefined ? author.username : "John Doe"}</p>
                        <p className="opacity-50">January 1, 2000</p>
                    </div>
                </div>
            </section>
        </>
    )
}
export default AuthorCard;