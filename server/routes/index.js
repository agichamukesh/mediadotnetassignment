const express = require('express');
const { join } = require('path');

const apis = global.appRequire('apis');
const router = express.Router();

// Refer: http://apidocjs.com/ for REST API documentation

/**
 * @api {GET} /api Test api
 * @apiSuccess {Object} { success: boolean, message: string }
 */

// Capture and handle 404 error for apis
router.use('/api', apis);

/**
 * @api {GET} /* serve angular application - static file server
 * @apiSuccess {HTML|JS|CSS|JPG|PNG}
 */

// Serve angular application
router.use(express.static(join(__dirname, '..', '..', 'dist', 'client')));
router.get('/*', (req, res) => res.sendFile(join(__dirname, '..', '..', 'dist', 'client', 'index.html')));

module.exports = () => router;
