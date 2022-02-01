const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const { finalizarCompra } = require('./controllers/mini-ecommerce');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

app.post('/mini-ecommerce/checkout/finalizar-compra', finalizarCompra);

app.listen(PORT, () => console.log(`Servidor inicializado na porta ${PORT}`));
