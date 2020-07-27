import React, { useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { MdSearch, MdAccountBox, MdKeyboardArrowDown } from 'react-icons/md'

import './styles.css'

export default Header => {
    const [scrolled, setScrolled] = React.useState(false)

    const history = useHistory()

    const handleScroll = () => {
        const offset = window.scrollY
        if (offset > 200) {
            setScrolled(true)
        } else {
            setScrolled(false)
        }
    }

    useEffect(() => {
        window.addEventListener("scroll", handleScroll)
    })
    let headerClasses = ["header-container"]
    if (scrolled) {
        headerClasses.push("scrolled")
    }

    function handleLogout() {
        localStorage.clear()

        history.push('/')
    }

    return (
        <div className={headerClasses.join(" ")}>
            <div className="header">
                <Link to="/home">
                    <h1>coffee'n'stories</h1>
                </Link>
                <div className="right">
                    <div className="search">
                        <input type="text" placeholder="buscar" />
                        <button className="seach-btn">
                            <MdSearch size={36} color="#fbc02d" />
                        </button>
                    </div>

                    <div className="user">
                        <button className="user-btn">
                            <MdAccountBox size={36} color="#fbc02d" />
                            <MdKeyboardArrowDown size={36} color="#fbc02d" />
                        </button>
                        <div className="user-content">
                            <Link to="/profile">perfil</Link>
                            <Link to="/write">escrever</Link>
                            <Link onClick={handleLogout} id="logout">sair</Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mobile">
                <h1>coffee'n'stories</h1>
            </div>
        </div >
    )
}