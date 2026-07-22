import React, { useState } from 'react';
import { apiClient } from './api/apiClient';

function App() {
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // A simple function to display errors to the user
  const displayError = (errorMessage) => {
    setError(errorMessage);
    console.error('Frontend Error Display:', errorMessage);
    // In a real application, you would integrate with a toast library (e.g., react-toastify)
    // toast.error(errorMessage);
  };

  const handleSuccessClick = async () => {
    setLoading(true);
    setError(null);
    setMessage('');
    try {
      const data = await apiClient('/success', {}, displayError);
      setMessage(data.message + ' Data: ' + JSON.stringify(data.data));
    } catch (err) {
      // Error already handled by displayError in apiClient, but can do more here if needed
      setMessage('Failed to fetch data.');
    } finally {
      setLoading(false);
    }
  };

  const handleBadRequestClick = async () => {
    setLoading(true);
    setError(null);
    setMessage('');
    try {
      // This call is missing the 'name' in the body, which will trigger a 400 error
      const data = await apiClient('/bad-request', {
        method: 'POST',
        body: JSON.stringify({ /* name: 'Test Item' */ })
      }, displayError);
      setMessage(data.message);
    } catch (err) {
      setMessage('Failed to create item due to bad request.');
    } finally {
      setLoading(false);
    }
  };

  const handleServerErrorClick = async () => {
    setLoading(true);
    setError(null);
    setMessage('');
    try {
      const data = await apiClient('/server-error', {}, displayError);
      setMessage(data.message);
    } catch (err) {
      setMessage('Failed due to a server error.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Error Handling Demo</h1>
      <p>This demo illustrates robust error handling from backend to frontend.</p>

      <div style={{ marginBottom: '20px' }}>
        <button onClick={handleSuccessClick} disabled={loading} style={{ marginRight: '10px', padding: '10px 15px' }}>
          {loading ? 'Loading...' : 'Fetch Success Data'}
        </button>
        <button onClick={handleBadRequestClick} disabled={loading} style={{ marginRight: '10px', padding: '10px 15px' }}>
          {loading ? 'Loading...' : 'Trigger Bad Request (400)'}
        </button>
        <button onClick={handleServerErrorClick} disabled={loading} style={{ padding: '10px 15px' }}>
          {loading ? 'Loading...' : 'Trigger Server Error (500)'}
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red', fontWeight: 'bold' }}>Error: {error}</p>}
      {message && <p style={{ color: 'green' }}>{message}</p>}

      <h2 style={{ marginTop: '30px' }}>Instructions:</h2>
      <ol>
        <li>Ensure your backend server is running (e.g., `node server/app.js`).</li>
        <li>Click 'Fetch Success Data' to see a successful API call.</li>
        <li>Click 'Trigger Bad Request (400)' to see a client-side validation error handled.</li>
        <li>Click 'Trigger Server Error (500)' to see an unexpected backend error handled.</li>
        <li>Observe the error messages displayed below the buttons.</li>
      </ol>
    </div>
  );
}

export default App;
