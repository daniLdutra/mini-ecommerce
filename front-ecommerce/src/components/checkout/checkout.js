import { Form, Row, Col, Button, Modal, Container } from 'react-bootstrap';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker, { registerLocale } from 'react-datepicker';
import pt from 'date-fns/locale/pt';
import PropTypes from 'prop-types';

registerLocale('pt, pt');

function Checkout(props) {
  return <h1>Checkout</h1>;
}

export default Checkout;
