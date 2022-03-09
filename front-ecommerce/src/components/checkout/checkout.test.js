import { render, fireEvent } from '@testing-library/react';
import Checkout from './checkout';
import axiosMock from 'axios';

describe('Teste do componente checkout', () => {
  const dadosFinalizarCompra = {
    email: 'email@test.com',
    nomeCompleto: 'Fulano de Tal',
    cpf: '293.462.345-98',
    endereco: 'Rua dos Cadastros, 389',
    cidade: 'São Paulo',
    estado: 'SP',
    cep: '12345-678',
    termosCondicoes: true,
    emailPromocional: 'S',
    dataNascimento: new Date('1998-07-20T23:00:00.000Z'),
    produtos: '{}',
    total: 'R$ 10,00',
  };

  it('deve finalizar a compra com sucesso', async () => {
    axiosMock.get.mockResolvedValueOnce({ data: ['São Paulo', 'São Pedro'] });
    const { findByTestId, getByTestId, getByPlaceholderText } = render(
      <Checkout
        visivel={true}
        handleExibirProdutos={() => false}
        total={'10,00'}
        produtos={{}}
        handleLimparCarrinho={() => false}
      />
    );
    fireEvent.change(getByTestId('txt-email'), {
      target: { value: 'email@test.com' },
    });
    fireEvent.change(getByTestId('txt-nome-completo'), {
      target: { value: 'Fulano de Tal' },
    });
    fireEvent.change(getByPlaceholderText('Selecione a data'), {
      target: { value: '1998-07-20T23:00:00.000Z' },
    });
    fireEvent.change(getByTestId('txt-cpf'), {
      target: { value: '293.462.345-98' },
    });
    fireEvent.change(getByTestId('txt-endereco'), {
      target: { value: 'Rua dos Cadastros, 389' },
    });
    fireEvent.change(getByTestId('txt-estado'), { target: { value: 'SP' } });
    const cidade = await findByTestId('cidade');
    fireEvent.change(cidade, { target: { value: 'São Paulo' } });
    fireEvent.change(getByTestId('txt-cep'), {
      target: { value: '12345-678' },
    });
    fireEvent.click(getByTestId('check-termos-condicoes'));
    fireEvent.click(getByTestId('btn-finalizar-compra'));
    const modal = await findByTestId('modal-compra-sucesso');
    expect(modal).toHaveTextContent('Compra realizada com sucesso!');
    expect(axiosMock.get).toHaveBeenCalledTimes(1);
    expect(axiosMock.post).toHaveBeenCalledTimes(1);
    expect(axiosMock.post.mock.calls[0][1]).toStrictEqual(dadosFinalizarCompra);
  });
});
