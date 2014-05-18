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
      descripcion: { type: String, required: true },
      direccion_fisica: { type: String, required: true },
      area: { type: Number },
      ubicacion_latitud:{ type: Number, required: true },
      ubicacion_longitud:{ type: Number, required: true },
      cercania_tec: { type: Number, required: true },
      comentarios: [Comentario],
      calificaciones: [Calificacion]
      opcion_garage: { type: Boolean, required: true},
      opcion_amueblado: { type: Boolean, required: true},
      opcion_seguridad: { type: Boolean, required: true },
      opcion_internet: { type: Boolean, required: true}
});
//Falta forzar algunos numeros en decimales

module.exports = mongoose.model('Apartamento', Apartamento);
 
 
