const cidadesEstados = require('../cidades-estados.json');

function finalizarCompra(req, res) {
  console.log(req.body);
  res.send('ok');
}

module.exports = {
  finalizarCompra,
};
