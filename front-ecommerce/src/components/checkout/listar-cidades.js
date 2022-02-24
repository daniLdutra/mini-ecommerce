import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

function ListarCidades(props) {
  const CIDADES_URL =
    'http://localhost:3001/mini-ecommerce/estado/:estado/cidades';

  const [cidades, setCidades] = useState([]);

  return cidades.map((cidade) => (
    <option key={cidade} value={cidade} data-testid={cidade}>
      {cidade}
    </option>
  ));
}

ListarCidades.propTypes = {
  estado: PropTypes.string.isRequired,
};

export default ListarCidades;
