import { useNavigate } from "react-router";

const Header = () => {

    const navigate = useNavigate();

    return(
        <header className="flex items-center w-screen bg-amber-500 h-20">
            <p className="mr-auto ml-10">Blogname</p>
            <nav className="mr-10">
                <ul className="flex gap-10">
                    <li onClick={() => {navigate("/")}}>Home</li>
                    <li onClick={() => {navigate("/contact")}}>Contact</li>
                    <li onClick={() => {navigate("/about")}}>About</li>
                    <li onClick={() => {navigate("/auth")}}>Account</li>
                </ul>
            </nav>
        </header>
    )
}

export default Header;