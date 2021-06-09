const request = require('request');

const forecast = (longitude, latitude, callback) => {
    const url =  'http://api.weatherstack.com/current?access_key=4b37d57a080d661029c7b168e224dfb0&query='+longitude+','+latitude+'&units=f';
    request({url, json: true}, (error, {body} = {}) => {
        if(error){
            callback('Unable to connect to the weather service!',undefined)
        }
        else if(body.error){
            callback('Unable to find the location',undefined)
        }
        else{
            const temperature = body.current.temperature;
            const description = body.current.feelslike;        
            callback(undefined, body.current.weather_descriptions[0]+'. It is currently '+temperature+' degrees out. It feels like '+description+' degrees out.' );
        }
    })
}

module.exports = forecast;