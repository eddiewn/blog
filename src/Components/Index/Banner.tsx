import arrowDown from "../../Assets/images/arrowDown.png"

const Banner = () => {
    return (
        <section className="w-screen h-screen border-b border-gray-500 bg-linear-135 from-blue-700 to-pink-200 text-white">
            <div className="h-[97%] flex flex-col justify-end gap-20 mx-10 md:ml-30">
                <h1 className="text-7xl font-extrabold text-white">
                    This is my Blog.
                </h1>
                <div className="flex flex-col gap-7 text-2xl">
                    <p className="">Thoughts worth sharing. </p>

                    <p>
                        From things I'm learning to ideas I'm exploring, this is
                        where I write about what interests me, what I'm working
                        on, and everything I discover along the way.
                    </p>

                </div>
                    <a href="#aside" className="h-10 w-10 ">
                        <img 
                            src={arrowDown} 
                            alt=""
                            onClick={() => {

                            }}
                        />
                    </a>
            </div>

        </section>
    );
};

export default Banner;
