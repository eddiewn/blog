import Aside from "./Aside/Aside";
import { GeneratePOTD } from "./GeneratePOTD";

const Main = () => {
    return(
        <>
            <main className="flex flex-col lg:flex-row w-9/10 m-auto bg-amber-900">
                <section className="w-full lg:w-3/4 p-5">
                    <h1>POST OF THE DAY</h1>
                    <GeneratePOTD />
                </section>
                <Aside />
            </main>
        </>
    )
}

export default Main;