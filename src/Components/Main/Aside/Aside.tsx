import { useState, useEffect } from "react"
import { fetchTags } from "../../../api/api";

type AsideProps = {
    setSelectedTagId: (id: number) => void;
};

type TagObjectProps = {
    name: string;
    id: number;
}

const Aside = ({setSelectedTagId}:AsideProps) => {


    const [firstTen, setFirstTen] = useState<TagObjectProps[]>([])
    const [selectedTag, setSelectedTag] = useState<string>("All")

    useEffect(() => {
        const fetch = async () => {
            const data = await fetchTags();
                const tagsArray: TagObjectProps[] = [];

                for (let index = 0; index < data.rowCount; index++) {
                    tagsArray.push(data.rows[index]);
                }

                console.log(tagsArray.slice(0, 6));
                setFirstTen(tagsArray.slice(0, 6))

        };
        fetch();
    },[])


    return (
        <aside className="w-full lg:w-1/2 m-auto mt-10">
                <ul className="flex flex-col lg:flex-row items-center gap-7 text-3xl lg:text-base font-extrabold opacity-75 ">
                    <li className={`${selectedTag == "All" ? "underline decoration-pink-300 underline-offset-10 hover:cursor-pointer" : "hover:cursor-pointer"}`
                }
                            onClick={() => {
                                setSelectedTag("All")
                                setSelectedTagId(0);
                            }}
                >All</li>
                {firstTen.map((tagObject:TagObjectProps) => {

                    console.log(tagObject)
                    return (
                        <li className={`${selectedTag == tagObject.name ? "hover:cursor-pointer underline decoration-pink-300 underline-offset-10" : "hover:cursor-pointer"}`}
                            onClick={() => {
                                setSelectedTag(tagObject.name)
                                setSelectedTagId(tagObject.id)
                            }}
                        >{tagObject.name}</li>
                    );
                })}
            </ul>
            {/* <button
                onClick={() => {
                    navigate("/view-blogs");
                }}
            >
                View Posts
            </button> */}
        </aside>
    );
};

export default Aside;
