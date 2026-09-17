import { useContext, useEffect, useState, useReducer } from "react";
import { useNavigate } from "react-router";
import ReactMarkdown from "react-markdown"
import UserContext from "../../context/UserContext";
import AuthorCard from "./AuthorCard";
import { fetchTags } from "../../api/api";

import placeHolderBlogImg from "../../Assets/images/blogPostImagePlaceholder.jpg"

type Action = 
    {type: "SET_TITLE"; payload: string}
    |
    {type: "SET_SUMMARY"; payload: string}    
    |
    {type: "SET_MAIN"; payload: string}
    |
    {type: "SET_COVER_IMAGE"; payload: File | null}

type State = { 
    title: string,
    summary: string,
    main: string,
    cover_image: File | null,
};


    const reducer = (state: State, action: Action) => {
        switch (action.type) {
            case "SET_TITLE":
                return { ...state, title: action.payload };    
            case "SET_SUMMARY":
                return {...state, summary: action.payload};
            case "SET_MAIN":
                return {...state, main: action.payload};
            case "SET_COVER_IMAGE":
                return {...state, cover_image: action.payload};
 
            default:
                return state;
        }
    }

const Createblog = () => {
            const { user } = useContext(UserContext);
    const [auth, setAuth] = useState<boolean | null>(null)

    const [tags, setTags] = useState<string[]>([""])
    const [addedTags, setAddedTags] = useState<string[]>([])

    const navigate = useNavigate();
    
    const [state, dispatch] = useReducer(reducer, { 
        title: "",
        summary: "",
        main: "",
        cover_image: null,
    });

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

    useEffect(() => {
        const getTags = async () => {
            try {
                const data = await fetchTags();
                const tagsArray: string[] = [];

                for (let index = 0; index < data.rowCount; index++) {
                    tagsArray.push(data.rows[index].name);
                }

                console.log(tagsArray);
                setTags(tagsArray);
            } catch (error) {
                
            }
        }
        getTags();
    },[])



    useEffect(() => {
        console.log(addedTags)
    },[addedTags])

    useEffect(() => {
        console.log(state)
    },[state])

    const handleAddTag = (tag: string) => {
        if(addedTags.some((arrayTag) => arrayTag === tag)) return;
        setAddedTags((prev) => [...prev, tag])
    }

    const handleRemoveTag = (addedTag: string) => {
        setAddedTags((prev) => prev.filter((tag) => tag !== addedTag));
    };

    const handleCreateBlog = async() => {
        console.log(addedTags)
        try {
            const URL = "http://localhost:4000/api/admin/create-blog"



            const formData = new FormData();
            formData.append("title", state.title)
            formData.append("summary", state.summary)
            formData.append("content", state.main)
            formData.append("tags", JSON.stringify(addedTags));


            if(!user) return



            formData.append("author_id", String(user.id))
            if (state.cover_image) {
                formData.append("cover_image", state.cover_image);
            }

            for (const [key, value] of formData.entries()) {
                if (typeof value === "string" && value.trim() === "") {
                    return alert(`You are missing ${key}`);
                }
            }

            if (addedTags.length === 0) {
                return alert("You are missing tags");
            }

            if (!state.cover_image) {
                return alert("You are missing cover image");
            }


            const response = await fetch(URL,{
                method: "POST",
                credentials: "include",
                body: formData,
            })
            
            const data = await response.json();
            if(!response.ok) throw data.error

            console.log(data.message)
        } catch (error) {
            console.log("Error creating blog:", error)
        }
    }
    

    if (auth === null) return <p>Loading...</p>;
    if (!auth) return null;


    return(
        <>        
            <main className="flex flex-col items-center w-screen gap-10 py-10" >
<div className="w-full max-w-4xl mx-auto bg-white rounded-2xl p-8 shadow-lg border border-zinc-200 space-y-8">

    <section className="space-y-2">
        <h2 className="text-sm font-semibold text-zinc-700">Title</h2>
        <input
            type="text"
            className="w-full bg-zinc-50 border border-zinc-300 rounded-lg px-4 py-3 text-zinc-900 placeholder-zinc-400 outline-none focus:border-violet-300 focus:ring-1 focus:ring-violet-300 transition"
            onChange={(e) => {
                dispatch({type: "SET_TITLE", payload: e.target.value})
            }}
        />
    </section>

    <section className="space-y-2">
        <h2 className="text-sm font-semibold text-zinc-700">Summary</h2>
        <input
            type="text"
            className="w-full bg-zinc-50 border border-zinc-300 rounded-lg px-4 py-3 text-zinc-900 placeholder-zinc-400 outline-none focus:border-violet-300 focus:ring-1 focus:ring-violet-300 transition"
            onChange={(e) => {
                dispatch({type: "SET_SUMMARY", payload: e.target.value})
            }}
        />
    </section>

    <section className="space-y-2">
        <h2 className="text-sm font-semibold text-zinc-700">Main Content</h2>
        <textarea
            className="w-full min-h-80 resize-y bg-zinc-50 border border-zinc-300 rounded-lg px-4 py-3 text-zinc-900 placeholder-zinc-400 outline-none focus:border-violet-300 focus:ring-1 focus:ring-violet-300 transition"
            onChange={(e) => {
                dispatch({
                    type: "SET_MAIN",
                    payload: e.target.value
                });
            }}
        />
    </section>

    <section className="space-y-2">
        <h2 className="text-sm font-semibold text-zinc-700">Cover Image</h2>
        <input
            type="file"
            name="image"
            accept="image/*"
            className="w-full cursor-pointer rounded-lg border border-zinc-300 bg-zinc-50 text-sm text-zinc-500 file:mr-4 file:cursor-pointer file:border-0 file:bg-violet-300 file:px-4 file:py-2.5 file:text-sm file:font-medium file:text-zinc-900 hover:file:bg-violet-200 transition"
            onChange={(e) => {
                if(e.target.files !== null){
                    const file = e.target.files[0];
                    if(!file.type.startsWith('image/')){
                        e.target.value = "";
                        return alert ("Only images");
                    }
                    if(file.size > 2 * 1024 * 1024){
                        e.target.value = "";
                        console.log("File size:", file.size)  
                        return alert("File is too large")
                    } 
                    dispatch({type: "SET_COVER_IMAGE", payload: file})
                }
            }}
        />
    </section>

    <section className="space-y-3">
        <h2 className="text-sm font-semibold text-zinc-700">Tags</h2>

        <input
            type="text"
            className="w-full bg-zinc-50 border border-zinc-300 rounded-lg px-4 py-3 text-zinc-900 outline-none focus:border-violet-300 focus:ring-1 focus:ring-violet-300 transition"
            onChange={() => {
            }}
        />

        <ul className="overflow-hidden rounded-lg border border-zinc-200 bg-zinc-50">
            {tags.slice(0,5).map((tag) => {
                return <li
                    className="cursor-pointer border-b border-zinc-200 px-4 py-3 text-zinc-700 last:border-b-0 hover:bg-violet-50 hover:text-violet-700 transition"
                    onClick={() => {
                        handleAddTag(tag);                        
                    }}>{tag}</li>
            })}
        </ul>
    </section>

    <section className="space-y-3">
        <h2 className="text-sm font-semibold text-zinc-700">Added Tags</h2>

        <ul className="flex flex-wrap gap-2">
            {addedTags.map((addedTag) => {
                return <li
                    className="cursor-pointer rounded-full bg-violet-300 px-4 py-2 text-sm font-medium text-zinc-900 hover:bg-violet-200 transition"
                    onClick={() => {
                        handleRemoveTag(addedTag);
                    }}>{addedTag}</li>
            })}
        </ul>
    </section>

    <button
        className="w-full rounded-lg bg-violet-300 px-6 py-3 font-semibold text-zinc-900 hover:bg-violet-200 active:scale-[0.99] transition"
        onClick={() => {
            handleCreateBlog();
        }}
    >
        Create Blog
    </button>

</div>
            <div className="w-full h-full">

                {/* //blogpost review */}
                <div className="flex flex-col bg-white py-20 gap-10 text-black p-5 lg:w-2/5 lg:m-auto">

                    <section className="flex flex-col gap-5">
                        <h1 className="text-4xl font-bold">{state.title ? state.title : "Blog Post Title"}</h1>
                        <p className="text-3xl w-4/5">{state.summary}</p>
                        <AuthorCard author_id={undefined} created_at={undefined}/>
                        <div className="w-full bg-gray-200 h-px my-10"></div>
                        <img
                            src={state.cover_image ? URL.createObjectURL(state.cover_image) : placeHolderBlogImg}
                            alt="Cover"
                            className="w-full mx-auto rounded-2xl"
                        />
                    </section>
                    <section className="text-lg opacity-80">
                        <ReactMarkdown     
                        components={{
                            h1: ({ children }) => (
                                <h1 className="text-4xl font-bold mt-8 mb-4">
                                    {children}
                                </h1>
                            ),
                            h2: ({ children }) => (
                                <h2 className="text-3xl font-bold mt-8 mb-4">
                                    {children}
                                </h2>
                            ),
                            h3: ({ children }) => (
                                <h3 className="text-2xl font-bold mt-6 mb-3">
                                    {children}
                                </h3>
                            ),
                            p: ({ children }) => (
                                <p className="mb-4">
                                    {children}
                                </p>
                            ),
                            ul: ({ children }) => (
                                <ul className="list-disc ml-6 mb-4">
                                    {children}
                                </ul>
                            ),
                            ol: ({ children }) => (
                                <ol className="list-decimal ml-6 mb-4">
                                    {children}
                                </ol>
                            ),
                            li: ({ children }) => (
                                <li className="mb-1">
                                    {children}
                                </li>
                            ),
                            pre:({children}) => (
                                <pre className="bg-gray-300 p-5 w-fit rounded-xl  border-purple-700 border-2">
                                    {children}
                                </pre>
                            )
                        }}>
                            {state.main}
                        </ReactMarkdown>
                    </section>
                </div>
            </div>
            </main>
        </>
    )
}

export default Createblog;