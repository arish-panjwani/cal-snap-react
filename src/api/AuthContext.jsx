/** @format */

import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { createContext, useContext, useEffect, useState } from "react";
import { URLs } from "./apiConstant";
import { APIRequest, handleLogin, handleLogout } from "./helper";

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
      const userId = localStorage.getItem("authToken");
      if (!userId) {
        throw new Error("No stored user id");
      }
      return APIRequest(
        URLs.GET_USER_BY_ID.URL + userId,
        URLs.GET_USER_BY_ID.METHOD
      );
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
      const data = await APIRequest(
        URLs.USER_LOGIN.URL,
        URLs.USER_LOGIN.METHOD,
        credentials
      );

      if (data.statusCode === "200") {
        const userId = String(data.data.userId);
        handleLogin(userId);
        localStorage.setItem("authToken", userId);

        const userData = await APIRequest(
          URLs.GET_USER_BY_ID.URL + userId,
          URLs.GET_USER_BY_ID.METHOD
        );

        setUser(userData);
        return userData;
      } else {
        const message =
          data.message || "Login failed. Please check your credentials.";
        setLoginError(message);
        throw new Error(message);
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
      handleLogout();
      setUser(null);
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
