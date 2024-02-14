var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  salida = {
    status_code:200,
    status_message: 'Ok',
    data:{
      name: 'Los mejores estudiantes',
      nickname: 'Todos los del grupo dinamita',
      occupation: 'Estudiando por un futuro mejor',
      year: 2023
    }
  };
  res.set('Content-Type', 'application/json').status(200).send(salida);
});

module.exports = router;
