import { render, screen } from '@testing-library/react';
import Menu from './menu';

describe('Teste do componente de menu', () => {
  it('deve renderizar o componente sem erros', () => {
    render(
      <Menu
        produtos={[]}
        handleExibirCheckout={() => false}
        handleExibirProdutos={() => false}
      />
    );
    const linkElement = screen.getByText(/mini ecommerce/i);
    expect(linkElement).toBeInTheDocument();
  });
});
