import { useContext } from "react";
import { useLocation } from "react-router";
import UserContext from "../../context/UserContext";

import NormalHeader from "./NormalHeader";
import MobileHeader from "./MobileHeader";
import { signOut } from "../../api/api";




const Header = () => {
const { setUser } = useContext(UserContext);

        const location = useLocation();

    const isHome = location.pathname === "/";
    
    const { user } = useContext(UserContext);
    console.log(user);

    const handleLogout = async () => {
        await signOut();
        setUser(null);
    };

return (
    <header className="z-999">
            <div className="hidden lg:block">
                {isHome ? (
                    <div className="-mb-20">
                        <NormalHeader isHome={isHome} handleLogout={handleLogout} />
                    </div>
                ) : (
                    <>
                        <div className="fixed top-0 left-0 w-full z-50">
                        <NormalHeader isHome={isHome} handleLogout={handleLogout} />
                        </div>

                        <div className="h-20" />
                    </>
                )}
            </div>
            <div className="block lg:hidden">
                <MobileHeader handleLogout={handleLogout}/>
                {!isHome&&(<div className="h-15" />)}

            </div>
        </header>
    );
}; 

export default Header;
