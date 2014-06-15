var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var ObjectId	 = mongoose.Schema.Types.ObjectId;

var Comentario = new Schema({
     contenido: { type: String, required: true },
     autor: {type: ObjectId, ref: 'Usuario'},
     fecha_publicacion : { type : Date , default: Date.now}

});

module.exports = mongoose.model('Comentario', Comentario);
