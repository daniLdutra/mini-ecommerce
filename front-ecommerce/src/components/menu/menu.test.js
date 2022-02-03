import { render, screen } from '@testing-library/react';
import Menu from './menu';

describe('Teste do componente de menu', () => {
  it('deve renderizar o componente sem erros', () => {
    render(<Menu />);
    const linkElement = screen.getByText(/menu/i);
    expect(linkElement).toBeInTheDocument();
  });
});
