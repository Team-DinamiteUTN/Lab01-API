var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

require('../models/mdlBirds');
var Bird = mongoose.model('Birds');

//Metodo que optiene todas las aves
router.get('/', function (req, res) {
   Bird.find({}, (err, birds) => {
       if(err) {
           return res.status(500).json({ message: 'Error obteniendo aves', err });
       }
       if(birds.length === 0){
           return res.status(404).json({ message: 'La lista está vacía' });
       }
       res.json({ status_code: 200, status_message: 'Ok', data: birds });
   });
});


router.get('/:id', function (req,res){
    Bird.find({_id:req.params.id},[],(err,birds) =>{
        if(birds.length === 0){
            birds = {'birds': 'List is empty'}
        }
        salida = {
            status_code:200,
            status_message: 'Ok',
            data: birds
        };
        res.set('Content-Type', 'application/json').status(200).send(salida);
    })
});


//Metodo que agrega un ave con su id
router.post('/', function(req, res) {
    var newBird = new Bird(req.body);
    
    newBird.save((err, bird) => {
        if(err) {
            return res.status(500).json({ message: 'Error gaurdando el ave', err });
        }
        res.status(201).json({ status_code: 201, status_message: 'El ave se creó', data: bird });
    });
});

//Metodo que put un ave con su id
router.put('/:id', function(req, res) {
    Bird.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, bird) => {
        if(err) {
            return res.status(500).json({ message: 'Error actualizando el ave', err });
        }
        if(!bird){
            return res.status(404).json({ message: 'Error con las aves' });
        }
        res.json({ status_code: 200, status_message: 'Ave actualizada', data: bird });
    });
});

//Metodo que elimina un ave con su id
router.delete('/:id', function(req, res) {
    Bird.findByIdAndDelete(req.params.id, (err, bird) => {
        if(err) {
            return res.status(500).json({ message: 'Error eliminando ave', err });
        }
        if(!bird){
            return res.status(404).json({ message: 'Error con el ave' });
        }
        res.json({ status_code: 200, status_message: 'Ave eliminada' });
    });
});

module.exports = router;
