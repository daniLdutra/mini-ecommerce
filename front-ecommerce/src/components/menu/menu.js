import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faShoppingBasket,
  faCashRegister,
  faShoppingCart,
} from '@fortawesome/free-solid-svg-icons';

function Menu() {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="">Mini Ecommerce</Navbar.Brand>
      <Navbar.Collapse className="justify-content-end">
        <Nav>
          <NavDropdown
            title={
              <div style={{ display: 'inline-block' }}>
                <FontAwesomeIcon icon={faShoppingCart} drop="left" />
                &nbsp; Carrinho
              </div>
            }
          >
            <NavDropdown.Item href="">
              <FontAwesomeIcon icon={faShoppingBasket} />
              &nbsp;
              <strong>Produtos</strong>
            </NavDropdown.Item>
            <NavDropdown.Divider />
            {/*Itens do carrinho*/}
            <NavDropdown.Divider />
            <NavDropdown.Item href="" data-testid="total-carrinho">
              Total: R$ {/* chamar função de cálculo de total */}
            </NavDropdown.Item>
            <span>
              <NavDropdown.Divider />
              <NavDropdown.Item href="" style={{ color: 'green' }}>
                <FontAwesomeIcon icon={faCashRegister} />
                &nbsp; Finalizar compra
              </NavDropdown.Item>
            </span>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Menu;
