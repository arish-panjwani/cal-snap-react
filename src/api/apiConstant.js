export const GET = "GET";
export const POST = "POST";
export const PUT = "PUT";
export const DELETE = "DELETE";

export const BASE_URL = "https://";

export const URLs = {
    USER_LOGIN: {
      URL: `${BASE_URL}auth/login`,
      METHOD: POST
    },
    GET_USER:{
      URL: `https://66eafbcd55ad32cda47b3aa6.mockapi.io/user`,
      METHOD: GET
    }   
};