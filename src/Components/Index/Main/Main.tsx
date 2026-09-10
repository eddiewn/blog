import Aside from "./Aside/Aside";

const Main = () => {
    return(
        <>
            <main className="flex flex-col lg:flex-row w-9/10 m-auto bg-amber-900">
                            <Aside />
                <section className="w-full lg:w-3/4 p-5">
                
                </section>
            </main>
        </>
    )
}

export default Main;