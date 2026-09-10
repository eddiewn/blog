import Aside from "./Aside/Aside";
import BlogsByFilter from "./BlogsByFilter";

import { useState } from "react";

const Main = () => {

    const [selectedTagId, setSelectedTagId] = useState<number>(0)
    
    return(
        <>
            <main className="flex flex-col lg:flex-row w-9/10 m-auto">
                    <Aside setSelectedTagId={setSelectedTagId} />
                <section className="w-full lg:w-3/4 p-5">
                <BlogsByFilter selectedTagId={selectedTagId}/>
                </section>
            </main>
        </>
    )
}

export default Main;