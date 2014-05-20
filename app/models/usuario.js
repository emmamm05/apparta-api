var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var ObjectId	 = mongoose.Schema.Types.ObjectId;

var Token = new Schema({
      token 	:{ type: String, required: true }
});

var Usuario   = new Schema({
      nombre	:{ type: String, required: true },
      apellido  :{ type: String, required: true },
      oauth_id 	:{ type: String, required: true},
      email     :{ type: String, required: true},//Falta regexp 
      edad 	:{ type: Number, min 17 },
      password  :{ type: String},
      genero	:{ type: String, enum: { 'Masculino', 'Femenino' }, required: true },
      tokens	:[Token], //Conjunto de Tokens
      anunciante:{
	apartamentos: [ { type : Schema.ObjectId, ref : 'Apartamento' } ]
      }
});

module.exports = mongoose.model('Usuario', Usuario);
 
