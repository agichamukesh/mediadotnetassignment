/* eslint global-require: 0 import/no-dynamic-require: 0 */

const mongoose = require('mongoose');
const { join } = require('path');

const requireConfig = require('./require-config');

global.appRequire = alias => require(join(__dirname, `/${requireConfig[alias.toLowerCase()]}`));

const config = global.appRequire('config');
// Import express application
const server = require('./server');

const terminate = (error) => {
  mongoose.disconnect();

  if (error) {
    throw error;
  }

  process.exit(0);
};
mongoose.connect(config.mongo.uri, {
  useNewUrlParser: true ,
}, (error) => {
    if (error) {
        console.log('DBERROR: ' + error);
        return;
    }
    server();
});


process.on('SIGINT', terminate);
process.on('SIGTERM', terminate);
