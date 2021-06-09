const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Defne path for express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Set up handlebars engine and views directory
app.set('view engine', 'hbs')
app.set('views', path.join(viewsPath))
hbs.registerPartials(partialsPath)

// Set up static directoru to serve
app.use(express.static(path.join(publicDirPath)))

app.get('', (req, res) => {
    res.render('index', {
        title : 'Weather',
        name : 'Aadil'
    })
})

app.get('/about', (req, res) => { 
    res.render('about', {
        title : 'About',
        name : 'Aadil'
    })
})

app.get('/help', (req, res) =>{
    res.render('help', {
        getHelp : 'Helpful text',
        title : 'Help',
        name : 'Aadil'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error : 'address must be provided to fetch weather data!'
        })
    }
    geocode(req.query.address, (error,{ longitude, latitude, location } = {}) => {
        if(error){
            return res.send({ error })
        }
        forecast(longitude, latitude, (error, forecast) => {
            if(error){
                return res.send({ error })
            }
            res.send({
                forecast,
                location,
                address : req.query.address
            })
        })
    })

})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title : '404',
        errorMessage : 'Help not found' ,
        name : 'Aadil'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title : '404',
        errorMessage : 'Page not found',
        name : 'Aadil'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})
