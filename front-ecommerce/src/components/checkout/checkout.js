import { Form, Row, Col, Button, Modal } from 'react-bootstrap';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker, { registerLocale } from 'react-datepicker';
import pt from 'date-fns/locale/pt';
import PropTypes from 'prop-types';

registerLocale('pt', pt);

function Checkout(props) {
  return (
    <div fluid style={{ margin: '10px' }}>
      <h3 className="text-center">Finalizar compra</h3>

      <Form noValidate style={{ margin: '10px' }}>
        <Form.Group as={Row} controlId="email">
          <Form.Label column sm={3}>
            Email
          </Form.Label>
          <Col sm={9}>
            <Form.Control
              type="email"
              placeholder="Digite o seu email"
              name="email"
              data-testid="txt-email"
            />
            <Form.Control.Feedback type="invalid">
              Digite um email válido
            </Form.Control.Feedback>
          </Col>
        </Form.Group>
      </Form>
    </div>
  );
}

export default Checkout;
