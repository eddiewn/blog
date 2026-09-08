import { useContext, useEffect, useState, useReducer } from "react";
import { useNavigate } from "react-router";
import ReactMarkdown from "react-markdown"
import UserContext from "../../context/UserContext";
import AuthorCard from "./AuthorCard";

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
        const fetchTags = async () => {
            const URL = "http://localhost:4000/api/get-tags" 
            try {
                const response = await fetch(URL);
                const data = await response.json();
                const tagsArray = [];

                for (let index = 0; index < data.rowCount; index++) {
                    tagsArray.push(data.rows[index].name)
                }

                setTags(tagsArray);
                console.log(tagsArray)
            } catch (error) {
                console.log("Error:", error)
            }
        }
        fetchTags();
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
            <main className="flex flex-col items-center w-screen bg-green-300" >
            <div className="bg-orange-300 w-1/4">
                <section className="">
                    <h2>Title</h2>
                    <input type="text" onChange={(e) => {
                        dispatch({type: "SET_TITLE", payload: e.target.value})
                    }}/>
                </section>
                <section>
                    <h2>Summary</h2>
                    <input type="text" onChange={(e) => {
                        dispatch({type: "SET_SUMMARY", payload: e.target.value})
                    }}/>
                </section>
                <section>
                    <h2>Main Content</h2>
                    <input type="text" onChange={(e) => {
                        dispatch({type: "SET_MAIN", payload: e.target.value})
                    }}/>
                </section>
                <section className="">
                    <h2>Cover Image</h2>
                    <input type="file" name="image" accept="image/*" onChange={(e) => {
                        if(e.target.files !== null){
                            const file = e.target.files[0];

                            if(!file.type.startsWith('image/')){
                                e.target.value = "";
                                return alert ("Only images");
                            }

                            if(file.size > 5 * 1024 * 1024){
                                e.target.value = "";
                                console.log("File size:", file.size)  
                                return alert("File is too large")
                            } 

                            dispatch({type: "SET_COVER_IMAGE", payload: file})
                        }
                    }}/>
                </section>
                <section>
                    <h2>Tags</h2>
                    <input type="text" onChange={() => {
                        
                    }}/>
                    <ul>
                        {tags.slice(0,5).map((tag) => {
                            return <li onClick={() => {
                                handleAddTag(tag);                        
                            }}>{tag}</li>
                        })}
                    </ul>
                </section>
                <section>
                    <h2>Added Tags</h2>
                    <ul>
                        {addedTags.map((addedTag) => {
                            return <li onClick={() => {
                                handleRemoveTag(addedTag);
                            }}>{addedTag}</li>
                        })}
                    </ul>
                </section>
                <button onClick={() => {
                    handleCreateBlog();
                }}>Create Blog</button>
            </div>
            <div className="w-full h-full">
                <h2>Preview</h2>

                {/* //blogpost review */}
                <div className="flex flex-col bg-white py-20 gap-10 text-black p-5">

                    <section className="flex flex-col gap-5">
                        <h1 className="text-4xl font-bold">{state.title ? state.title : "Blog Post Title"}</h1>
                        <p className="text-3xl w-4/5">{state.summary}</p>
                        <AuthorCard />
                        <div className="w-full bg-gray-200 h-px my-10"></div>
                        <img
                            src={state.cover_image ? URL.createObjectURL(state.cover_image) : placeHolderBlogImg}
                            alt="Cover"
                            className="w-full mx-auto rounded-2xl"
                        />
                    </section>
                    <section className="text-lg opacity-80">
                        <ReactMarkdown >
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