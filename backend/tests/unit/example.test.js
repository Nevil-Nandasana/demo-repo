// backend/tests/unit/example.test.js
const { add } = require('../../src/utils/math'); // Assuming a utility file

describe('Math Utility Functions', () => {
  test('add function should correctly add two numbers', () => {
    expect(add(1, 2)).toBe(3);
    expect(add(-1, 1)).toBe(0);
    expect(add(0, 0)).toBe(0);
  });

  // Add more unit tests for other utility functions
});

// Placeholder for a hypothetical math utility file
// In a real scenario, this file would exist at backend/src/utils/math.js
// module.exports = {
//   add: (a, b) => a + b,
//   subtract: (a, b) => a - b,
// };