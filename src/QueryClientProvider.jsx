import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './api/AuthContext';

const queryClient = new QueryClient();

const MyQueryClientProvider = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      {children}
    </AuthProvider>
  </QueryClientProvider>
);

export default MyQueryClientProvider;