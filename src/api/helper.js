  export const APIRequest = async ({urlRequest, body}) => {
    try {
        let url = urlRequest.URL;
        let method = urlRequest.METHOD;
        console.log(url);
        console.log(method);
        const response = await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: body ? JSON.stringify(body) : undefined
        });
  
        if (!response.ok) {
            const errorMessage = await response.text(); // Get the response as text for debugging
            throw new Error(`Error: ${response.status} ${response.statusText} - ${errorMessage}`);
        }

        // Check if the response is in JSON format
        const contentType = response.headers.get('Content-Type');
        if (!contentType || !contentType.includes('application/json')) {
            throw new Error(`Expected JSON response, but got ${contentType}`);
        }

        console.log(response);
        // Return the JSON data from the response
        return await response.json();
    } catch (error) {
        console.error("API request failed: ", error);
        throw error;
    }
};