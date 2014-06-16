var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var ObjectId	 = mongoose.Schema.Types.ObjectId;

var Token = new Schema({
      token 	:{ type: String }//, required: true
});

module.exports = mongoose.model('Token', Token);
