import { useContext } from "react";
import UserContext from "../../context/UserContext";

import NormalHeader from "./NormalHeader";
import MobileHeader from "./MobileHeader"

const Header = () => {
    const { user } = useContext(UserContext);
    console.log(user)

    return(
        <>
            <div className="z-999 sticky top-0 hidden md:block">
                <NormalHeader />
            </div>
            <div className="z-999 sticky top-0 block md:hidden">
                <MobileHeader />
            </div>
        </>
    )
}

export default Header;