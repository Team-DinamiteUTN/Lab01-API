var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var multer = require('multer');
var path = require('path');

require('../models/mdlBirds');
var Bird = mongoose.model('Birds');

// Configuración de multer para almacenamiento de imágenes
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'public/uploads/'); // Directorio que se debe crear en la raiz del api
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

var upload = multer({ storage: storage });

router.post('/upload', upload.single('image'), function(req, res) {
    var newBird = new Bird({
        name: req.body.name,
        description: req.body.description,
        birdImage: req.file ? req.file.path : undefined,
        comments: req.body.comments ? JSON.parse(req.body.comments) : [] 
    });
    
    newBird.save((err, bird) => {
        if (err) {
            return res.status(500).json({ message: 'Error guardando el ave', err });
        }
        res.status(201).json({ status_code: 201, status_message: 'El ave se creó con imagen', data: bird });
    });
});

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

//Metodo que optiene un ave con su id
router.get('/:id', function (req, res) {
    Bird.findById(req.params.id, (err, bird) => {
        if(err) {
            return res.status(500).json({ message: 'Error obteniendo el ave', err });
        }
        if(!bird){
            return res.status(404).json({ message: 'Error con las aves' });
        }
        res.json({ status_code: 200, status_message: 'Ok', data: bird });
    });
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
