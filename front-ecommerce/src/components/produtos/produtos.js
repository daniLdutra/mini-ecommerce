import ListarProdutos from './listar-produtos';
import Proptypes from 'prop-types';
import { Alert } from 'react-bootstrap';
import { useState } from 'react';

function Produtos(props) {
  const [exibirMsg, setExibirMsg] = useState(false);
  const [produto, setProduto] = useState('');

  function visivel() {
    return props.visivel ? null : 'hidden';
  }

  function exibirMensagem(produto) {
    setExibirMsg(true);
    setProduto(produto.nome);
    setTimeout(() => {
      setExibirMsg(false);
    }, 3000);
  }

  return (
    <div className={visivel}>
      <Alert variant="success" style={{ margin: '10px' }} show={exibirMsg}>
        <b>{produto} adicionado com sucesso ao carrinho!</b>
      </Alert>
      <ListarProdutos
        exibirMensagem={exibirMensagem}
        adicionarProduto={props.adicionarProduto}
      />
    </div>
  );
}

Produtos.propTypes = {
  visivel: Proptypes.bool.isRequired,
  adicionarProduto: Proptypes.func.isRequired,
};
export default Produtos;
