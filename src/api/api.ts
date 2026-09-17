export const fetchTags = async () => {
    const URL = "http://localhost:4000/api/get-tags";
    try {
        const response = await fetch(URL);
        const data = await response.json();

        return data;
    } catch (error) {
        console.log("Error:", error);
        return [];
    }
};

export const fetchUserInfo = async (userId: number) => {
    const URL = "http://localhost:4000/api/fetch-user-info";

    try {
        if(!userId) throw new Error("No userId")
        const response = await fetch(URL, {
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userId: userId,
            })
        })
        
        const data = response.json();
        return data;
    } catch (error) {
        console.log("Error fetching user data, ", error)
    }
}

type sendMailProps = {
    name: string;
    email: string;
    message: string;
}
export const sendMail = async ({name, email, message}: sendMailProps) => {

    console.log(name, email, message)
    try {
        const URL = "http://localhost:4000/api/send-mail"
        const response = await fetch(URL, {
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name, email: email, message: message,
            })
        })
        
        const data = await response.json();

        console.log(data)

    } catch (error) {
        console.log("Error sending mail, ", error)
    }
}

export const getBlogs = async () => {
    try {
        const URL = "http://localhost:4000/api/get-blogs";
        const response = await fetch(URL);

        const data = await response.json();

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return data;
    } catch (error) {
        console.log("Error: ", error);
    }
};

export const getPostTags = async () => {
    try {
        const URL = "http://localhost:4000/api/get-post-tags"
                const response = await fetch(URL);

        const data = await response.json();

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        console.log(data)
        return data;
    } catch (error) {
        console.log("Error: ", error);
    }
}

export const updateProfile = async (formData: FormData) => {
    try {
        const URL = "http://localhost:4000/api/update-profile"
        const response = await fetch(URL, {
            method: "POST",
            body: formData,
            

        })
        const data = response.json();
        console.log(data)
    } catch (error) {
        
    }
}

export const signOut = async () => {
    try {
        const URL = "http://localhost:4000/api/sign-out"
        const response = await fetch(URL, {
            method: "POST",
            credentials: "include",
        })
        const data = await response.json();

        console.log(data)
    } catch (error) {
        console.log(error)
    }
}