/**
 * Generic error handling middleware for Express applications.
 * Catches errors, logs them, and sends a standardized JSON error response to the client.
 */
const errorHandler = (err, req, res, next) => {
  // Log the error for debugging purposes (e.g., to console, file, or a logging service)
  console.error('Error caught by middleware:', err.stack || err);

  // Determine the status code and message
  const statusCode = err.statusCode || 500; // Default to 500 Internal Server Error
  const message = err.message || 'An unexpected error occurred.';

  // Send a standardized JSON error response
  res.status(statusCode).json({
    status: 'error',
    statusCode: statusCode,
    message: message,
    // In development, you might include the stack trace for debugging
    // stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
};

module.exports = errorHandler;
