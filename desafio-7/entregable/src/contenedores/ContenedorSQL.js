import knex from 'knex'

class ContenedorSQL {

    constructor(config, tabla) {
        this.knex = knex(config)
        this.tabla = tabla
    }

    async getById(id) {
        try {
            const product = await this.getAll()
            let productById = product.find(prod => prod.id === id)
            return productById
        } catch (error) {
            console.log('Ocurrió un error.')
        }  
    }

    async getAll() {
        try {
            let products = await this.knex(this.tabla).select('*')
            return products
        } catch (error) {
            console.log('Ocurrió un error.')
        }
    }

    async save(elem) {
        try {
            await this.knex(this.tabla).insert(elem)
        } catch (error) {
            console.log('Ocurrió un error.')
        }        
    }

    async update(elem, id) {
        try {
            await this.knex.from(this.tabla).where('id', id).update(elem)
        } catch (error) {
            console.log('Ocurrió un error.')
        }
        
    }



    async deleteById(id) {
        try {
            await this.knex.from(this.tabla).where('id', id).del()
        } catch (error) {
            console.log('Ocurrió un error.')
        }
    }

    async deleteAll() {
        try {
            await this.knex.from(this.tabla).del()
        } catch (error) {
            console.log('Ocurrió un error.')
        }
    }

    async disconnect() {
        try {
            await this.knex.destroy()
        } catch (error) {
            console.log('Ocurrió un error.')
        }
    }
}

export default ContenedorSQL