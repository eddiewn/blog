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
            setBio(info.bio || "");
        };

        fetch();

    }, [user]);


    if(!userInfo) return;

    return (
        <>
<main className="min-h-screen px-6 py-12">
    <form
        onSubmit={(e) => {
            e.preventDefault();
            handleUpdateSubmit();
        }}
        className="mx-auto flex w-full max-w-xl flex-col gap-6 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm"
    >
        <div>
            <h1 className="text-2xl font-bold">Profile settings</h1>
            <p className="mt-1 text-sm text-gray-500">
                Update your profile information.
            </p>
        </div>

        <div className="flex flex-col gap-2">
            <label className="font-semibold">Profile picture</label>

            <input
                type="file"
                name="updateProfileImage"
                accept="image/*"
                onChange={(e) => {
                    if (e.target.files !== null) {
                        const file = e.target.files[0];

                        if (!file.type.startsWith("image/")) {
                            e.target.value = "";
                            return alert("Only images");
                        }

                        if (file.size > 2 * 1024 * 1024) {
                            e.target.value = "";
                            console.log("File size:", file.size);
                            return alert("File is too large");
                        }

                        setProfileImage(file);
                    }
                }}
                className="cursor-pointer rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm
                file:mr-4 file:rounded-md file:border-0 file:bg-gray-200
                file:px-4 file:py-2 file:text-sm file:font-medium
                hover:file:bg-gray-300"
            />
            <p className="text-xs text-gray-500">PNG or JPEG, max 2 MB.</p>
        </div>

        <div className="flex flex-col gap-2">
            <label className="font-semibold">Display Name</label>

            <input
                onChange={(e) => {
                    setDisplayName(e.target.value);
                }}
                name="updateDisplayName"
                type="text"
                value={displayName}
                className="rounded-lg border border-gray-300 px-4 py-2 outline-none transition
                focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
            />
        </div>

        <div className="flex flex-col gap-2">
            <label className="font-semibold">Bio</label>

            <textarea
                onChange={(e) => {
                    setBio(e.target.value);
                }}
                name="updateBio"
                value={bio}
                rows={5}
                className="resize-none rounded-lg border border-gray-300 px-4 py-3 outline-none transition
                focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
                placeholder="Tell people a little about yourself..."
            />
        </div>

        <button
            type="submit"
            className="rounded-lg bg-gray-900 px-5 py-3 font-semibold text-white
            transition hover:bg-gray-700 active:scale-[0.98]"
        >
            Update profile
        </button>
    </form>
</main>
        </>
    )
};

export default Settings;
