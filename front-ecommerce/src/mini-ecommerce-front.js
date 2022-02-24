import './mini-ecommerce.css';
import { useState } from 'react';
import Menu from './components/menu/menu';
import Produtos from './components/produtos/produtos';
import Checkout from './components/checkout/checkout';

function MiniEcommerce() {
  const [carrinho, setCarrinho] = useState({ produtos: [] });
  const [exibirProdutos, setExibirProdutos] = useState(true);
  const [exibirCheckout, setExibirCheckout] = useState(false);
  const [total, setTotal] = useState('0,00');

  function adicionarProduto(produto) {
    //copia do objeto carrinho
    const objCarrinho = Object.assign({}, carrinho);
    //atualizar a quantidade
    let novoProduto = true;
    objCarrinho.produtos.forEach((prod, indice) => {
      if (prod.nome === produto.nome) {
        objCarrinho.produtos[indice].quantidade++;
        novoProduto = false;
      }
    });
    //adicionar novo produto ao carrinho
    if (novoProduto) {
      objCarrinho.produtos.push({
        nome: produto.nome,
        preco: produto.preco,
        quantidade: 1,
      });
    }
    setCarrinho(objCarrinho);
  }

  function handleExibirProdutos() {
    setExibirCheckout(false);
    setExibirProdutos(true);
  }

  function handleExibirCheckout(total) {
    handleExibirCheckout(true);
    setExibirProdutos(false);
    setTotal(total);
  }

  return (
    <div className="aq">
      <Menu
        produtos={carrinho.produtos}
        handleExibirProdutos={handleExibirProdutos}
        handleExibirCheckout={handleExibirCheckout}
      />
      <Produtos visivel={exibirProdutos} adicionarProduto={adicionarProduto} />
      <Checkout />
    </div>
  );
}

export default MiniEcommerce;
