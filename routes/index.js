var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  salida = {
    status_code:200,
    status_message: 'Ok',
    data:{
      title: 'Aves de Costa Rica',
      description: 'Aplicacion dedicada a información de las aves de Costa Rica'
    }
  };
  res.set('Content-Type', 'application/json').status(200).send(salida);
});

module.exports = router;
