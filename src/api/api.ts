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