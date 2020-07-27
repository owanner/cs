import React, {useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {MdAssignmentInd, MdHelp} from 'react-icons/md'

import api from '../../services/api'
import './styles.css'

export default Login => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const history = useHistory()

    async function handleLogin(event){
        event.preventDefault()

        try {
            const response = await api.post('signin', {email, password})

            localStorage.setItem('userId', response.data.id)
            localStorage.setItem('userName', response.data.name)
            localStorage.setItem('userEmail', response.data.email)

            history.push('/home')

        } catch (error) {
            alert('Falha no login, tente novamente')
        }
    }

    return (
        <div className="login-container">
            <h1>coffee'n'stories</h1>
            <section className="form">
                <form onSubmit={handleLogin}>
                    <h2>faça seu login</h2>

                    <input type="text" placeholder="e-mail" value={email} onChange={event => setEmail(event.target.value)}/>
                    <input type="password" placeholder="senha" value={password} onChange={event => setPassword(event.target.value)}/>
                    <button type="submit">entrar</button>
                    <div className="links">
                    <Link to="/register">
                        <MdAssignmentInd size={24} color="#fbc02d" />
                        ainda não sou cadastrado
                    </Link>
                    <Link to='/help'>
                        <MdHelp size={24} color="#fbc024" />
                        esqueci meu cadastro
                    </Link>
                    </div>
                </form>
            </section>
        </div>
    )
}