let csrfToken = "";

export const fetchCsrfToken = async () => {
    const response = await fetch("http://localhost:4000/api/csrf-token", {
        credentials: "include",
    });

    const data = await response.json();
    csrfToken = data.csrfToken;

    console.log(csrfToken);
};

type LoginProps = {
    username: string;
    password: string;
};

export const login = async ({ username, password }: LoginProps) => {
    try {
        if (!csrfToken) {
            await fetchCsrfToken();
        }
        console.log(csrfToken);
        const URL = "http://localhost:4000/api/login";
        const response = await fetch(URL, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "x-csrf-token": csrfToken,
            },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        });

        const data = await response.json();
        console.log(data);
        if (!response.ok) {
            throw new Error(`Failed to login: ${data.error} `);
        } else {
            return data;
        }
    } catch (error) {
        console.log("Error logging in");
    }
};

type RegisterProps = {
    username: string;
    password: string;
    confirmPassword: string;
};

export const register = async ({
    username,
    password,
    confirmPassword,
}: RegisterProps) => {
    try {
        if (!csrfToken) {
            await fetchCsrfToken();
        }
        const URL = "http://localhost:4000/api/register";
        const response = await fetch(URL, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "x-csrf-token": csrfToken,
            },
            body: JSON.stringify({
                username: username,
                password: password,
                confirmPassword: confirmPassword,
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(`Failed to login: ${data.error} `);
        } else {
            return data;
        }
    } catch (error) {
        console.log("Error registering");
    }
};

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
    try {
        const URL = `http://localhost:4000/api/fetch-user-info?userId=${userId}`;

        if (!userId) throw new Error("No userId");
        const response = await fetch(URL);

        const data = response.json();
        return data;
    } catch (error) {
        console.log("Error fetching user data");
    }
};

type sendMailProps = {
    name: string;
    email: string;
    message: string;
};
export const sendMail = async ({ name, email, message }: sendMailProps) => {
    console.log(name, email, message);
    try {
        if (!csrfToken) {
            await fetchCsrfToken();
        }
        const URL = "http://localhost:4000/api/send-mail";
        const response = await fetch(URL, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "x-csrf-token": csrfToken,
            },
            body: JSON.stringify({
                name: name,
                email: email,
                message: message,
            }),
        });

        const data = await response.json();

        console.log(data);
    } catch (error) {
        console.log("Error sending mail, ", error);
    }
};

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
        const URL = "http://localhost:4000/api/get-post-tags";
        const response = await fetch(URL);

        const data = await response.json();

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        console.log(data);
        return data;
    } catch (error) {
        console.log("Error: ", error);
    }
};

export const updateProfile = async (formData: FormData) => {
    try {
        const URL = "http://localhost:4000/api/update-profile";
        const response = await fetch(URL, {
            method: "POST",
            headers: {
                "x-csrf-token": csrfToken,
            },
            credentials: "include",
            body: formData,
        });
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.log("Error updating profile, ", error);
    }
};

export const signOut = async () => {
    try {
        const URL = "http://localhost:4000/api/sign-out";
        const response = await fetch(URL, {
            method: "POST",
            credentials: "include",
            headers: {
                "x-csrf-token": csrfToken,
            },
        });

        const data = await response.json();
        console.log(data);

        if (response.ok) {
            csrfToken = "";
        }
        console.log(data);
    } catch (error) {
        console.log("Error signing out");
    }
};
