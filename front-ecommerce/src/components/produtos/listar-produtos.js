import placeholder from '../../images/286x180.png';
import { Card, CardImg } from 'react-bootstrap';
import Button from 'react-bootstrap';
import { func } from 'prop-types';

function ListarProdutos() {
  const produtos = [
    { nome: 'Aprenda Java', preco: 'R$ 59,99' },
    { nome: 'JavaScript em 24 horas', preco: 'R$ 19,99' },
    { nome: 'React em 7 dias', preco: 'R$ 29,99' },
    { nome: 'Algoritmos e Estrutura de Dados', preco: 'R$ 25,99' },
    { nome: 'Start-Up', preco: 'R$ 29,99' },
    { nome: 'Testes Unitários com Jasmine', preco: 'R$ 14,99' },
    { nome: 'APIs RESTful com Spring e Java', preco: 'R$ 15,99' },
    { nome: 'TypeScript na prática', preco: 'R$ 9,99' },
  ];

  function render() {
    let key=1;
    const cards = produtos.map(produto=>
    <Card 
      key={key}
      data-testid={'card' + key++}
      style={{ width: '18rem', margin: '10px', float: 'lefts' }}>
      <Card.Img variant="top" src={placeholder} />
      <Card.Body className="text-center">
        <Card.Title style={{ height: '40px' }}>
          {produto.nome}
        </Card.Title>
        <Card.Text>Descrição do produto...</Card.Text>
        <Button 
        variant="success" 
        style={{ width: '100%' }}
        onClick={}
        >Comprar ({produto.preco})
        </Button>
      </Card.Body>
    </Card>
    );
    return cards;
  }

  return render();
}

export default ListarProdutos;
