const Header = () => {
    return(
        <header className="flex items-center w-screen bg-amber-500 h-20">
            <p className="mr-auto ml-10">Blogname</p>
            <nav className="mr-10">
                <ul className="flex gap-10">
                    <li>Home</li>
                    <li>Contact</li>
                    <li>About</li>
                </ul>
            </nav>
        </header>
    )
}

export default Header;