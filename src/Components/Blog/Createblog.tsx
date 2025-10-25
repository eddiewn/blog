import { useEffect, useState, useReducer } from "react";
import Header from "../Header";
import { useNavigate } from "react-router";
import ReactMarkdown from "react-markdown"
import Markdown from "react-markdown";

type Action = { 
    type: "SET_TITLE"; payload: string 
};

type State = { 
    title: string 
};

    const reducer = (state: State, action: Action) => {
        switch (action.type) {
            case "SET_TITLE":
                return { ...state, title: action.payload };     
            default:
                return state;
        }
    }

const Createblog = () => {


    
    const [auth, setAuth] = useState<boolean | null>(null)
    const navigate = useNavigate();
    
    const [state, dispatch] = useReducer(reducer, { title: "" });

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
            <main className="w-screen h-screen bg-green-300 flex gap-5" >
                <p>Welcome to Create blog page</p>
            <div>
                <section>
                    <h2>Title</h2>
                    <input type="text" onChange={(e) => {
                        dispatch({type: "SET_TITLE", payload: e.target.value})
                    }}/>
                    <h1>{state.title}</h1>
                </section>
            </div>
            <div>
                <h2>Preview</h2>
                <ReactMarkdown>
                    {state.title}
                </ReactMarkdown>
            </div>
            </main>
        </>
    )
}

export default Createblog;