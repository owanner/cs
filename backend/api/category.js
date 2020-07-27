module.exports = app => {
    const {existsOrError, notExistsOrError} = app.api.validator

    const create = (request, response) => {
        const category = {...request.body}

        if(request.params.id) category.id = request.params.id

        try {
            existsOrError(category.name, 'Nome não informado')
        } catch (message) {
            return response.status(400).send(message)
        }

        if(category.id){
           app.database('categories')
            .update(category)
            .where({id: category.id})
            .then(_ => response.status(204).send())
            .catch(error => response.status(500).send(error))
        } else {
            app.database('categories')
                .insert(category)
                .then(_ => response.status(204).send())
                .catch(error => response.status(500).send(error))
        }
    }

    const remove = async (request, response) => {
        try {
            existsOrError(request.params.id, 'Código da categoria não informado')

            const books = await app.database('books')
                .where({categoryId: request.params.id})
            notExistsOrError(books, 'Categoria possui livros')

            const rowsDeleted = await app.database('categories')
                .where({id: request.params.id}).del()
            existsOrError(rowsDeleted, 'Categoria não foi encontrada')

            response.status(204).send()
        } catch(message) {
            response.status(400).send(message)
        }
    }

    const index = (request, response) => {
        app.database('categories')
            .then(categories => response.json(categories))
            .catch(error => response.status(500).send(error))
    }

    const indexById = (request, response) => {
        app.database('categories')
            .where({id: request.params.id})
            .first()
            .then(category => response.json(category))
            .catch(error => response.status(500).send(error))
    }

    return { create, remove, index, indexById}
}