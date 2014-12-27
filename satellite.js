// Node Request module
var request = require('request');

// Satellite Constructor Class
function Satellite() {

  this.version = '0.0.1';
  this.loading = false;

}

// Import methods in Satellite
Satellite.prototype.startReceiving = startReceiving;
Satellite.prototype.getSatelliteIdAndName = getSatelliteIdAndName;
Satellite.prototype.getSatelliteData = getSatelliteData;
Satellite.prototype.getLatLonperSec = getLatLonperSec;
Satellite.prototype.printLonLatResult = printLonLatResult;
Satellite.prototype.printDataResult = printDataResult;



// Method: call all the methods to receive the position
function startReceiving(satId, rqRate) {

  this.id = satId || 0;
  this.rqRate = rqRate || 2000;

  this.getSatelliteIdAndName();

}

// Method: Get Satellite name and id from Wheretheiss
function getSatelliteIdAndName() {
  var self = this;
  var result_obj;

  this.loading = true;

  // Get request to wheretheiss for id and name
  request({
    uri: 'https://api.wheretheiss.at/v1/satellites',
    method: "GET",
    timeout: 10000,
  }, function(error, response, body) {

    self.loading = false;

    if (error) {

      //Fixme: there is another check we can do about body.error
      console.log(error);

    } else {
      // Return back Satellite's name and id
      result_obj = eval(body)[0]

      // If id doesn't exist, get a valid id
      if (result_obj.id != self.id) {

        self.id = result_obj.id;
        self.name = result_obj.name;

      }

      // Call getSatelliteData to get data
      setTimeout(function() {

        self.getSatelliteData(self.id);

      }, this.rqRate);

      // Call getLatLonperSec to get Lat/Lon per sec
      setTimeout(function() {

        self.getLatLonperSec(self.id);

      }, 1000);

    }

  });

}

// Method: Get Satellite data
function getSatelliteData(satId) {
  var self = this;
  var result_obj;

  self.loading = true;

  // Get request to wheretheiss for data
  request({
    uri: 'https://api.wheretheiss.at/v1/satellites/'+satId,
    method: "GET",
    timeout: 10000,
  }, function(error, response, body) {

    self.loading = false;

    result_obj = JSON.parse(body);

    // Call printDataResult printing data
    self.printDataResult(result_obj);

  });

  return result_obj;

}

// Method: Get Satellite Lon/Lat per sec
function getLatLonperSec(satId) {
  var self = this;
  var result_obj;

  self.loading = true;

  // Get request to wheretheiss for data
  request({
    uri: 'https://api.wheretheiss.at/v1/satellites/'+satId,
    method: "GET",
    timeout: 10000,
  }, function(error, response, body) {

    self.loading = false;

    result_obj = JSON.parse(body);

    // Call printResult printing data
    self.printLonLatResult(result_obj);

  });

  return result_obj;

}

// Method: print Satellite's Lat/Lon per sec
function printLonLatResult(satelliteData) {
  var self = this;

  this.oldLatPerSec = this.newLatPerSec || 0;
  this.newLatPerSec = satelliteData.latitude;
  this.latPerSec = this.oldLatPerSec - this.newLatPerSec;

  this.oldLonPerSec = this.newLonPerSec || 0;
  this.newLonPerSec = satelliteData.longitude;
  this.lonPerSec = this.oldLonPerSec - this.newLonPerSec;

  console.log('----- Lon Lat / sec -----');
  console.log('---------------------');
  console.log('Satellite: ' + this.name);
  console.log('Id: ' + this.id);
  console.log('latPerSec: ' + this.latPerSec);
  console.log('lonPerSec: ' + this.lonPerSec);
  console.log('---------------------');
  console.log('-------------------------');

  setTimeout(function() {

    self.getLatLonperSec(self.id);

  }, 1000);

}

// Method: print all the Satellite's data
function printDataResult(satelliteData) {
  var self = this;

  this.latitude = satelliteData.latitude;
  this.longitude = satelliteData.longitude;
  this.altitude = satelliteData.altitude;
  this.velocity = satelliteData.velocity;

  console.log('----- Data Satellite / Input Range -----');
  console.log('------------------------------------');
  console.log('Satellite: ' + this.name);
  console.log('Id: ' + this.id);
  console.log('latitude: ' + this.latitude);
  console.log('longitude: ' + this.longitude);
  console.log('velocity: ' + this.velocity);
  console.log('altitude: ' + this.altitude);
  console.log('------------------------------------');
  console.log('----------------------------------------');

  setTimeout(function() {

    self.getSatelliteData(self.id);

  }, self.rqRate);

}



// Create Satellite's module
module.exports = new Satellite();