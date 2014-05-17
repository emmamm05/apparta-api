var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var ObjectId	 = mongoose.Schema.Types.ObjectId;

function longitud_comentario (str) {
  return str.length < 120;
};

var Comentario = new Schema({
     contenido: { type: String, required: true, validate: [longitud_comentario, 'comentario muy extenso'] },
     autor: {type: ObjectId, ref: 'Usuario'},
});

var Calificacion = new Schema({
      calificacion: { type: Number, min 1, max 5 },
      autor: {type: ObjectId, ref: 'Usuario'},
});

var Apartamento   = new Schema({
      descripcion :{ type: String, required: true },
      //Faltan...
      comentarios: [Comentario]
      calificaciones: [Calificacion]
});

module.exports = mongoose.model('Apartamento', Apartamento);
 
 
