import UserContext from "../../context/UserContext";
import { useState, useContext, useEffect } from "react";
import { fetchUserInfo } from "../../api/api";

const Settings = () => {
    const { user } = useContext(UserContext);

    type userInfo = {
        username: string;
        bio: string;
        display_name: string;
    }

    const [userInfo, setUserInfo] = useState<userInfo>();

    useEffect(() => {
        if (!user) return;

        const fetch = async () => {
            setUserInfo(await fetchUserInfo(user.id));
        };

        fetch();
    }, []);

    console.log(userInfo);

    if(!userInfo) return;

    return (
        <>
            <main>
                <section className="flex flex-col gap-5">
                    <div>
                        <p>Display Name:</p>
                        <input className="opacity-40" placeholder={!userInfo.display_name ? userInfo.username : userInfo.display_name} type="text" />
                    </div>
                    <div>
                        <p className="font-bold">Bio: </p>                
                        <textarea>
                            {!userInfo.bio ? "They dont say much about themself... but we are sure they are a great person." : "" }
                        </textarea> 
                    </div>
                    <p>This is settings</p>
                </section>
            </main>
        </>
    )
};

export default Settings;
