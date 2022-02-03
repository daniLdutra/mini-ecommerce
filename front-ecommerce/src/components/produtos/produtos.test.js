import { render, screen } from '@testing-library/react';
import Produtos from './produtos';

describe('Teste do componente produtos', () => {
  it('deve renderizar o componente quando visivel', () => {
    const { getAllByText } = render(
      <Produtos visivel={true} adicionarProduto={() => false} />
    );
    const botoes = getAllByText(/comprar/i);
    expect(botoes).toBeTruthy();
  });
});
