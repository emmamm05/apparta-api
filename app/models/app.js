var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var App   = new Schema({
  token: { type: String, required: true }
});

module.exports = mongoose.model('App', App);
 
 
