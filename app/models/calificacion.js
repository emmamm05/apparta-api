var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var ObjectId	 = mongoose.Schema.Types.ObjectId;

var Calificacion = new Schema({
      calificacion: { type: Number, min: 1, max: 5 },
      autor: {type: ObjectId, ref: 'Usuario'},
      aparta: {type: ObjectId, ref: 'Apartamento'}
});

module.exports = mongoose.model('Calificacion', Calificacion);
