import { useNavigate, useLocation } from "react-router";
import { useContext } from "react";
import UserContext from "../../context/UserContext";

function NormalHeader(){


    const navigate = useNavigate();


    const { user } = useContext(UserContext);
    console.log(user)

    return(
        <>
        <header className={`flex items-center w-screen h-20 font-bold text-white px-30`}>
            <p className="mr-auto ml-10">Blogname</p>
            <nav className="mr-10">
                <ul className="flex gap-10">
                    {user?.role === "admin" && (
                    <li onClick={() => 
                        navigate("/create-blog")}>Create blog</li>
                    )}
                    <li onClick={() => {navigate("/")}}>Home</li>
                    <li onClick={() => {navigate("/contact")}}>Contact</li>
                    <li onClick={() => {navigate("/about")}}>About</li>
                    <li onClick={() => (user ? navigate("/profile") : navigate("/auth"))}>
                        {user !== null ? `${user.username}` : "Log in"}
                    </li>
                </ul>
            </nav>
        </header>
        </>
    )
}

export default NormalHeader;