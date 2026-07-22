const express = require('express');
const router = express.Router();

// Example route that might succeed
router.get('/success', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Data fetched successfully!',
    data: { item: 'Example Item', value: 123 }
  });
});

// Example route that might throw an operational error (e.g., bad request)
router.post('/bad-request', (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    // Create a custom error object with a status code
    const error = new Error('Name is required for this operation.');
    error.statusCode = 400; // Bad Request
    return next(error); // Pass to error handling middleware
  }
  res.status(201).json({
    status: 'success',
    message: `Item '${name}' created successfully.`
  });
});

// Example route that might throw an unexpected server error
router.get('/server-error', (req, res, next) => {
  // Simulate an unexpected error (e.g., database connection issue, unhandled exception)
  try {
    throw new Error('Something went wrong on the server!');
  } catch (error) {
    next(error); // Pass to error handling middleware
  }
});

module.exports = router;
