var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var ObjectId	 = mongoose.Schema.Types.ObjectId;

var Usuario   = new Schema({
      nombre	:{ type: String, required: true },
      apellido  :{ type: String, required: true },
      oauth_id 	:{ type: String, required: true},
      telefono 	:{ type: String},
      email     :{ type: String, required: true},//Falta regexp 
      cumpleanos:{ type: Date },
      password  :{ type: String},
      genero	:{ type: String, required: true },
      oauth_proveedor :{ type: String, required: true },//facebook o google
      interes   :[{type: String}],
      tokens	:[{ type : Schema.ObjectId, ref : 'Token' }], //Conjunto de Tokens
      es_anunciante: { type: Boolean, default: false},
      apartamentos: [ { type : Schema.ObjectId, ref : 'Apartamento' } ]
      
});

module.exports = mongoose.model('Usuario', Usuario);

