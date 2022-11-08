const axios = require('axios');

const TEMP_MIN = 150;
const TEMP_MAX = 300;
const ENDPOINT_FIRST_SENSOR = 'http://localhost:3001/data/1'; //Middleware Endpoint
const ENDPOINT_SECOND_SENSOR = 'http://localhost:3001/data/2'

function randomNumber(min, max) {
return Math.trunc(Math.random() * (max - min) + min);
}

function returnRandomBoolean() {
  return Math.random() >= 0.9 ? 1 : 0;
}

function toByte(string, length) {
let result = string;
while (result.length < length * 2) {
    result = '0' + result;
  }
  return result;
}

function sendData(data, machineID) {
  axios.post(machineID == 1 ? ENDPOINT_FIRST_SENSOR : ENDPOINT_SECOND_SENSOR, {
    data: data,
  });
}


function createData(machineID) {
  let code;
//Decide wether machineCode variable is 40 or 50, one chance out of 2
  const temperatureValue = toByte(randomNumber(TEMP_MIN, TEMP_MAX).toString(16), 2); 
  const humidityValue = toByte(randomNumber(100, 400).toString(16), 2); code = toByte((50).toString(16), 1);

  const erroredTemperature = toByte(returnRandomBoolean().toString(16), 1);
  const erroredHumidity = toByte(returnRandomBoolean().toString(16), 1);
  code = toByte((40).toString(16), 1);
  const payloadTemperature = code + temperatureValue + erroredTemperature;
  code = toByte((50).toString(16), 1);
  const payloadHumidity = code + humidityValue + erroredHumidity;
  sendData(payloadTemperature, machineID)
  console.log('Log time : ', new Date().toISOString())
  console.log("Payload Temperature : ", payloadTemperature)
  sendData(payloadHumidity, machineID);
  console.log("Payload Humidity : ", payloadHumidity)
  console.log('__________________')
}

setInterval(() => createData(1), 2000);
setInterval(() => createData(2), 2000);