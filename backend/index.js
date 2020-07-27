const express = require('express')
const consign = require('consign')
const database = require('./config/database.js')

const app = express()
app.database = database

consign()
    .then('./config/middlewares.js')
    .then('./api/validator.js')
    .then('./api')
    .then('./config/routes.js')
    .into(app)

app.get('/', function(request, response) {
    return response.json({
        projeto: 'coffee n stories',
        autor: 'stork project'
    })
})

app.listen(3333)