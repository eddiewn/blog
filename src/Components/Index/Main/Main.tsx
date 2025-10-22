import Aside from "./Aside/Aside";

const Main = () => {
    return(
        <>
            <main className="flex w-9/10 m-auto h-40 bg-amber-900">
                <section className="w-3/4">
                    <h1>Main content</h1>
                </section>
                <Aside />

            </main>
        </>
    )
}

export default Main;