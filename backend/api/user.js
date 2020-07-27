module.exports = app => {
    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validator

    const create = async (request, response) => {
        const user = {...request.body}
        if(request.params.id) user.id = request.params.id

        try {
            existsOrError(user.name, 'Nome não informado')
            existsOrError(user.birthday, 'Data de nascimento não informada')
            existsOrError(user.gender, 'Gênero não informado')
            existsOrError(user.email, 'E-mail não informado')
            existsOrError(user.password, 'Senha não informada')
            existsOrError(user.confirmPassword, 'Confirmação de senha inválida')
            equalsOrError(user.password, user.confirmPassword, 'Senhas não conferem')

            const userFromDB = await app.database('users')
                .where({email: user.email}).first()
                if(!user.id) {
                notExistsOrError(userFromDB, 'Usuário já cadastrado')
            }
        } catch(message) {
            return response.status(400).send(message)
        }

        delete user.confirmPassword

        if(user.id) {
            app.database('users')
                .update(user)
                .where({id: user.id})
                .then(_ => response.status(204).send())
                .catch(error => response.status(500).send(error))
        } else {
            app.database('users')
                .insert(user)
                .then(_ => response.status(204).send())
                .catch(error => response.status(500).send(error))
        }
    }

    const index = (request, response) => {
        app.database('users')
            .select('id', 'name', 'birthday', 'gender', 'email')
            .then(users => response.json(users))
            .catch(error => response.status(500).send(error))
    }

    const indexById = (request, response) => {
        app.database('users')
            .select('id', 'name', 'birthday', 'gender', 'email')
            .where({id: request.params.id})
            .first()
            .then(user => response.json(user))
            .catch(error => response.status(500).send(error))
    }

    return { create, index, indexById }
}