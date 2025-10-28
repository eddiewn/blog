import Searchbar from "./Searchbar";

const Aside = () => {
    return(
        <aside className="w-full lg:w-1/4 bg-blue-500">
            <Searchbar />
            <p>Im aside.</p>
            <button>View latest posts</button>
        </aside>
    )
}

export default Aside;