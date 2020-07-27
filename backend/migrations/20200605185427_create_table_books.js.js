exports.up = function(knex) {
    return knex.schema.createTable('books', table => {
        table.increments('id').primary()
        table.string('name').notNull()
        table.string('summary').notNull()
        table.string('image').notNull()
        table.binary('content').notNull()
        table.integer('rate')
        table.integer('userId').references('id').inTable('users').notNull()
        table.integer('categoryId').references('id').inTable('categories').notNull()
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('books')
};
