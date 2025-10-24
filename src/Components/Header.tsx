import { useNavigate } from "react-router";
import { useContext } from "react";
import UserContext from "../context/UserContext";

const Header = () => {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    console.log(user)
    return(
        <header className="flex items-center w-screen bg-amber-500 h-20">
            <p className="mr-auto ml-10">Blogname</p>
            <nav className="mr-10">
                <ul className="flex gap-10">
                    {user?.role === "admin" && (
                    <li onClick={() => navigate("/create-blog")}>Create blog</li>
                    )}
                    <li onClick={() => {navigate("/")}}>Home</li>
                    <li onClick={() => {navigate("/contact")}}>Contact</li>
                    <li onClick={() => {navigate("/about")}}>About</li>
                    <li onClick={() => (user ? navigate("/profile") : navigate("/auth"))}>
                        {user !== null ? `${user.username}` : "Log in"}</li>
                </ul>
            </nav>
        </header>
    )
}

export default Header;