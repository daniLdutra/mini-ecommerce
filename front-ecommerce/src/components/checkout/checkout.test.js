import { render, screen } from '@testing-library/react';
import Checkout from './checkout';

describe('Teste do componente checkout', () => {
  it('deve renderizar o componente sem erros', () => {
    render(<Checkout />);
    const linkElement = screen.getByText(/checkout/i);
    expect(linkElement).toBeInTheDocument();
  });
});
