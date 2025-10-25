import { useEffect, useState } from "react";
import Header from "../Header";
import { useNavigate } from "react-router";

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
            <main className="w-screen h-screen bg-green-300">
                <p>Welcome to admin page</p>

            </main>
        </>
    )
}

export default Createblog;