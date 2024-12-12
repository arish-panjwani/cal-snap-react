/** @format */

export const GET = "GET";
export const POST = "POST";
export const PUT = "PUT";
export const DELETE = "DELETE";

export const BASE_URL = import.meta.env.VITE_API_URL;
export const BASE_URL_IMG = import.meta.env.VITE_API_IMG_URL;
export const BASE_HEALTH_SCORE_URL = import.meta.env.VITE_API_HEALTH_SCORE_URL;

// Exercise Calorie Open API Integration
export const EXERCISE_CALORIE_URL = "https://api.api-ninjas.com/v1/";
export const EXERCISE_CALORIE_API_KEY_1 =
  "fx+zDxu1YKKPPjxC49OTZQ==RqEAua7fchsl1O11";

export const URLs = {
  USER_LOGIN: {
    URL: `${BASE_URL}/login`,
    METHOD: GET,
  },
  GET_USERS: {
    URL: `${BASE_URL}/users/`,
    METHOD: GET,
  },
  ADD_USER: {
    URL: `${BASE_URL}/users/save`,
    METHOD: POST,
  },
  UPDATE_USER: {
    URL: `${BASE_URL}/users/update`,
    METHOD: PUT,
  },
  GET_USER_BY_ID: {
    URL: `${BASE_URL}/users/`,
    METHOD: GET,
  },
  DELETE_USER_BY_ID: {
    URL: `${BASE_URL}/deleteUser/`,
    METHOD: DELETE,
  },
  GET_ITEM_NUTRIENTS: {
    URL: `${BASE_URL}/getItemNutrients`,
    METHOD: GET,
  },
  GET_ITEM_NUTRIENT_BY_NAME: {
    URL: `${BASE_URL}/itemsNutrients/Name?name=`,
    METHOD: GET,
  },
  GET_CALORIE_CONSUMPTION: {
    URL: `${BASE_URL}/getItemNutrients/`,
    METHOD: POST,
  },
  GET_HEALTH_RISK_SCORE: {
    URL: `${BASE_URL}/healthScoreRecords/`,
    METHOD: GET,
  },
  GET_CALORIE_CONSUMPTION_FOR_LINE_CHART: {
    URL: `${BASE_URL}/getItemNutrients/`,
    METHOD: POST,
  },
  GET_MACRO_NUTRIENT_DATA: {
    URL: `${BASE_URL}/getItemNutrients/`,
    METHOD: POST,
  },
  POST_FOOD_ITEM_NUTRIENTS: {
    URL: `${BASE_URL}/caloriesConsumptionRecords/save`,
    METHOD: POST,
  },
  GET_FOOD_ITEM_NUTRIENTS: {
    URL: `${BASE_URL}/caloriesConsumptionRecords/UserId?userId=`,
    METHOD: GET,
  },
  SEND_EXERCISE_ENTRY: {
    URL: `${BASE_URL}/exerciseRecords/save`,
    METHOD: POST,
  },
  GET_EXERCISE_DATA: {
    URL: `${BASE_URL}/exerciseRecords/UserId?userId=`,
    METHOD: GET,
  },
  DELETE_EXERCISE: {
    URL: `${BASE_URL}/exerciseRecords`,
    METHOD: DELETE,
  },
  IMAGE_REC: {
    URL: `${BASE_URL_IMG}/upload`,
    METHOD: POST,
  },
  GET_HEALTH_SCORE: {
    URL: `${BASE_HEALTH_SCORE_URL}/predict_health_risk`,
    METHOD: POST,
  },
  SEND_HEALTH_RISK_SCORE: {
    URL: `${BASE_URL}/healthScoreRecords/save`,
    METHOD: POST,
  },
};
