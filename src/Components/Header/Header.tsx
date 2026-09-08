import { useContext } from "react";
import UserContext from "../../context/UserContext";

import NormalHeader from "./NormalHeader";
import MobileHeader from "./MobileHeader"

const Header = () => {
    const { user } = useContext(UserContext);
    console.log(user)

    return(
        <>
            <div className="hidden md:block">
                <NormalHeader />
            </div>
            <div className="block md:hidden">
                <MobileHeader />
            </div>
        </>
    )
}

export default Header;