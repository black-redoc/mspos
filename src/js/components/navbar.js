import React, { useState } from 'react';
import { HashRouter as Router, Link } from 'react-router-dom';
import logo from '../../public/logo.png';


const NavBar = () => {
    const [burger_style, setBurgerStyle] = useState('navbar-menu')
    const [burger_active, setBurgerActive] = useState(false)

    const openBurger = () => {
        const style = burger_active ? 'navbar-menu' : 'navbar-menu is-active';
        setBurgerActive(!burger_active);
        setBurgerStyle(style)
    }

    return (
        <nav className="navbar is-info" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <Link className="navbar-item" to="/">
                    <img src={logo} className="logo" />
                </Link>

                <a role="button" onClick={openBurger} className="navbar-burger burger" aria-label="menu" aria-expanded="false">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>

            <div className={burger_style}>
                <div className="navbar-start">
                    <a className="navbar-item">
                        Home
                </a>

                    <a className="navbar-item">
                        Documentation
                </a>

                    <div className="navbar-item has-dropdown is-hoverable">
                        <a className="navbar-link">
                            More
                    </a>

                        <div className="navbar-dropdown">
                            <a className="navbar-item">
                                About
                        </a>
                            <a className="navbar-item">
                                Jobs
                        </a>
                            <a className="navbar-item">
                                Contact
                        </a>
                            <hr className="navbar-divider" />
                            <a className="navbar-item">
                                Report an issue
                        </a>
                        </div>
                    </div>
                </div>

                <div className="navbar-end">
                    <div className="navbar-item">
                        <div className="buttons">
                            <Link to="/signup" className="button is-primary">
                                <strong>Registrarse</strong>
                            </Link>
                            <Link to="/signin" className="button is-light">
                                Iniciar Sesión
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
};

export default NavBar;