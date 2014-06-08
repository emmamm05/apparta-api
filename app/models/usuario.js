var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var ObjectId	 = mongoose.Schema.Types.ObjectId;

var Token = new Schema({
      token 	:{ type: String }//, required: true
});

var Usuario   = new Schema({
      nombre	:{ type: String, required: true },
      apellido  :{ type: String, required: true },
      oauth_id 	:{ type: String, required: true},
      telefono 	:{ type: String, required: true},
      email     :{ type: String, required: true},//Falta regexp 
      edad 	:{ type: Number, min: 16 },
      password  :{ type: String},
      genero	:{ type: String, required: true },
      oauth_proveedor :{ type: String, required: true },//facebook o google
      tokens	:[Token], //Conjunto de Tokens
      anunciante:{
	apartamentos: [ { type : Schema.ObjectId, ref : 'Apartamento' } ]
      }
});

module.exports = mongoose.model('Usuario', Usuario);
 
