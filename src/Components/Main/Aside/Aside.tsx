import { useState, useEffect } from "react";
import { fetchTags } from "../../../api/api";
import fuse from "fuse.js"

type AsideProps = {
    setSelectedTagId: (id: number) => void;
};

type TagObjectProps = {
    name: string;
    id: number;
};

const Aside = ({ setSelectedTagId }: AsideProps) => {
    const [firstTen, setFirstTen] = useState<TagObjectProps[]>([]);
    const [selectedTag, setSelectedTag] = useState<string>("All");

    useEffect(() => {
        const fetch = async () => {
            const data = await fetchTags();
            const tagsArray: TagObjectProps[] = [];

            for (let index = 0; index < data.rowCount; index++) {
                tagsArray.push(data.rows[index]);
            }

            console.log(tagsArray.slice(0, 6));
            setFirstTen(tagsArray.slice(0, 6));
        };
        fetch();
    }, []);

    return (
        <aside className="w-full lg:w-1/2 m-auto mt-10">
            <form className="flex items-center justify-center gap-5 mt-4 mx-auto" role="search">
            <h2>Search posts by tags</h2>
                <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-md bg-white outline-1 -outline-offset-1 outline-slate-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-blue-600 text-black">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 192.904 192.904"
                        className="size-4 fill-slate-400"
                        aria-hidden="true"
                    >
                        <path d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z"></path>
                    </svg>
                    <label htmlFor="search" className="sr-only">
                        Search
                    </label>
                    <input
                        type="search"
                        id="search"
                        placeholder="Search..."
                        required
                        className="text-sm text-slate-900 w-full outline-none"
                    />
                </div>
            </form>
            {/* <ul className="flex flex-col lg:flex-row items-center gap-7 text-3xl lg:text-base font-extrabold opacity-75 ">
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
            </ul> */}
        </aside>
    );
};

export default Aside;
