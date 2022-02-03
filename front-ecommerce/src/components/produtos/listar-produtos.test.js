import { render } from '@testing-library/react';
import ListarProdutos from './listar-produtos';

describe('Teste do componente listagem de produtos', () => {
  it('deve exibir o nome dos produtos nos cards', () => {
    const { getByTestId } = render(
      <ListarProdutos
        adicionarProduto={() => false}
        exibirMensagem={() => false}
      />
    );
    expect(getByTestId('card1')).toHaveTextContent('Aprenda Java');
    expect(getByTestId('card2')).toHaveTextContent('JavaScript em 24 horas');
  });

  it('deve exibir as descricoes dos produtos no card', () => {
    const { getByTestId } = render(
      <ListarProdutos
        adicionarProduto={() => false}
        exibirMensagem={() => false}
      />
    );
    expect(getByTestId('card1')).toHaveTextContent('Descrição do produto...');
    expect(getByTestId('card3')).toHaveTextContent('Descrição do produto...');
  });

  it('deve exibir o preço dos produtos nos botões de comprar', () => {
    const { getByTestId } = render(
      <ListarProdutos
        adicionarProduto={() => false}
        exibirMensagem={() => false}
      />
    );
    expect(getByTestId('card1')).toHaveTextContent('Comprar (R$ 59,99)');
    expect(getByTestId('card2')).toHaveTextContent('Comprar (R$ 19,99)');
  });
});
