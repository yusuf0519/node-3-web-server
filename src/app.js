const path = require('path')
const express = require('express')
const hbs = require('hbs')
const app = express()

//define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsDirectoryPath = path.join(__dirname, '../templates/views')
const partialsDirectoryPath = path.join(__dirname, '../templates/partials')


//setup handlebars engine and views
app.set('view engine', 'hbs')
app.set('views', viewsDirectoryPath) //views folder is default for template and we are changing defualt here by template
    //hbs.registerPartial(partialsDirectoryPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Mohd Yusuf'
    })
})

app.get('/about', (req, res) => {
    res.render('about')
})

app.get('/about/*', (req, res) => {
    res.send('are you looking for help?')
})

app.get('/products', (req, res) => {

    if (!req.query.search) {
        res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        res.send({
            error: 'You must provide address'
        })
    } else {
        res.send({
            'address': req.query.address
        })
    }
})

app.get('*', (req, res) => {
    res.send('my 404 page')
})

app.listen(3000, () => {
    console.log('server is up on port 3000')
})