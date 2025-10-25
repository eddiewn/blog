import React, { useEffect, useState } from "react";
import Header from "../Header";
import { useNavigate } from "react-router";
import ReactMarkdown from "react-markdown"

const Createblog = () => {

    const [auth, setAuth] = useState<boolean | null>(null)
    const navigate = useNavigate();

    useEffect(() => {
        const adminAuth = async () => {
            const URL = "http://localhost:4000/api/admin/enter-blog";
            try {
                const response = await fetch (URL, {
                    credentials: "include"
                })
                const data = await response.json();

                if(!response.ok || data.auth == false){
                    setAuth(false);
                    navigate("/");
                    return;
                }
                setAuth(true)

            } catch (error) {
                console.log(error)
                setAuth(false)
                navigate("/");
            }
        } 

        adminAuth();
    },[navigate])

    if (auth === null) return <p>Loading...</p>;

    if (!auth) return null;

    return(
        <>        
            <Header />        
            <main className="w-screen h-screen bg-green-300 flex flex-col gap-5" >
                <p>Welcome to Create blog page</p>
            <section>
                <h2>Title</h2>
                <ReactMarkdown>
                    First blogpost!
                </ReactMarkdown>
            </section>

            <section>
                <h2>Description</h2>
                <ReactMarkdown>
                    ***The description is very good***
                </ReactMarkdown>
            </section>
            <section>
                <h2>Introduction</h2>
                <ReactMarkdown>
                    *I am not introducting myself*
                </ReactMarkdown>
            </section>
            <section>
                <h2>Main Content</h2>
                <ReactMarkdown>
                    **Yada yada yada**
                </ReactMarkdown>
            </section>
            </main>
        </>
    )
}

export default Createblog;