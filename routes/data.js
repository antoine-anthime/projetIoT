var express = require('express');
var router = express.Router();
//Import decoder
const decoder = require('../utils/decoder');
const {writeTemperaturePoint} = require('../utils/influxWorker');


router.post('/1', async (req, res, next) => {
  console.log("Received : ", req.body)
  //decode req.body payload
  const decoded = decoder.decode(req.body.data);
  console.log("Decoded : ", decoded)
  //send a point to influxDB, with decoded.code as tag, and decoded.temperature as field
  try {
    await writeTemperaturePoint(decoded.code, decoded.temperature, decoded.errored, 1);
    //if everything went well, send a 200 status code
    console.log('Data sent to InfluxDB');
    res.status(200).send();
  } catch (e) {
    //if something went wrong, send a 500 status code
    console.log('Error while sending data to InfluxDB', e);
    res.status(500).send();
  }
});

router.post('/2', async (req, res, next) => {
  console.log("Received : ", req.body)
  //decode req.body payload
  const decoded = decoder.decode(req.body.data, );
  console.log("Decoded : ", decoded)
  //send a point to influxDB, with decoded.code as tag, and decoded.temperature as field
  try {
    await writeTemperaturePoint(decoded.code, decoded.temperature, decoded.errored, 2);
    //if everything went well, send a 200 status code
    console.log('Data sent to InfluxDB');
    res.status(200).send();
  } catch (e) {
    //if something went wrong, send a 500 status code
    console.log('Error while sending data to InfluxDB', e);
    res.status(500).send();
  }
});
module.exports = router;
