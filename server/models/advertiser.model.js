const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var mongooseUtils = require('./mongoose.utils');

const advertiserSchema = new Schema({
  name: String,

  ads: [{
    type : Schema.Types.ObjectId, 
    ref: 'ads' 
  }],

}, mongooseUtils);

const advertisers = mongoose.model('advertisers', advertiserSchema);

module.exports = advertisers;