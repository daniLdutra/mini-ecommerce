import { useState } from 'react';
import { Formik, yupToFormErrors } from 'formik';
import { Form, Row, Col, Button, Modal } from 'react-bootstrap';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker, { registerLocale } from 'react-datepicker';
import pt from 'date-fns/locale/pt';
import PropTypes, { func } from 'prop-types';
import ListarEstados from './listar-estados';
import ListarCidades from './listar-cidades';
import * as yup from 'yup';
import { validarCpf, formatarCpf } from '../../utils/cpf-util';
import formatarCep from '../../utils/cep.util';
import axios from 'axios';

registerLocale('pt', pt);

function Checkout(props) {
  const CHECKOUT_URL =
    'http://localhost:3001/mini-ecommerce/checkout/finalizar-compra';

  const [dataNascimento, setDataNascimento] = useState(null);
  const [formEnviado, setFormEnviado] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showErroModal, setShowErroModal] = useState(false);

  const schema = yup.object({
    email: yup.string().email().required(),
    nomeCompleto: yup.string().required().min(5),
    cpf: yup
      .string()
      .required()
      .min(14)
      .max(14)
      .test('cpf-valido', 'CPF inválido', (cpf) => validarCpf(cpf)),
    endereco: yup.string().required().min(5),
    cidade: yup.string().required(),
    estado: yup.string().required(),
    cep: yup.string().required().min(9).max(9),
    emailPromocional: yup.string().required(),
    termosCondicoes: yup.boolean().oneOf([true]),
  });

  function visivel() {
    return props.visivel ? null : 'hidden';
  }

  async function finalizarCompra(dados) {
    if (!dataNascimento) {
      //verficação para saber se contém a data de nascimento
      setFormEnviado(true);
      return;
    }
    dados.dataNascimento = dataNascimento;
    dados.produtos = JSON.stringify(props.produtos);
    dados.total = `R$ ${props.total}`;
    try {
      await axios.post(CHECKOUT_URL, dados);
      setShowModal(true);
      props.handleLimparCarrinho();
    } catch (err) {
      setShowErroModal(true);
    }
  }

  function handleDataNascimento(data) {
    setDataNascimento(data);
  }

  function datePickerCss() {
    if (!formEnviado) {
      return 'form-control';
    }
    if (dataNascimento) {
      return 'form-control is-valid';
    } else {
      return 'form-control is-invalid';
    }
  }

  function handleContinuar() {
    setShowModal(false);
    props.handleExibirProdutos();
  }

  function handleFecharErroModal() {
    setShowErroModal(false);
  }

  return (
    <div
      fluid
      style={{ margin: '2rem' }}
      className={visivel()}
      className="jumbotron"
    >
      <h3 className="text-center">Finalizar compra</h3>

      <Formik
        onSubmit={(values) => finalizarCompra(values)}
        initialValues={{
          email: '',
          nomeCompleto: '',
          cpf: '',
          endereco: '',
          cidade: '',
          estado: '',
          cep: '',
          termosCondicoes: false,
          emailPromocional: 'S',
        }}
        validationSchema={schema}
      >
        {({ handleSubmit, handleChange, values, touched, errors }) => {
          console.log(values, 'valores');
          return (
            <Form noValidate onSubmit={handleSubmit}>
              <Form.Group
                as={Row}
                controlId="email"
                style={{ marginTop: '0.8rem' }}
              >
                <Form.Label column sm={3}>
                  Email
                </Form.Label>
                <Col sm={9}>
                  <Form.Control
                    type="email"
                    placeholder="Digite o seu email"
                    name="email"
                    data-testid="txt-email"
                    value={values.email}
                    onChange={handleChange}
                    isValid={touched.email && !errors.email} //possui erro !
                    isInvalid={touched.email && !!errors.email} // não possui erro !!
                  />
                  <Form.Control.Feedback type="invalid">
                    Digite um email válido
                  </Form.Control.Feedback>
                </Col>
              </Form.Group>
              <Form.Group
                as={Row}
                controlId="nomeCompleto"
                style={{ marginTop: '0.6rem' }}
              >
                <Form.Label column sm={3}>
                  Nome completo
                </Form.Label>
                <Col sm={9}>
                  <Form.Control
                    type="text"
                    placeholder="Digite o seu nome completo"
                    name="nomeCompleto"
                    data-testid="txt-nome-completo"
                    value={values.nomeCompleto}
                    onChange={handleChange}
                    isValid={touched.nomeCompleto && !errors.nomeCompleto}
                    isInvalid={touched.nomeCompleto && !!errors.nomeCompleto}
                  />
                  <Form.Control.Feedback type="invalid">
                    Digite seu nome completo (mínimo 5 caractéres).
                  </Form.Control.Feedback>
                </Col>
              </Form.Group>
              <Form.Group
                as={Row}
                controlId="dataNascimento"
                style={{ marginTop: '0.6rem' }}
              >
                <Form.Label column sm={3}>
                  Data de nascimento
                </Form.Label>
                <Col sm={9}>
                  <DatePicker //DatePicker não está integrado com bootstrap
                    locale="pt"
                    peekNextMonth
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    dateFormat="dd/MM/yyyy"
                    placeholderText="Selecione a data"
                    withPortal
                    selected={dataNascimento}
                    onChange={handleDataNascimento}
                    className={datePickerCss()}
                  />
                </Col>
              </Form.Group>
              <Form.Group
                as={Row}
                controlId="cpf"
                style={{ marginTop: '0.6rem' }}
              >
                <Form.Label column sm={3}>
                  CPF
                </Form.Label>
                <Col sm={9}>
                  <Form.Control
                    type="text"
                    placeholder="Digite seu CPF"
                    name="cpf"
                    data-testid="txt-cpf"
                    value={values.cpf}
                    onChange={(e) => {
                      e.currentTarget.value = formatarCpf(
                        e.currentTarget.value
                      );
                      handleChange(e);
                    }}
                    isValid={touched.cpf && !errors.cpf}
                    isInvalid={touched.cpf && !!errors.cpf}
                  />
                  <Form.Control.Feedback type="invalid">
                    Digite um CPF válido.
                  </Form.Control.Feedback>
                </Col>
              </Form.Group>
              <Form.Group
                as={Row}
                controlId="endereco"
                style={{ marginTop: '0.6rem' }}
              >
                <Form.Label column sm={3}>
                  Endereço
                </Form.Label>
                <Col sm={9}>
                  <Form.Control
                    type="text"
                    placeholder="Digite seu endereço completo"
                    name="endereco"
                    data-testid="txt-endereco"
                    value={values.endereco}
                    onChange={handleChange}
                    isValid={touched.endereco && !errors.endereco}
                    isInvalid={touched.endereco && !!errors.endereco}
                  />
                  <Form.Control.Feedback type="invalid">
                    Digite um endereço válido.
                  </Form.Control.Feedback>
                </Col>
              </Form.Group>
              <Form.Group
                as={Row}
                controlId="estado"
                style={{ marginTop: '0.6rem' }}
              >
                <Form.Label column sm={3}>
                  Estado
                </Form.Label>
                <Col sm={9}>
                  <Form.Control
                    as="select"
                    name="estado"
                    data-testid="txt-estado"
                    value={values.estado}
                    onChange={handleChange}
                    isValid={touched.estado && !errors.estado}
                    isInvalid={touched.estado && !!errors.estado}
                  >
                    <ListarEstados />
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">
                    Selecione o seu estado.
                  </Form.Control.Feedback>
                </Col>
              </Form.Group>
              <Form.Group
                as={Row}
                controlId="cidade"
                style={{ marginTop: '0.6rem' }}
              >
                <Form.Label column sm={3}>
                  Cidade
                </Form.Label>
                <Col sm={9}>
                  <Form.Control
                    as="select"
                    name="cidade"
                    data-testid="cidade"
                    value={values.cidade}
                    onChange={handleChange}
                    isValid={touched.cidade && !errors.cidade}
                    isInvalid={touched.cidade && !!errors.cidade}
                  >
                    <option value="">Selecione a cidade</option>
                    <ListarCidades estado={values.estado} />
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">
                    Selecione a sua cidade.
                  </Form.Control.Feedback>
                </Col>
              </Form.Group>
              <Form.Group
                as={Row}
                controlId="cep"
                style={{ marginTop: '0.6rem' }}
              >
                <Form.Label column sm={3}>
                  CEP
                </Form.Label>
                <Col sm={9}>
                  <Form.Control
                    type="text"
                    placeholder="Digite seu CEP"
                    name="cep"
                    data-testid="txt-cep"
                    value={values.cep}
                    onChange={(e) => {
                      e.currentTarget.value = formatarCep(
                        e.currentTarget.value
                      );
                      handleChange(e);
                    }}
                    isValid={touched.cep && !errors.cep}
                    isInvalid={touched.cep && !!errors.cep}
                  ></Form.Control>
                  <Form.Control.Feedback type="invalid">
                    Digite o seu CEP.
                  </Form.Control.Feedback>
                </Col>
              </Form.Group>
              <Form.Group
                as={Row}
                controlId="emailPromocional"
                style={{ marginTop: '0.8rem' }}
              >
                <Form.Label column sm={12}>
                  Deseja receber email com promoções?
                </Form.Label>
                <Form.Check
                  inline
                  name="emailPromocional"
                  type="radio"
                  id="promocaoSim"
                  value="S"
                  label="Sim"
                  style={{ marginLeft: '15px' }}
                  checked={values.emailPromocional === 'S'}
                  onChange={handleChange}
                />
                <Form.Check
                  inline
                  name="emailPromocional"
                  type="radio"
                  id="promocaoNao"
                  value="N"
                  label="Não"
                  style={{ marginLeft: '15px' }}
                  checked={values.emailPromocional === 'N'}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group
                as={Row}
                controlId="termosCondicoes"
                style={{ marginTop: '0.8rem' }}
              >
                <Form.Check
                  name="termosCondicoes"
                  label="Concordo com os termos e condições"
                  style={{ marginLeft: '15px' }}
                  data-testid="check-termos-condicoes"
                  value={values.termosCondicoes}
                  onChange={handleChange}
                  isValid={touched.termosCondicoes && !errors.termosCondicoes}
                  isInvalid={
                    touched.termosCondicoes && !!errors.termosCondicoes
                  }
                />
              </Form.Group>
              <Form.Group
                as={Row}
                controlId="finalizarCompra"
                style={{ marginTop: '0.6rem' }}
              >
                <Col className="text-center" sm={12}>
                  <Button
                    type="submit"
                    style={{ backgroundColor: 'limegreen' }}
                    data-testid="btn-finalizar-compra"
                  >
                    Finalizar compra
                  </Button>
                </Col>
              </Form.Group>
            </Form>
          );
        }}
      </Formik>

      <Modal
        show={showModal}
        data-testid="modal-compra-sucesso"
        onHide={handleContinuar}
      >
        <Modal.Header closeButton>
          <Modal.Title>Compra realizada com sucesso!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Um email de confirmação foi enviado com os detalhes da transação.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleContinuar}>
            Continuar
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showErroModal}
        data-testid="modal-erro-comprar"
        onHide={handleFecharErroModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>Erro ao processar pedido.</Modal.Title>
        </Modal.Header>
        <Modal.Body>Tente novamente em instantes.</Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={handleFecharErroModal}>
            Continuar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

Checkout.propTypes = {
  visivel: PropTypes.bool.isRequired,
  handleExibirProdutos: PropTypes.func.isRequired,
  total: PropTypes.string.isRequired,
  produtos: PropTypes.object.isRequired,
  handleLimparCarrinho: PropTypes.func.isRequired,
};

export default Checkout;
