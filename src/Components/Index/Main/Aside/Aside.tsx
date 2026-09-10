import { useNavigate } from "react-router";

fetch("api/get-tags")

const Aside = () => {
    
    const navigate = useNavigate();
    return(
        <aside id="aside" className="w-full lg:w-1/4 bg-blue-500">
            <p>Im aside.</p>
            <button onClick={() => {
                navigate("/view-blogs")
            }}>View Posts</button>
        </aside>
    )
}

export default Aside;