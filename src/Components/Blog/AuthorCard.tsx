import profilePlaceholder from "../../Assets/images/blogPostProfilePlaceholder.webp"

function AuthorCard(){
    return(
        <>
            <section className="flex h-10 w-full gap-2">
                <div className="h-full aspect-square ">
                    <img className="rounded-full" src={profilePlaceholder} alt="" />
                </div>
                <div className="flex flex-col">
                    <div>
                        <p className="font-bold">John Doe</p>
                        <p className="opacity-50">January 1, 2000</p>
                    </div>
                </div>
            </section>
        </>
    )
}
export default AuthorCard;