import Header from "../Header";
import Banner from "./Banner";
import Main from "./Main/Main";

function Home() {
    return (
        <>
            <Header />
            <Banner />
            <Main />
            <h1 className="text-3xl font-bold underline">
                Hello This is just inside Index
            </h1>
        </>
  )
}

export default Home;
