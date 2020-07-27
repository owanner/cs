module.exports = app => {
    app.post('/signup', app.api.user.create)
    app.post('/signin', app.api.auth.signin)

    app.route('/users')
        .post(app.api.user.create)
        .get(app.api.user.index)

    app.route('/users/:id')
        .get(app.api.user.indexById)
        .put(app.api.user.create)

    app.route('/categories')
        .post(app.api.category.create)
        .get(app.api.category.index)

    app.route('/categories/:id')
        .get(app.api.category.indexById)
        .put(app.api.category.create)
        .delete(app.api.category.remove)

    app.route('/books')
        .post(app.api.book.create)
        .get(app.api.book.index)

    app.route('/books/:id')
        .get(app.api.book.indexById)
        .put(app.api.book.create)
        .delete(app.api.book.remove)

    /*app.route('/categories/:id/books')
        .get(app.api.book.indexByCategory)*/
}