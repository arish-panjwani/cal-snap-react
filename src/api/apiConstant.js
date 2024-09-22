export const GET = "GET";
export const POST = "POST";
export const PUT = "PUT";
export const DELETE = "DELETE";

export const BASE_URL = process.env.REACT_APP_API_URL;

export const URLs = {
    USER_LOGIN: {
      URL: `${BASE_URL}/login`,
      METHOD: POST
    },
    GET_USER:{
      URL: `${BASE_URL}`,
      METHOD: GET
    }   
};