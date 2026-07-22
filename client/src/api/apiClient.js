/**
 * A utility for making API calls with built-in error handling.
 * Assumes a backend that returns JSON error objects with 'message' and 'statusCode'.
 */

const API_BASE_URL = 'http://localhost:3001/api'; // Adjust as per your backend URL

/**
 * Generic API call wrapper with error handling.
 * @param {string} endpoint - The API endpoint (e.g., '/users').
 * @param {object} options - Fetch API options (method, headers, body, etc.).
 * @param {function} onError - Callback function to handle errors (e.g., display a toast).
 * @returns {Promise<object>} - The parsed JSON response data.
 * @throws {Error} - Throws an error if the API call fails or returns an error status.
 */
export const apiClient = async (endpoint, options = {}, onError = (message) => console.error('API Error:', message)) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const defaultHeaders = {
    'Content-Type': 'application/json',
    // Add any default authorization headers here if needed
    // 'Authorization': `Bearer ${localStorage.getItem('token')}`,
  };

  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);

    // Check for network errors or non-OK HTTP status codes
    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json(); // Attempt to parse error body
      } catch (parseError) {
        // If response is not JSON or parsing fails
        const errorMessage = `HTTP error! Status: ${response.status} ${response.statusText}`;
        onError(errorMessage);
        throw new Error(errorMessage);
      }

      // Use backend's error message if available, otherwise a generic one
      const errorMessage = errorData.message || `Request failed with status ${response.status}.`;
      onError(errorMessage);
      // Re-throw the error to be caught by the calling component if needed
      throw new Error(errorMessage, { cause: errorData });
    }

    // If response is OK, parse and return data
    return await response.json();

  } catch (networkError) {
    // This catches network errors (e.g., server unreachable, CORS issues)
    const errorMessage = `Network error: ${networkError.message}. Please check your internet connection or try again later.`;
    onError(errorMessage);
    throw new Error(errorMessage, { cause: networkError });
  }
};
