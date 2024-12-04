export const GET = "GET";
export const POST = "POST";
export const PUT = "PUT";
export const DELETE = "DELETE";

export const BASE_URL = import.meta.env.VITE_API_URL;

export const URLs = {
    USER_LOGIN: {
      URL: `${BASE_URL}/login`,
      // URL: `/login`,
      METHOD: GET
    },
    GET_USERS:{
      URL: `${BASE_URL}/getUsers`,
      METHOD: GET
    },
    ADD_USER:{
      URL: `${BASE_URL}/addUser`,
      METHOD: POST
    },
    UPDATE_USER:{
      URL: `${BASE_URL}/updateUser`,
      METHOD: PUT
    },
    GET_USER_BY_ID:{
      URL: `${BASE_URL}/users/`,
      METHOD: GET
    },
    DELETE_USER_BY_ID:{
      URL: `${BASE_URL}/deleteUser/`,
      METHOD: DELETE
    },
    GET_ITEM_NUTRIENTS:{
      URL: `${BASE_URL}/getItemNutrients`,
      METHOD: GET
    },
    GET_ITEM_NUTRIENT_BY_NAME:{
      URL: `${BASE_URL}/getItemNutrients/`,
      METHOD: GET
    },
    GET_CALORIE_CONSUMPTION:{
      URL: `${BASE_URL}/getItemNutrients/`,
      METHOD: POST
    },
    GET_HEALTH_SCORE:{
      URL: `${BASE_URL}/getItemNutrients/`,
      METHOD: POST
    },
    GET_CALORIE_CONSUMPTION_FOR_LINE_CHART:{
      URL: `${BASE_URL}/getItemNutrients/`,
      METHOD: POST
    },
    GET_MACRO_NUTRIENT_DATA:{
      URL: `${BASE_URL}/getItemNutrients/`,
      METHOD: POST
    }          
};