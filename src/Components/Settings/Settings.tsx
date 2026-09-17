import UserContext from "../../context/UserContext";
import { useState, useContext, useEffect } from "react";
import { fetchUserInfo, updateProfile } from "../../api/api";

const Settings = () => {
    const { user } = useContext(UserContext);

    type userInfo = {
        username: string;
        bio: string;
        display_name: string;
        id: number;
    }

    const [userInfo, setUserInfo] = useState<userInfo>();

    const [displayName, setDisplayName] = useState<string>("")
    const [bio, setBio] = useState<string>("")
    const [profileImage, setProfileImage] = useState<File | null>(null)

    const handleUpdateSubmit = () => {
        const formData = new FormData();
        formData.append("displayName", displayName)
        formData.append("bio", bio)
        if(userInfo){
            formData.append("id", String(userInfo.id))
        }
        if(profileImage){
            formData.append("profileImage", profileImage)
        }

        for (const value of formData.values()) {
                console.log(value);
        }

        updateProfile(formData);
    }
    

    useEffect(() => {
        if (!user) return;

        const fetch = async () => {
            const info = await fetchUserInfo(user.id);

            setUserInfo(info)
            setDisplayName(info.display_name || info.username)
        };

        fetch();

    }, []);


    if(!userInfo) return;

    return (
        <>
            <main>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    handleUpdateSubmit();
                }} 
                className="flex flex-col gap-5">
                    <input type="file" name="updateProfileImage" accept="image/*" onChange={(e) => {
                        if(e.target.files !== null){
                            const file = e.target.files[0];

                            if(!file.type.startsWith('image/')){
                                e.target.value = "";
                                return alert ("Only images");
                            }

                            if(file.size > 2 * 1024 * 1024){
                                e.target.value = "";
                                console.log("File size:", file.size)  
                                return alert("File is too large")
                            } 
                            setProfileImage(file)

                        }
                    }}/>
                    <div>
                        <p>Display Name:</p>
                        <input 
                        onChange={(e) => {
                            setDisplayName(e.target.value);
                        }}
                        name="updateDisplayName"
                        className="opacity-40" type="text"
                        value={displayName}
                        />
                    </div>
                    <div>
                        <p className="font-bold">Bio: </p>                
                        <textarea 
                            onChange={(e) => {
                                setBio(e.target.value);
                            }}
                            name="updateBio"
                            >

                            {!userInfo.bio ? "They dont say much about themself... but we are sure they are a great person." : userInfo.bio }
                        </textarea> 
                    </div>
                    <p>This is settings</p>
                    <button type="submit">Update profile</button>
                </form>
            </main>
        </>
    )
};

export default Settings;
