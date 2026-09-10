import { useNavigate } from "react-router";
import { useState, useEffect } from "react"
import { fetchTags } from "../../../../api/api";

const Aside = () => {

    const navigate = useNavigate();

    const [firstTen, setFirstTen] = useState<string[]>([])
    const [selectedTag, setSelectedTag] = useState<string>("All")

    useEffect(() => {
        const fetch = async () => {
            const tags = await fetchTags();
            setFirstTen(tags.slice(1, 6));

            console.log(firstTen);
        };

        fetch();
    },[])


    return (
        <aside className=" w-full mt-10">
                <ul className="flex flex-col items-center gap-7 text-3xl font-extrabold opacity-75">
                    <li className={`${selectedTag == "All" ? "underline decoration-pink-300 underline-offset-10" : ""}`
                }
                            onClick={() => {
                                setSelectedTag("All")
                            }}
                >All</li>
                {firstTen.map((tag:string) => {
                    return (
                        <li className={`${selectedTag == tag ? "underline decoration-pink-300 underline-offset-10" : ""}`}
                            onClick={() => {
                                setSelectedTag(tag)
                            }}
                        >{tag}</li>
                    );
                })}
            </ul>
            <button
                onClick={() => {
                    navigate("/view-blogs");
                }}
            >
                View Posts
            </button>
        </aside>
    );
};

export default Aside;
