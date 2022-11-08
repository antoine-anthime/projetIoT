const axios = require('axios');

const TEMP_MIN = 150;
const TEMP_MAX = 300;
const ENDPOINT = 'http://localhost:3001/data'; //Middleware Endpoint


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

function sendData(data) {
  axios.post(ENDPOINT, {
    data: data,
  });
}

function start() {
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
  sendData(payloadTemperature)
  console.log('Log time : ', new Date().toISOString())
  console.log("Payload Temperature : ", payloadTemperature)
  sendData(payloadHumidity);
  console.log("Payload Humidity : ", payloadHumidity)
  console.log('__________________')
  }
setInterval(() => start(), 2000);