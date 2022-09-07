import knex from 'knex'
import config from '../src/config.js'

//------------------------------------------
// productos en MariaDb

const mariaDbClient = knex(config.mariaDb)

    try {
        //Implementar creación de tabla
        await mariaDbClient.schema.dropTableIfExists('articulos')
        await mariaDbClient.schema.createTable('articulos', table => {
            table.increments('id').primary()
            table.string('title').notNullable()
            table.float('price')
            table.string('thumbnail')
        })

        // Elementos de ejemplo
        const articulos = [
            {title: 'Jarabe', price: 300, thumbnail: ''},
            {title: 'Ibuprofeno', price: 200, thumbnail: ''},
            {title: 'Antibiotico', price: 500, thumbnail: ''}
        ]

        await mariaDbClient('articulos').insert(articulos)
        console.log('Tabla articulos en mariaDb creada con éxito')    
    } catch (error) {
        console.log('Error al crear tabla articulos en mariaDb')
        console.log(error)
        } finally {
            await mariaDbClient.destroy()
        }

//------------------------------------------
// mensajes en SQLite3

const sqliteClient = knex(config.sqlite3)
    try {
        //Implementar creación de tabla
        await sqliteClient.schema.dropTableIfExists('mensajes')
        await sqliteClient.schema.createTable('mensajes', table => {
            table.increments('id').primary()
            table.string('author').notNullable()
            table.string('hour')
            table.string('text')
        })

        const mensaje = [
            {author: 'La base de datos', hour: '0:00', text: 'Bienvenido.'},
            {author: 'Admin', hour: '0:00', text: 'Puede escribir sus mensajes aqui.'}
        ]

        await sqliteClient('mensajes').insert(mensaje)
        console.log('Tabla mensajes en sqlite3 creada con éxito')
    } catch (error) {
        console.log('Error al crear tabla mensajes en sqlite3')
    } finally {
        await sqliteClient.destroy()
    }