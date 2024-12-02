export const APIRequest = async ({ urlRequest, body }) => {
    const { URL, METHOD = 'GET' } = urlRequest;

    try {
        const response = await fetch(URL.URL, {
            method: METHOD,
            headers: {
                'Content-Type': 'application/json',
            },
            body: body ? JSON.stringify(body) : null,
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(errorMessage || "Error occurred");
        }

        return await response.json();
    } catch (error) {
        console.error("APIRequest error:", error);
        throw error;
    }
};
