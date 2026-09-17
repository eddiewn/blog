import { useState } from "react";

import { useNavigate } from "react-router";
import { useContext } from "react";
import UserContext from "../../context/UserContext";

import logo from "../../Assets/images/logo.png";

type HeaderProps = {
    handleLogout: () => void;
};

function MobileHeader({handleLogout}: HeaderProps) {
    const [show, setShow] = useState(false);

    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    console.log(user);

    const [userDropDown, setUserDropDown] = useState<boolean>(false);

    return (
        <>
            <div className="fixed top-0 left-0 w-full z-50">
                {/* HEADER */}
                <div className="relative flex justify-between h-15 bg-white z-50">
                    <img src={logo} alt="" />

                    <div
                        className="relative h-full aspect-square"
                        onClick={() => setShow(!show)}
                    >
                        <span className="burger absolute left-1/2 top-5 h-0.75 w-3/5 -translate-x-1/2 bg-violet-300" />
                        <span className="burger absolute left-1/2 top-1/2 h-0.75 w-3/5 -translate-x-1/2 -translate-y-1/2 bg-violet-300" />
                        <span className="burger absolute bottom-5 left-1/2 h-0.75 w-3/5 -translate-x-1/2 bg-violet-300" />
                    </div>
                </div>

                {/* MENU */}
                <div
                    className={`absolute top-15 left-0 w-full h-screen bg-white z-40 transition-transform duration-300 ${
                        show ? "translate-y-0" : "-translate-y-full"
                    }`}
                >
                    <nav className="w-9/10 m-auto mt-5">
                        <ul className="flex flex-col text-2xl font-lightbold gap-4">
                            {user?.role === "admin" && (
                                <>
                                    <li
                                        onClick={() => {
                                            navigate("/create-blog");
                                            setShow(false);
                                        }}
                                    >
                                        Create Post
                                    </li>
                                    <span className="w-full h-px bg-black opacity-20" />
                                </>
                            )}
                            <li
                                onClick={() => {
                                    navigate("/");
                                    setShow(false);
                                }}
                            >
                                Home
                            </li>

                            <span className="w-full h-px bg-black opacity-20" />

                            <li
                                onClick={() => {
                                    navigate("/contact");
                                    setShow(false);
                                }}
                            >
                                Contact
                            </li>

                            <span className="w-full h-px bg-black opacity-20" />
                            <li
                                onClick={() => {
                                    navigate("/about");
                                    setShow(false);
                                }}
                            >
                                About
                            </li>
                            <span className="w-full h-px bg-black opacity-20" />
                            <li
                                onClick={() => {
                                    user
                                        ? setUserDropDown(!userDropDown)
                                        : navigate("/auth");
                                }}
                            >
                                {user !== null ? user.username : "Log in"}
                                <ul
                                    className={`flex flex-col items-center absolute left-full right-0 transform w-screen bg-[#white] gap-1 py-2
                                transition-transform duration-300
                                ${userDropDown ? "-translate-x-full" : "translate-x-0"}
                                ${user ? "block" : "hidden"}                            
                                `}
                                >
                                    <li
                                        onClick={() => {
                                            if (!user) return;
                                            console.log(
                                                "This is userId in header: ",
                                                user.id,
                                            );

                                            navigate(`/profile/${user.id}`);
                                            setUserDropDown(false);
                                        }}
                                    >
                                        View Profile
                                    </li>
                                    <li
                                        onClick={() => {
                                            navigate(`/settings`);
                                            setUserDropDown(false);
                                        }}
                                    >
                                        Edit Profile
                                    </li>
                                    <li
                                        onClick={() => {
                                            setUserDropDown(false);
                                            handleLogout();
                                            navigate("/auth");
                                        }}
                                    >
                                        Sign out
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </>
    );
}

export default MobileHeader;
