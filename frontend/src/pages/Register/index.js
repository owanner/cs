import React, {useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {MdArrowBack} from 'react-icons/md'

import api from '../../services/api'
import './styles.css'

export default Register => {
    const [name, setName] = useState('')
    const [birthday, setBirthday] = useState('')
    const [gender, setGender] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    
    const history = useHistory()

    async function handleRegister(event) {
        event.preventDefault()

        const data = {
            name,
            birthday,
            gender,
            email,
            password,
            confirmPassword
        }

        console.log(data)

        if (password === confirmPassword) {
            api.post('users', data)

            history.push('/')
        } else {
            alert('Senhas não conferem')
        }
  
    }

    return (
        <div className="register-container">
            <section class="desktop">
                <Link to="/">
                    <MdArrowBack size={24} color="#fbc02d" />
                    voltar para home page
                </Link>

                <h1>coffee'n'stories</h1>

                <h2>cadastro</h2>
                <p>registre-se para ler e compartilhar histórias incríveis</p>
            </section>

            <section className="mobile">                
                <h1>coffee'n'stories</h1>

                <h2>cadastro</h2>
            </section>

            <form onSubmit={handleRegister}>
                <input type="text" placeholder="nome completo" value={name} onChange={event => setName(event.target.value)}/>
                <div id="birthday">
                    <p>data de nascimento</p>
                    <input type="date" placeholder="data de nascimento" value={birthday} onChange={event => setBirthday(event.target.value)}/>
                </div>
                <input type="text" placeholder="gênero" value={gender} onChange={event => setGender(event.target.value)}/>
                <input type="email" placeholder="e-mail" value={email} onChange={event => setEmail(event.target.value)}/>
                <input type="password" placeholder="senha" value={password} onChange={event => setPassword(event.target.value)}/>
                <input type="password" placeholder="senha" value={confirmPassword} onChange={event => setConfirmPassword(event.target.value)}/>
                <button type="submit">cadastrar</button>
            </form>
        </div>
    )
}