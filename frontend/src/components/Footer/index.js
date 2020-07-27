import React from 'react'
import { Link } from 'react-router-dom'

import './styles.css'

export default Footer => {
    return (
        <div className="footer-container">
            <h3>coffee'n'stories</h3>
            <div className="footer-links">
                <Link to="/about">sobre</Link>
                <Link to="/privacy">termos e privacidade</Link>
                <Link to="/contact">contato</Link>
            </div>
            <div className="footer-copyright">
                <p>© 2020, stork project</p>
            </div>
        </div>
    )
}