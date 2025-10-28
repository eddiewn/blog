import Searchbar from "./Searchbar";
import { useNavigate } from "react-router";

const Aside = () => {
    
    const navigate = useNavigate();
    return(
        <aside className="w-full lg:w-1/4 bg-blue-500">
            <Searchbar />
            <p>Im aside.</p>
            <button onClick={() => {
                navigate("/view-blogs")
            }}>View Posts</button>
        </aside>
    )
}

export default Aside;