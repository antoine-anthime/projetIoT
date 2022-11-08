const {InfluxDB, Point} = require('@influxdata/influxdb-client')
require('dotenv').config()

const token = process.env.INFLUXDB_TOKEN
console.log("Token : ", token)
const url = 'http://localhost:8086'

var counter = 0;
//Every time counter hits 4, it comes back to 0


const writeTemperaturePoint = async (code, temperature, errored) => {
  //If counter is 0 or 1, machineID = 1, else machineID = 2
  if (counter === 4) {
    counter = 0;
  }
  const machineID = counter < 2 ? 1 : 2;
  

  const client = new InfluxDB({url, token})
  let writeClient = client.getWriteApi(process.env.ORG, process.env.BUCKET, 'ns')

  //Write new point temperature, with code as tag, errored as bool field, and temperature as field
  let point = new Point('temperature')
  .tag('machine', machineID)
    .tag('machineCode', code)
    .floatField('temperature', temperature)
    .tag('isError', errored)
  
  writeClient.writePoint(point)
  writeClient.close()
  counter++;
}

module.exports = {
  writeTemperaturePoint
}



