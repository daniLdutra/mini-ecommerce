import { render, screen } from '@testing-library/react';
import MiniEcommerce from './mini-ecommerce-front';

test('renders learn react link', () => {
  render(<MiniEcommerce />);
  const linkElement = screen.getByText(/mini ecommerce/i);
  expect(linkElement).toBeInTheDocument();
});
