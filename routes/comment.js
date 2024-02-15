var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Bird = mongoose.model('Birds');

router.post('/', function(req, res, next) {

    Bird.updateOne({_id: req.body.id},
        {$push: {comments: {comment: req.body.comment, author: req.body.author}}})
        .then(() => {
            salida = {
                status_code: 201,
                status_message: 'Los datos se crearon',
                data: 'Comentarios agregados al ave'
            };
            res.set('Content-Type', 'application/json').status(201).send(salida);
        })
        .catch(next);
});

module.exports = router;
