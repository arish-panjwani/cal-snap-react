import { useMutation } from '@tanstack/react-query';

const useApiMutation = (url, method, config = {}) => {
  return useMutation(
    async (data) => {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    },
    config
  );
};

export default useApiMutation;