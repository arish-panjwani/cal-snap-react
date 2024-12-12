/** @format */

import { debuggingMode } from "../utils/helper";

/** @format */

export const APIRequest = async (url, method, data = null) => {
  try {
    debuggingMode
      ? console.info("APIRequest try", { url, method, data })
      : undefined;
    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: data ? JSON.stringify(data) : null,
    });
    debuggingMode ? console.info("APIRequest response", response) : undefined;
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Something went wrong");
    }
    return await response.json();
  } catch (error) {
    debuggingMode ? console.info("APIRequest catch", error) : undefined;
    console.error(
      "API Call Error:",
      typeof error.message === Object ||
        (typeof error.message === string && JSON.stringify(error.message))
    );
    throw error;
  }
};

export const UpdatedAPIRequest = async (url, method, data = null) => {
  try {
    debuggingMode
      ? console.info("APIRequest initiated:", { url, method, data })
      : undefined;
    const response = await fetch(url, {
      method,
      headers:
        data instanceof FormData
          ? undefined
          : { "Content-Type": "application/json" },
      body: data
        ? data instanceof FormData
          ? data
          : JSON.stringify(data)
        : null,
    });

    debuggingMode
      ? console.info("APIRequest response status:", response.status)
      : undefined;

    if (!response.ok) {
      // Try to parse error from response body
      const error = await response.json().catch(() => ({
        message: "Unknown error",
      }));
      console.error("APIRequest not OK:", error);
      throw new Error(error.message || `HTTP Error ${response.status}`);
    }

    // Parse the response JSON
    const jsonResponse = await response.json();
    debuggingMode
      ? console.info("APIRequest success:", jsonResponse)
      : undefined;
    return jsonResponse;
  } catch (error) {
    console.error("APIRequest error:", error.message);
    throw error;
  }
};

// Function to handle login and set the userId cookie
export const handleLogin = (userId) => {
  localStorage.setItem("userId", userId);
  debuggingMode
    ? console.log("User logged in, user id set:", userId)
    : undefined;
};

// Function to handle logout and remove the userId cookie
export const handleLogout = () => {
  removeAllCookies();
  debuggingMode ? console.log("User logged out, cookie removed") : undefined;
};

export const setAnyCookie = (key, value, expiry = 7) => {
  localStorage.setItem(key, value);
  // Cookies.set(key, value, { expires: expiry }); // Set cookie to expire in 7 days
};

export const getAnyCookie = (key) => {
  return localStorage.getItem(key);
  // return Cookies.get(key); // Get cookie
};

export const removeAnyCookie = (key) => {
  localStorage.removeItem(key);
  // Cookies.remove(key); // Removes cookie
};

const removeAllCookies = () => {
  localStorage.clear();
};
