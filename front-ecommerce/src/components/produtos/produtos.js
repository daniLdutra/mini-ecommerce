import ListarProdutos from './listar-produtos';
import Proptypes from 'prop-types';

function Produtos(props) {
  return <ListarProdutos />;
}

Produtos.propTypes = {
  visivel: Proptypes.bool.isRequired,
  adicionarProduto: Proptypes.func.isRequired,
};
export default Produtos;
