import { useEffect, useState } from "react";

import Header from "../Header";
import Footer from "../Footer";



    const getBlogs = async() => {
        try {
            const URL = "http://localhost:4000/api/get-blogs";
            const response = await fetch(URL);

            const data = await response.json();

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            setBlogs(data.blogs)

        } catch (error) {
            console.log("Error: ", error)
        }
    }

const Viewblogs = () => {

    const [blogs, setBlogs] = useState<object | null>(null)

useEffect(() => {
    getBlogs();
},[])

    return(
        <>
            <Header />
            <main className="h-200">

            </main>
            <Footer />
        </>
    )
}

export default Viewblogs;