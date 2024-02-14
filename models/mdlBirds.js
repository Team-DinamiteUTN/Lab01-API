var mongoose = require("mongoose");

var schBird = new mongoose.Schema({
  name: { type: String, required: [true, "Este campo es requerido"] },
  description: { type: String, required: [true, "Este campo es requerido"] },
  birdImage: { type: String, required: [true, "Este campo es requerido"] }, // Este campo almacenará la URL de la imagen
  comments: [
    {
      type: Object,
      properties: {
        comment: { type: String, required: [true, "Este campo es requerido"] },
        author: { type: String, required: [true, "Este campo es requerido"] },
      },
      required: false,
    },
  ],
});

mongoose.model("Birds", schBird);
