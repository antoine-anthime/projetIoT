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
//Decide wether machineCode variable is 40 or 50, one chance out of 2
const machineCode = Math.random() >= 0.5 ? 40 : 50;

const value = toByte(randomNumber(TEMP_MIN, TEMP_MAX).toString(16), 2); const code = toByte((machineCode).toString(16), 1);
const errored = toByte(returnRandomBoolean().toString(16), 1);;  
const payload = code + value + errored;
  console.log(payload);
sendData(payload);
}
setInterval(() => start(), 2000);