import { useContext } from "react";
import UserContext from "../../context/UserContext";

import NormalHeader from "./NormalHeader";
import MobileHeader from "./MobileHeader";

const Header = () => {
    const { user } = useContext(UserContext);
    console.log(user);

    return (
        <header className="sticky top-0 z-999">
            <div className="hidden lg:block">
                <NormalHeader />
            </div>
            <div className="block lg:hidden">
                <MobileHeader />
            </div>
        </header>
    );
};

export default Header;
