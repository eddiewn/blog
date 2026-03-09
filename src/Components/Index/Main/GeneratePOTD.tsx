import { useEffect, useState } from "react";

const URL = "http://localhost:4000/api/get-blogs";

type post = {
    id: number,
    title: string,
    summary: string,
    content: string,
    cover_image_url: string
}


export const GeneratePOTD = () => {

    const [POTD, setPOTD] = useState<post>();

useEffect(() => {
    (async() => {
        try {
            const response = await fetch(URL);

            if(!response.ok) throw new Error("Failed to fetch Blogs");

            const data = await response.json();

            setPOTD(data.blogs[2])
            console.log(POTD)
            console.log(data.blogs[2])

        } catch (error) {
            alert(error)
    }
    })()
},[])
      if (!POTD) return <p>Loading...</p>;

    return(
        <>
            <article className="bg-gray-400 w-full p-3">
                <h2 className="">{POTD.title}</h2>
                <p>{POTD.summary}</p>
                <img src={POTD.cover_image_url} alt="" />
                <button className="btn mt-1">VIEW</button>
            </article>
        </>
    )
    

}