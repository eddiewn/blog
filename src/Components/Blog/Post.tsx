import { useEffect } from "react"

import Header from "../Header"

const Post = () => {
    const getId = () => {
        const parameters = new URLSearchParams(window.location.search)
        return parameters.get("id")
    }

    const getPost = async() => {
        try {
            console.log(getId())
            const URL = `http://localhost:4000/posts?id=${getId()}`
            const response = await fetch(URL)

            const data = await response.json();
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getPost();
    },[])

    return(
        <>
        <Header/>
            <h1>Post baby</h1>
        </>
    )
}

export default Post;