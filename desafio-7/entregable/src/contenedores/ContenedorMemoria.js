class ContenedorMemoria {
    constructor() {
        this.products = []
    }


    list(id) {
        let productFinder = this.products.find(i => i.id ===id)
        return productFinder
    }

    listAll() {
        return this.products
    }

    save(prod) {
        if (this.products.length > 0) {
            let newProduct = this.products[this.products.length - 1].id + 1
            prod.id = newProduct
            this.products.push(prod)
        } else {
            prod.id = 1
            this.products.push(prod)
        }
    }

    update(prod, id) {
        let productUpdate = this.products.find(i => i.id === id)
        if (productUpdate) {
            this.products[productUpdate].title = prod.title
            this.products[productUpdate].price = prod.price
            this.products[productUpdate].thumbnail = prod.thumbnail
        } else {
            return {error: 'Producto imposible de encontrar.'}
        }
    }

    delete(id) {
        let productDelete = this.products.find(i => i.id === id)
        this.products.splice(productDelete, 1)
    }

    deleteAll() {
        return this.products.splice(0, this.products.length)
    }
}

export default ContenedorMemoria
