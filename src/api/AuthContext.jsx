/** @format */

import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { createContext, useContext, useEffect, useState } from "react";
import { URLs } from "./apiConstant";
import { APIRequest, handleLogin } from "./helper";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const queryClient = useQueryClient();
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginError, setLoginError] = useState(null);

  // Fetch user from an endpoint if already logged in (e.g., JWT stored in cookies)
  const {
    data: userData,
    isLoading: isFetchingUser,
    refetch,
  } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      const urlRequest = { URL: "/user", METHOD: "GET" };
      return APIRequest({ urlRequest });
    },
    onSuccess: (data) => {
      setUser(data); // Set the user on successful fetch
    },
    onError: () => {
      setUser(null); // Clear the user if the fetch fails
    },
    enabled: false, // Disabled initially, we will manually refetch it when needed
  });

  // Automatically fetch the user if there's a token
  useEffect(() => {
    const token = localStorage.getItem("authToken"); // Check if token exists
    if (token) {
      refetch(); // Fetch user data if logged in
    }
  }, [refetch]);

  const login = async (credentials) => {
    setIsLoggingIn(true);
    setLoginError(null);
    try {
      const data = await APIRequest(URLs.USER_LOGIN.URL, "POST", credentials);
      if (data.statusCode == "200") {
        handleLogin(String(data.data.userId));
        localStorage.setItem("authToken", data.data.userId); // Save token
        const userData = await APIRequest(
          URLs.GET_USER_BY_ID.URL + String(data.data.userId),
          "GET"
        );
        setUser(userData); // Update user state upon successful login
        return userData;
      }
    } catch (error) {
      setLoginError(error.message);
      console.error("Login failed:", error.message);
      throw error;
    } finally {
      setIsLoggingIn(false);
    }
  };

  const logout = async () => {
    try {
      await APIRequest({ URL: "/logout", METHOD: "POST" });
      setUser(null);
      localStorage.removeItem("authToken"); // Clear token
      queryClient.invalidateQueries(["authUser"]);
    } catch (error) {
      console.error("Logout failed:", error.message);
      alert("Logout failed! Please try again.");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isLoggingIn,
        loginError,
        isFetchingUser,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
