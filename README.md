# Satellite

![alt tag](http://www.bflab.com/images/satellite.png)  

Just an experiment tracking ISS Satellite (url: [Where the ISS at](http://wheretheiss.at))  

### Dependencies
- Request

### Dependencies Dev
- Jasmine
- Istanbul

### Usage
- ```npm install```
- open main.js
  - call ```satellite.startReceiving(satelliteId, RequestRate);```
  - eg: ```satellite.startReceiving(25544, 5000);```
  Satellite Id = 25544 - Request Rate = 5 seconds
- ```node main```

### Results
Watch the results on your Terminal about:  
  - Satellite data every Request Rate  
  - Latitude and Longitude per second

### Tests
- ```jasmine spec/satellite.js```

### Coverage
- ```istanbul cover jasmine spec/satellite.js```
