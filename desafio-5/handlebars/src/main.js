const express = require('express')
const handlebars = require('express-handlebars')

const ItemsApi = require('../api/items')

const itemsApi = new ItemsApi()

let existenciaItems = false

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.set('views', './views')
app.set('view engine', 'hbs')

app.engine(
    'hbs',
    handlebars({
        extname: '.hbs',
        defaultLayout: 'index',
        layoutsDir: './views/layouts',
        partialDir: __dirname + '/views/partials'
    })
)


app.post('/productos', (req, res) => {
    itemsApi.save(req.body)
    res.redirect('/')
})

app.get('/productos', (req, res) => {
    const items = itemsApi.listAll()
    existenciaItems = items.length > 0 ? true : false
    res.render('vista' {items, existenciaItems})
})

const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el ${server.address().port}`)
})
server.on("error", error => console.log(`Error en servidor ${error}`))