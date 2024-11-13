export const APIRequest = ({urlRequest, body}) => {
    // try {
    //     let url = urlRequest.URL;
    //     let method = urlRequest.METHOD;
    //     console.log(url);
    //     console.log(method);
    //     const response = await fetch(urlRequest.URL, {
    //         // method: urlRequest.METHOD,
    //         method: "GET",
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: body ? JSON.stringify(body) : undefined,
    //     });
    //     console.log(response);
  
    //     if (!response.ok) {
    //         const errorMessage = await response.text();
    //         throw new Error(errorMessage);
    //     }
    //     // Check if the response is in JSON format
    //     const contentType = response.headers.get('Content-Type');
    //     if (!contentType || !contentType.includes('application/json')) {
    //         throw new Error(`Expected JSON response, but got ${contentType}`);
    //     }
    //     console.log(response);
    //     // Return the JSON data from the response
    //     return await response.json();
    // } catch (error) {
    //     console.error("API Request failed:", error);
    //     throw error;
    // }

    const url = urlRequest.URL;
    const method = urlRequest.METHOD || 'GET';

    console.log("Request URL:", url);
    console.log("Request Method:", method);

    const headers = method === 'GET' ? {} : { 'Content-Type': 'application/json' };

    return fetch(url, {
        method: method,
        headers: headers,
        body: body ? JSON.stringify(body) : undefined,
    })
    .then(response => {
        if (!response.ok) {
            return response.text().then(text => { throw new Error(text); });
        }
        // Check the Content-Type to decide how to parse the response
        // const contentType = response.headers.get('Content-Type');
        
        // if (contentType && contentType.includes('application/json')) {
        //     return response.json(); // Parse as JSON if the response is JSON
        // } else if (contentType && contentType.includes('text/plain')) {
        //     return response.text(); // Parse as plain text if the response is text
        // } else {
        //     throw new Error(`Unsupported content type: ${contentType}`);
        // }

        // Always treat the response as plain text regardless of the Content-Type header
        // return response.text(); // Treat the response as text, even if Content-Type is 'application/json'

        return response.text().then(text => {
            try {
                // Attempt to parse text as JSON for all responses
                return JSON.parse(text);
            } catch (error) {
                console.error("Error parsing text as JSON:", error); // Log parsing errors
                throw new Error("Invalid JSON format received");
            }
        });
    })
    .then(data => {
        console.log("Request successful:", data);
        return data;
    })
    .catch(error => {
        console.error("Request failed:", error.message);
        throw error;
    });
};