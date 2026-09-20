// import Aside from "./Aside/Aside";
import BlogsByFilter from "./BlogsByFilter";

import { useState } from "react";

const Main = () => {

    const [selectedTagId, setSelectedTagId] = useState<number>(0)
    
    return(
        <>
            <main className="flex flex-col gap-10 w-9/10 m-auto my-5">
                {/* <Aside setSelectedTagId={setSelectedTagId} /> */}
                <section className="w-full md:w-4/5 md:m-auto lg:w-3/5 mt-20">
                <h2 className="text-5xl my-10 font-bold">Latest Posts</h2>
                    <BlogsByFilter selectedTagId={selectedTagId}/>
                </section>
            </main>
        </>
    )
}

export default Main;