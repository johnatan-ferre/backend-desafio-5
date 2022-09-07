import express from 'express'

import { Server as HttpServer } from 'http'
import { Server as Socket } from 'socket.io'

import ContenedorSQL from './contenedores/ContenedorSQL.js'

import config from './config.js'

//--------------------------------------------
// instancio servidor, socket y api

const app = express()
const httpServer = new HttpServer(app)
const io = new Socket(httpServer)

const productosApi = new ContenedorSQL(config.mariaDb, 'productos')
const mensajesApi = new ContenedorSQL(config.sqlite3, 'mensajes')

//--------------------------------------------
// configuro el socket

app.use(express.static('public'))

io.on('connection', async socket => {
    console.log('Nuevo cliente conectado')
    const productos = await productosApi.getAll()
    const mensajes = await mensajesApi.getAll()

    socket.emit('mensajes', mensajes)
    console.log(mensajes)

    socket.on('nuevoMensaje', async messages => {
        let horaActual = new Date().getHours()
        let minActual = new Date().getMinutes()
        messages.hour = horaActual + ':' + minActual
        mensajes.push(messages)
        await mensajesApi.save(messages)
        io.sockets.emit('mensajes', mensajes)
        await mensajesApi.disconnect()
    })

    //Productos
    socket.emit('productos', productos)
    console.log(productos)

    socket.on('updateProducto', async producto => {
        productos.push(producto)
        await productosApi.save(producto)
        io.sockets.emit('productos', productos)
        await productosApi.disconnect()
    })
});

//--------------------------------------------
// agrego middlewares

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

//--------------------------------------------
// inicio el servidor

const PORT = 8080
const connectedServer = httpServer.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${connectedServer.address().port}`)
})
connectedServer.on('error', error => console.log(`Error en servidor ${error}`))
