import React, { createContext, useContext, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { APIRequest } from './helper';
import { URLs } from "./apiConstant";
import useApiMutation  from './useApiMutation';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); 
    const queryClient = useQueryClient();

    
    // Fetch user from an endpoint if already logged in (e.g., JWT stored in cookies)
    const { data: userData, refetch } = useQuery({
        queryKey: ['authUser'],
        queryFn: async () => {
          const urlRequest = { URL: '/user', METHOD: 'GET' };
          return APIRequest({ urlRequest });
        },
        enabled: false, // Disabled initially, we will manually refetch it when needed
      });

    
    //  Function to handle login, where you update the state with mock or actual user data
    //  const login = (userData) => {
    //     setUser(userData); // This will set the mock or actual user data in the state
    //     queryClient.invalidateQueries(['authUser']); // Invalidate user query (optional)
    // };

    // Mutation to handle login
    // const { mutate: login, isLoading: isLoggingIn, error: loginError } = useMutation({
    //     mutationFn: ({ username, password }) => {
    //       const urlRequest = { URL: URLs.USER_LOGIN, METHOD: 'POST' }; // Dynamic URL and method
    //       return APIRequest({ urlRequest, body: { username, password } });
    //         // return APIRequest({ urlRequest: URLs.GET_USERS });
    //       },
    //     onSuccess: (data) => {
    //       console.log("Login successful:", data);
    //     //   if (data && data.user) {
    //     //     setUser(data.user); // Set the logged-in user
    //     //     queryClient.invalidateQueries(['authUser']); // Invalidate user query
    //     //     navigate("/dashboard"); // Navigate to dashboard after successful login
    //     //   } else {
    //     //     alert("Invalid user!");
    //     //   }
    //     // if (data){
    //     //             navigate("/dashboard");  
    //     //           }
    //     //           else {
    //     //             alert("Invalid user!")
    //     //           }
    //     },
    //     onError: (error) => {
    //       console.error(error); // Handle login errors
    //       alert("Login failed! Please try again.");
    //     }
    //   });

      const { mutate: login, isLoading, isError, data, error } = useApiMutation(URLs.USER_LOGIN.URL, 'POST', {
        onSuccess: (data) => {
          console.log('Mutation successful:', data);
        },
        onError: (error) => {
          console.error('Mutation failed:', error.message);
        },
      });

    // Function to handle logout
    const { mutate: logout, isLoading: isLoggingOut, error: logoutError } = useMutation({
        mutationFn: async () => {
            const urlRequest = { URL: '/logout', METHOD: 'POST' };
            return APIRequest({ urlRequest });
          },
        onSuccess: () => {
          setUser(null);
          queryClient.invalidateQueries(['authUser']);
          navigate("/login"); // Redirect to login after logout
        },
        onError: (error) => {
          console.error(error);
          alert("Logout failed! Please try again.");
        }
      });

    return (
        // <AuthContext.Provider value={{ user, login, logout, refetchUser: refetch, isLoggingOut, loginError, logoutError }}>
        <AuthContext.Provider value={{ user, login, logout, refetchUser: refetch, isLoggingOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
