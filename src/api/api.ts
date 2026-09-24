let csrfToken = "";

const API_URL = import.meta.env.VITE_API_URL;

export const fetchCsrfToken = async () => {
    const response = await fetch(`${API_URL}/api/csrf-token`, {
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
        const URL = `${API_URL}/api/login`;
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
        console.log(error);
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
        const URL = `${API_URL}/api/register`;
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
export const adminAuth = async () => {
    const URL = `${API_URL}/api/admin/enter-blog`;
    try {
        if (!csrfToken) {
            await fetchCsrfToken();
        }

        const response = await fetch(URL, {
            credentials: "include",
            headers: {
                "x-csrf-token": csrfToken,
            },
        });
        const data = await response.json();

        console.log(response)

        if (!response.ok || data.auth == false) {
            return false;
        }

        return true;
    } catch (error) {
        console.log(error);
    }
};

export const fetchPost = async (id: number) => {
    try {
        const URL = `${API_URL}/posts?id=${id}`;
        const response = await fetch(URL);

        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
};

export const fetchTags = async () => {
    const URL = `${API_URL}/api/get-tags`;
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
        const URL = `${API_URL}/api/fetch-user-info?userId=${userId}`;

        if (!userId) throw new Error("No userId");
        const response = await fetch(URL);

        const data = await response.json();
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
        const URL = `${API_URL}/api/send-mail`;
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

export const handleCreateBlog = async (formData: FormData) => {
    try {
        if (!csrfToken) {
            await fetchCsrfToken();
        }
        const URL = `${API_URL}/api/admin/create-blog`;

        console.log(csrfToken);
        const response = await fetch(URL, {
            method: "POST",
            credentials: "include",
            headers: {
                "x-csrf-token": csrfToken,
            },
            body: formData,
        });

        const data = await response.json();
        if (!response.ok) throw data.error;

        console.log(data.message);
        return response.status;
    } catch (error) {
        console.log("Error creating blog:", error);
    }
};

export const getBlogs = async (page: number = 1, fetchAmount: number = 10) => {
    try {
        const URL = `${API_URL}/api/get-blogs?page=${page}&fetchAmount=${fetchAmount}`;
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
        const URL = `${API_URL}/api/get-post-tags`;
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
        if (!csrfToken) {
            await fetchCsrfToken();
        }
        console.log(formData)
        const URL = `${API_URL}/api/update-profile`;
        const response = await fetch(URL, {
            method: "POST",
            headers: {
                "x-csrf-token": csrfToken,
            },
            credentials: "include",
            body: formData,
        });

        const contentType = response.headers.get("content-type");

        console.log(contentType)

        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.log("Error updating profile, ", error);
    }
};

export const deletePost = async (id: number) => {
    try {
        const URL = `${API_URL}/api/admin/delete-post?id=${id}`;
        const response = await fetch(URL, {
            method: "DELETE",
            credentials: "include",
            headers: {
                "x-csrf-token": csrfToken,
            },
        });
    } catch (error) {

    }
};

export const signOut = async () => {
    try {
        const URL = `${API_URL}/api/sign-out`;
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
