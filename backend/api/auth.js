module.exports = app => {
    const signin = async (request, response) => {
        if(!request.body.email || !request.body.password) {
            return response.status(400).send('Informe email e senha corretamente')
        }

        const user = await app.database('users')
            .where({ email: request.body.email })
            .first()

        if(!user) return response.status(400).send('Usuário não encontrado')

        if(request.body.password !== user.password){
            return response.status(401).send('E-mail ou senha inválidos')
        }

        const payload = {
            id: user.id,
            name: user.name,
            email: user.email,
        }

        response.json({
            ...payload
        })
    }

    return { signin }
}