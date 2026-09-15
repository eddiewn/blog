import { useEffect, useState } from "react";
import { fetchUserInfo } from "../../api/api";

import blogPostProfilePlaceholder from "../../Assets/images/blogPostProfilePlaceholder.webp"

const Profile = () => {
    type userInfo = {
        username: string;
        bio: string;
    }

    const [userInfo, setUserInfo] = useState<userInfo>();

    useEffect(() => {

        const userId = window.location.pathname.slice(9)

        const fetch = async() =>{
            try {
                console.log(userId)
                const response = await fetchUserInfo(Number(userId));
                setUserInfo(response)
                console.log(response)
            } catch (error) {
                
            }
        }
        fetch();
    },[])


    if(!userInfo)return <p>Loading...</p>

    return(
        <main>
            <div className="flex ">
                <img className="h-10 rounded-full aspect-square" src={blogPostProfilePlaceholder} alt="" />
                <h1>{`${userInfo?.username}`}</h1>
            </div>
            <p>{`${userInfo.bio ? userInfo.bio : "They dont say much about themself... but we are sure they are a great person."}`}</p>
        </main>
    )
}
export default Profile;