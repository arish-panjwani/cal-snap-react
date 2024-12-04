export const APIRequest = async (url, method, data = null) => {
    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: data ? JSON.stringify(data) : null,
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Something went wrong');
      }
      return await response.json();
    } catch (error) {
      console.error('API Call Error:', error.message);
      throw error;
    }
  };
  