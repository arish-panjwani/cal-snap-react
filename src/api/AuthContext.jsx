import React, { createContext, useContext, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { APIRequest } from './helper';
import { URLs } from "./apiConstant";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); 
    const queryClient = useQueryClient();
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const [loginError, setLoginError] = useState(null);

    
    // Fetch user from an endpoint if already logged in (e.g., JWT stored in cookies)
    // const { data: userData, refetch } = useQuery({
    //     queryKey: ['authUser'],
    //     queryFn: async () => {
    //       const urlRequest = { URL: '/user', METHOD: 'GET' };
    //       return APIRequest({ urlRequest });
    //     },
    //     enabled: false, // Disabled initially, we will manually refetch it when needed
    //   });

    
    //  Function to handle login, where you update the state with mock or actual user data
     const login = (userData) => {
        setUser(userData); // This will set the mock or actual user data in the state
        queryClient.invalidateQueries(['authUser']); // Invalidate user query (optional)
    };

    // const login = async (credentials) => {
    //   setIsLoggingIn(true);
    //   setLoginError(null);
    //   try {
    //     const data = await APIRequest(URLs.USER_LOGIN.URL, 'POST', credentials);
    //     if (data.statusCode == '200'){
    //       const userData = await APIRequest(URLs.GET_USER_BY_ID.URL + '1', 'GET');
    //       setUser(userData); // Update user state upon successful login
    //       console.log('User logged in:', userData);
    //     }
    //   } catch (error) {
    //     setLoginError(error.message);
    //     console.error('Login failed:', error.message);
    //     throw error;
    //   } finally {
    //     setIsLoggingIn(false);
    //   }
    // };

    // Function to handle logout
    // const { mutate: logout, isLoading: isLoggingOut, error: logoutError } = useMutation({
    //     mutationFn: async () => {
    //         const urlRequest = { URL: '/logout', METHOD: 'POST' };
    //         return APIRequest({ urlRequest });
    //       },
    //     onSuccess: () => {
    //       setUser(null);
    //       queryClient.invalidateQueries(['authUser']);
    //       navigate("/login"); // Redirect to login after logout
    //     },
    //     onError: (error) => {
    //       console.error(error);
    //       alert("Logout failed! Please try again.");
    //     }
    //   });

    return (
        // <AuthContext.Provider value={{ user, login, logout, refetchUser: refetch, isLoggingOut, loginError, logoutError }}>
        <AuthContext.Provider value={{ user, login, isLoggingIn, loginError }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
