import { useNavigate } from "react-router";
import { useContext } from "react";
import UserContext from "../../context/UserContext";
import { useState } from "react";

import logo from "../../Assets/images/logo.png";
import logoWhite from "../../Assets/images/logoWhite.png";

type NormalHeaderProps = {
    isHome: boolean;
};

function NormalHeader({ isHome }: NormalHeaderProps) {
    const navigate = useNavigate();

    const { user } = useContext(UserContext);
    console.log(user);

    const [userDropDown, setUserDropDown] = useState<boolean>(false);

    const currentPage = window.location.pathname;

    console.log(currentPage);

    return (
        <>
            <header
                className={`relative flex items-center shadow w-screen h-20 text-1xl font-bold ${isHome ? "text-white" : "bg-violet-200 text-black"} px-30 z-100`}
            >
                <img
                    className="h-4/5 mr-auto ml-10"
                    src={isHome ? logoWhite : logo}
                    alt=""
                />
                <nav className="mr-10">
                    <ul className="flex gap-10">
                        {user?.role === "admin" && (
                            <li
                                className={`${
                                    currentPage === "/create-blog"
                                        ? "relative after:absolute after:left-0 after:-bottom-1.5 after:h-0.5 after:w-full after:bg-current"
                                        : "relative after:absolute after:left-0 after:-bottom-1.5 after:h-0.5 after:w-0 after:bg-current after:transition-all after:duration-300 hover:after:w-full hover:cursor-pointer"
                                }`}
                                onClick={() => navigate("/create-blog")}
                            >
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
                            onClick={() => {
                                // user
                                //     ? navigate(`/profile/${user.id}`)
                                //     : navigate("/auth");
                                setUserDropDown(!userDropDown);
                            }}
                            className={`group ${
                                currentPage.startsWith("/profile")
                                    ? "relative after:absolute after:left-0 after:-bottom-1.5 after:h-0.5 after:w-full after:bg-current"
                                    : "relative after:absolute after:left-0 after:-bottom-1.5 after:h-0.5 after:w-0 after:bg-current after:transition-all after:duration-300 hover:after:w-full hover:cursor-pointer"
                            }`}
                        >
                            {user !== null ? `${user.username}` : "Log in"}
                        </li>
                    </ul>
                </nav>
            </header>
            <ul
                className={`flex flex-col items-center absolute top-full right-0 transform w-85 bg-[#FBFAF6] gap-1 py-2
                                transition-transform duration-300
                                ${userDropDown ? "translate-y-0" : "-translate-y-20"}
                                ${user ? "block" : "hidden"}                            
                                `}
            >
                <li
                    onClick={() => {
                        if (!user) return;
                        navigate(`/profile/${user.id}`);
                    }}
                >
                    View Profile
                </li>
                <li
                    onClick={() => {
                        navigate(`/settings`);
                    }}
                >
                    Edit Profile
                </li>
            </ul>
        </>
    );
}

export default NormalHeader;
