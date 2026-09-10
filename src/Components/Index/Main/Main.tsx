import Aside from "./Aside/Aside";
import BlogsByFilter from "./BlogsByFilter";

const Main = () => {
    return(
        <>
            <main className="flex flex-col lg:flex-row w-9/10 m-auto">
                    <Aside />
                <section className="w-full lg:w-3/4 p-5">
<BlogsByFilter />
                </section>
            </main>
        </>
    )
}

export default Main;