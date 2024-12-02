// useApiMutation.js
import { useMutation } from '@tanstack/react-query';
import { apiCall } from './api';

const useApiMutation = (url, method, config = {}) => {
  return useMutation(
    async (data) => {
      return apiCall({ url, method, body: data });
    },
    config // Pass TanStack Query config (onSuccess, onError, etc.)
  );
};

export default useApiMutation;
