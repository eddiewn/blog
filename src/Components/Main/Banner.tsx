import arrowDown from "../../Assets/images/arrowDown.png"

const Banner = () => {
    return (
        <section className={`w-screen h-screen  bg-linear-135 from-blue-700 to-pink-200 text-white`}>
            <div className="h-[97%] flex flex-col justify-end gap-10 2xl:gap-20 mx-10 ml-15 md:ml-30">
                <h1 className="text-5xl 2xl:text-7xl font-extrabold text-white">
                    This is my Blog. Yup, just blog.
                </h1>
                <div className="flex flex-col gap-2 lg:gap-7 text-2xl">
                    <p className="">Thoughts worth sharing. </p>

                    <p className="lg:w-2/5">
                        From things you're learning to ideas you explore, this is
                        where you can write about what interests you, what you're working
                        on, and everything you discover along the way.
                    </p>

                </div>
                    <a id="aside" href="#aside" className="h-10 w-10 ">
                        <img 
                            src={arrowDown} 
                            alt=""
                        />
                    </a>
            </div>

        </section>
    );
};

export default Banner;
