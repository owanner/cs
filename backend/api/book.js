module.exports = app => {
    const { existsOrError } = app.api.validator

    const create = (request, response) => {
        const book = {...request.body}
        if(request.params.id) book.id = request.params.id

        try {
            existsOrError(book.name, 'Título não informado')
            existsOrError(book.summary, 'Resumo não informado')
            existsOrError(book.image, 'Imagem não informada')
            existsOrError(book.content, 'Conteúdo não infomrado')
            existsOrError(book.userId, 'Autor não informado')
            existsOrError(book.categoryId, 'Categoria não informada')
        } catch (message) {
            response.status(400).send(message)
        }

        if(book.id) {
            app.database('books')
                .update(book)
                .where({id: book.id})
                .then(_ => response.status(204).send())
                .catch(error => response.status(500).send(error))
        } else {
            app.database('books')
                .insert(book)
                .then(_ => response.status(204).send())
                .catch(error => response.status(500).send(error))
        }
    }

    const remove = async (request, response) => {
        try {
            const rowsDeleted = await app.database('books')
                .where({ id: request.params.id}).del()
            
            try {
                existsOrError(rowsDeleted, 'Artigo não foi encontrado')
            } catch(message) {
                return response.status(400).send(message)
            }

            response.status(204).send()
        } catch(message) {
            response.status(500).send(message)
        }
    }

    const limit = 10 //paginação

    const index = async (request, response) => {
        const page = request.query.page || 1

        const result = await app.database('books').count('id').first()
        const count = parseInt(result.count)

        app.database('books')
            .select('id', 'name', 'summary')
            .limit(limit).offset(page * limit -limit)
            .then(books => response.json({data: books, count, limit}))
            .catch(error => response.status(500).send(error))
    }

    const indexById = (request, response) => {
        app.database('books')
            .where({id: request.params.id})
            .first()
            .then(book => {
                book.content = book.content.toString()
                return response.json(book)
            })
            .catch(error => response.status(500).send(error))
    }

    /*const indexByCategory = async (request, response) => {
        const categoryId = request.params.id
        const page = request.query.page || 1
        const categories = await applicationCache.database.raw(categoryId)
        const ids = categories.rows.map(category => category.id)

        app.database({book: 'books', user: 'users'})
            .select('book.id', 'book.name', 'book.summary', 'book.image')
            .limit(limit).offset(page * limit - limit)
            .whereRaw('?? = ??', ['user.id', 'book.userId'])
            .whereIn('categoryId', ids)
            .orderBy('book.id', 'desc')
            .then(books => response.json(books))
            .catch(error => response.status(500).send(error))
    }*/

    return {create, remove, index, indexById}
}