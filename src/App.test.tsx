import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders departments menu', () => {
  render(<App />);
  const menuItem = screen.getByText(/departments/i);
  expect(menuItem).toBeInTheDocument();
});
