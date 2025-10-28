import Aside from "./Aside/Aside";

const Main = () => {
    return(
        <>
            <main className="flex flex-col lg:flex-row w-9/10 m-auto bg-amber-900">
                <section className="w-full lg:w-3/4 p-5">
                    <h1>POST OF THE DAY</h1>
                    <article className="bg-gray-400 w-full p-3">
                        <h2 className="">PLACEHOLDER TITLE</h2>
                        <p>This is placeholder summary summary summary summary summary summary summary summary summary summary summary summary summary summary summary </p>
                        <img src="placeholder.png" alt="" />
                        <button className="btn mt-1">VIEW</button>
                    </article>
                </section>
                <Aside />
            </main>
        </>
    )
}

export default Main;