// frontend/src/components/Button/Button.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Button from './Button'; // Assuming a Button component exists at src/components/Button/Button.js

describe('Button Component', () => {
  test('renders with default text', () => {
    render(<Button>Click Me</Button>);
    expect(screen.getByText('Click Me')).toBeInTheDocument();
  });

  test('calls onClick handler when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Test Button</Button>);
    fireEvent.click(screen.getByText('Test Button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('renders with a custom class name', () => {
    render(<Button className="custom-button">Styled Button</Button>);
    expect(screen.getByText('Styled Button')).toHaveClass('custom-button');
  });

  test('is disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled Button</Button>);
    expect(screen.getByText('Disabled Button')).toBeDisabled();
  });
});

// Placeholder for a hypothetical Button component
// In a real scenario, frontend/src/components/Button/Button.js would look something like:
// import React from 'react';
// const Button = ({ children, onClick, className, disabled }) => (
//   <button onClick={onClick} className={className} disabled={disabled}>
//     {children}
//   </button>
// );
// export default Button;