// Avoid error https
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

// Include Satellite Module - Execute Constructor
var satellite = require('./satellite.js');

// Call Satellite method: startReceiving
satellite.startReceiving(1, 5000);