import { render } from '@testing-library/react';
import Checkout from './checkout';

describe('Teste do componente checkout', () => {
  it('deve renderizar o componente sem erros', () => {
    const { getAllByText } = render(<Checkout />);
    const textos = getAllByText('Finalizar compra');
    expect(textos[0]).toBeInTheDocument();
  });
});
