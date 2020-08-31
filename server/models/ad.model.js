const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var mongooseUtils = require('./mongoose.utils');

const adsSchema = new Schema({
  name: String,

  cost : Number,

  clicks : Number

}, mongooseUtils);

const ads = mongoose.model('ads', adsSchema);

module.exports = ads;