import { useNavigate } from "react-router";
import { useContext } from "react";
import UserContext from "../../context/UserContext";

type NormalHeaderProps = {
    isHome: boolean;
};

function NormalHeader({ isHome }: NormalHeaderProps) {
    const navigate = useNavigate();

    const { user } = useContext(UserContext);
    console.log(user);

    const currentPage = window.location.pathname;

    console.log(currentPage);

    return (
        <>
            <header
                className={`flex items-center w-screen h-20 text-1xl font-bold ${isHome ? "text-white" : "bg-white text-black"} px-30`}
            >
                <p className="mr-auto ml-10">Blogname</p>
                <nav className="mr-10">
                    <ul className="flex gap-10">
                        {user?.role === "admin" && (
                            <li onClick={() => navigate("/create-blog")}>
                                Create blog
                            </li>
                        )}
                        <li
                            onClick={() => navigate("/")}
                            className={`${
                                currentPage === "/"
                                    ? "relative after:absolute after:left-0 after:-bottom-1.5 after:h-0.5 after:w-full after:bg-current"
                                    : "relative after:absolute after:left-0 after:-bottom-1.5 after:h-0.5 after:w-0 after:bg-current after:transition-all after:duration-300 hover:after:w-full hover:cursor-pointer"
                            }`}
                        >
                            Home
                        </li>
                        <li
                            onClick={() => {
                                navigate("/contact");
                            }}
                            className={`${
                                currentPage === "/contact"
                                    ? "relative after:absolute after:left-0 after:-bottom-1.5 after:h-0.5 after:w-full after:bg-current"
                                    : "relative after:absolute after:left-0 after:-bottom-1.5 after:h-0.5 after:w-0 after:bg-current after:transition-all after:duration-300 hover:after:w-full hover:cursor-pointer"
                            }`}
                        >
                            Contact
                        </li>
                        <li
                            onClick={() => {
                                navigate("/about");
                            }}
                            className={`${
                                currentPage === "/about"
                                    ? "relative after:absolute after:left-0 after:-bottom-1.5 after:h-0.5 after:w-full after:bg-current"
                                    : "relative after:absolute after:left-0 after:-bottom-1.5 after:h-0.5 after:w-0 after:bg-current after:transition-all after:duration-300 hover:after:w-full hover:cursor-pointer"
                            }`}
                        >
                            About
                        </li>
                        <li
                            onClick={() =>
                                user ? navigate("/profile") : navigate("/auth")
                            }
                            className={`${
                                currentPage === "/profile"
                                    ? "relative after:absolute after:left-0 after:-bottom-1.5 after:h-0.5 after:w-full after:bg-current"
                                    : "relative after:absolute after:left-0 after:-bottom-1.5 after:h-0.5 after:w-0 after:bg-current after:transition-all after:duration-300 hover:after:w-full hover:cursor-pointer"
                            }`}
                        >
                            {user !== null ? `${user.username}` : "Log in"}
                        </li>
                    </ul>
                </nav>
            </header>
        </>
    );
}

export default NormalHeader;
