import { useContext } from "react";
import { useLocation } from "react-router";
import UserContext from "../../context/UserContext";

import NormalHeader from "./NormalHeader";
import MobileHeader from "./MobileHeader";



const Header = () => {

        const location = useLocation();

    const isHome = location.pathname === "/";
    
    const { user } = useContext(UserContext);
    console.log(user);

    return (
    <header className="sticky top-0 z-999">
            <div className={`hidden lg:block ${isHome ? "-mb-20" : ""}`}>
                <NormalHeader />
            </div>
            <div className="block lg:hidden">
                <MobileHeader />
            </div>
        </header>
    );
}; 

export default Header;
