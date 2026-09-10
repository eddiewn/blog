import { useState, useEffect } from "react";

import { useNavigate } from "react-router";
import { useContext } from "react";
import UserContext from "../../context/UserContext";

function MobileHeader() {
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (show == false) {
        }
    }, [show]);

    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    console.log(user);

    return (
        <>
            <header className="bg-gray-400">
                <div className="relative flex justify-between h-15">
                    <p>Blog</p>
                    <div
                        className="relative h-full aspect-square"
                        onClick={() => {
                            setShow(!show);
                            console.log(show);
                        }}
                    >
                        <span className="burger absolute left-1/2 top-5 h-0.75 w-3/5 -translate-x-1/2 bg-blue-200" />
                        <span className="burger absolute left-1/2 top-1/2 h-0.75 w-3/5 -translate-x-1/2 -translate-y-1/2 bg-blue-200" />
                        <span className="burger absolute bottom-5 left-1/2 h-0.75 w-3/5 -translate-x-1/2 bg-blue-200" />
                    </div>
                </div>
                <div
                    className={`absolute left-0 h-screen w-full bg-white ${show ? "block" : "hidden"}`}>
                    <nav className="w-9/10 m-auto mt-5">
                        <ul className="flex flex-col text-2xl font-lightbold gap-4">
                            {user?.role === "admin" && (
                                <>
                                    <li onClick={() => navigate("/create-blog")}>
                                        Create Post
                                    </li>
                                    <span className="w-full h-px bg-black opacity-20"></span>
                                </>
                            )}                           
                            <li
                                onClick={() => {
                                    navigate("/");
                                    setShow(!show)
                                }}
                            >
                                Home
                            </li>
                            <span className="w-full h-px bg-black opacity-20"></span>
                            <li
                                onClick={() => {
                                    navigate("/contact");
                                    setShow(!show)
                                }}
                            >
                                Contact
                            </li>
                            <span className="w-full h-px bg-black opacity-20"></span>
                            <li
                                onClick={() => {
                                    navigate("/about");
                                     setShow(!show)
                                }}
                            >
                                About
                            </li>
                            <span className="w-full h-px bg-black opacity-20"></span>
                            <li
                                onClick={() => {
                                    user ? navigate("/profile") : navigate("/auth")
                                    setShow(!show)
                                }}
                            >
                                {user !== null ? `${user.username}` : "Log in"}
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>
        </>
    );
}

export default MobileHeader;
