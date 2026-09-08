import { useState, useEffect } from "react";

function MobileHeader() {
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (show == false) {
        }
    }, [show]);

    return (
        <>
            <header className="bg-gray-400">
                <div className="flex justify-between h-15">
                    <p>Blog</p>
                    <div
                        className="relative h-full aspect-square"
                        onClick={() => {
                            setShow(!show);
                            console.log(show);
                        }}
                    >
                        <span className="burger absolute left-1/2 top-4 h-1 w-3/5 -translate-x-1/2 bg-blue-200" />
                        <span className="burger absolute left-1/2 top-1/2 h-1 w-3/5 -translate-x-1/2 -translate-y-1/2 bg-blue-200" />
                        <span className="burger absolute bottom-4 left-1/2 h-1 w-3/5 -translate-x-1/2 bg-blue-200" />
                    </div>
                </div>
                <div className={`w-full h-screen bg-white ${show ? "hidden" : "block"}` }>
                    <nav>
                        
                    </nav>
                </div>
            </header>
        </>
    );
}

export default MobileHeader;
