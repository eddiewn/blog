import Aside from "./Aside/Aside";

const Main = () => {
    return(
        <>
            <main className="flex flex-col w-9/10 m-auto bg-amber-900 p-2">
                <section className="w-full lg:w-3/4">
                    <h1>POST OF THE DAY</h1>
                    <article className="bg-gray-400 w-full">
                        <h2>PLACEHOLDER TITLE</h2>
                        <p>This is placeholder summary summary summary summary summary summary summary summary summary summary summary summary summary summary summary </p>
                        <img src="placeholder.png" alt="" />
                        <button className="btn">VIEW</button>
                    </article>
                </section>
                <Aside />
            </main>
        </>
    )
}

export default Main;