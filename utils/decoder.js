const decode = (payload) => {
    //store two first characters of payload in variable code, and the rest in the temperature variable
    let code = payload.substring(0, 2);
    let temperature = payload.substring(2, 6);
    let errored = payload.substring(6, 8);
    console.log("errored : ", errored)
    //convert the hexadecimal code to decimal
    let codeDecimal = parseInt(code, 16);
    //convert the hexadecimal temperature to decimal
    let temperatureDecimal = parseInt(temperature, 16);
    //return an object with the code and the temperature
    let erroredDecimal = parseInt(errored, 16);
    return {
        code: codeDecimal,
        temperature: temperatureDecimal/10,
        errored: erroredDecimal ? 'true' : 'false'
    };
}

module.exports = {
    decode
}
