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

    <header className="z-999">
            <div className="hidden lg:block">
                {isHome ? (
                    <div className="-mb-20">
                        <NormalHeader isHome={isHome} />
                    </div>
                ) : (
                    <>
                        <div className="fixed top-0 left-0 w-full z-50">
                            <NormalHeader isHome={isHome} />
                        </div>

                        <div className="h-20" />
                    </>
                )}
            </div>
            <div className="block lg:hidden">
                <MobileHeader />
            </div>
        </header>
    );
}; 

export default Header;
