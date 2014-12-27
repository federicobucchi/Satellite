process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

// Include Satellite Module - Execute Constructor
var satellite = require('../satellite.js');

describe('Satellite', function() {

  describe('Costructor', function() {

    it('Satellite is initialized', function() {

      expect(satellite.version).toBeDefined();

    });

  });

  describe('startReceiving', function() {

    satellite.startReceiving(0, 5000);

    it('Satellite id should has a value', function() {

      expect(satellite.id).toEqual(jasmine.any(Number));

    });

    it('Satellite request rate should has a value', function() {

      expect(satellite.rqRate).toEqual(jasmine.any(Number));

    });

    describe('getSatelliteIdAndName', function() {
      var interval;

      it('should return the right Satellite id', function(done) {

        interval = setInterval(function() {

          if (satellite.loading == false) {

            expect(satellite.id).toEqual(jasmine.any(Number));

            done();

            clearInterval(interval);

          }

        }, 1000);

      });

      it('should return the right Satellite name', function() {

        expect(satellite.name).toEqual(jasmine.any(String));

      });

      describe('getSatelliteData >> printDataResult', function(done) {

        it('should return the right Satellite data', function() {

          interval = setInterval(function() {

            if (satellite.loading == false) {

              expect(satellite.latitude).toEqual(jasmine.any(Number));

              expect(satellite.longitude).toEqual(jasmine.any(Number));

              expect(satellite.altitude).toEqual(jasmine.any(Number));

              expect(satellite.velocity).toEqual(jasmine.any(Number));

              done();

              clearInterval(interval);

            }

          }, satellite.rqRate);

        });

      });

      describe('getLatLonperSec >> printLonLatResult', function(done) {

        it('should return the right Satellite Lat/Lon per sec', function() {

          interval = setInterval(function() {

            if (satellite.loading == false) {

              expect(satellite.latPerSec).toEqual(

                satellite.oldLatPerSec - satellite.newLatPerSec

              );

              expect(satellite.lonPerSec).toEqual(

                satellite.oldLonPerSec - satellite.newLonPerSec

              );

              done();

              clearInterval(interval);

            }

          }, 1000);

        });

      });

    });

  });

});