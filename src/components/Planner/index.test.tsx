import React from 'react';
import { render, screen } from '@testing-library/react';
import Planner from '.';

test('renders learn react link', () => {
  render(<Planner />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
