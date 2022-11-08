const {InfluxDB, Point} = require('@influxdata/influxdb-client')
require('dotenv').config()

const token = process.env.INFLUXDB_TOKEN
console.log("Token : ", token)
const url = 'http://localhost:8086'


const writeTemperaturePoint = async (code, temperature, errored, machineID) => {

  const client = new InfluxDB({url, token})
  let writeClient = client.getWriteApi(process.env.ORG, process.env.BUCKET, 'ns')

  //Write new point temperature, with machine as tag, with code as tag, errored as bool field, and temperature as field
  let point = new Point('temperature')
    .tag('machine', machineID)
    .tag('machineCode', code)
    .floatField('temperature', temperature)
    .tag('isError', errored)
  
  writeClient.writePoint(point)
  writeClient.close()
}

module.exports = {
  writeTemperaturePoint
}



