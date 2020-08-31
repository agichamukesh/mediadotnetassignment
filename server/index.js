const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const helmet = require('helmet');

const app = express();

const routes = global.appRequire('routes');
const config = global.appRequire('config');
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ extended: false, limit: '5mb' }));


// Enable Cross-origin resource sharing
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, Authorization, X-Auth-Access, X-Auth-Refresh, Content-Type, Accept');
  res.header('Access-Control-Expose-Headers', 'X-Token-Access, X-Token-ID');
  next();
});

// Enable gzip compression
app.use(compression());

// Enable helmet middleware
app.use(helmet());

// Enable routes
app.use(routes());

module.exports = () => {
  app.listen(process.env.PORT || 3000, () => {
    console.log(`Server listening on: ${config.server.port}`); // eslint-disable-line no-console
  });
};
