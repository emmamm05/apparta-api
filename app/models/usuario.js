var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var Token = new Schema({
      token 	:{ type: String, required: true }
});

var Usuario   = new Schema({
      nombre	:{ type: String, required: true },
      appellido :{ type: String, required: true },
      edad 	:{ type: Number, min 16 },
      genero	:{ type: String, enum: { 'Masculino', 'Femenino' }, required: true }
      tokens	:[Token] //Conjunto de Tokens
});

module.exports = mongoose.model('Usuario', Usuario);
 
