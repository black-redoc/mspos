import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import logo from '../../public/logo.png';
import { Auth } from './auth';
const { notificationApi } = electron;


const NavBar = () => {
    const [burger_style, setBurgerStyle] = useState('navbar-menu')
    const [burger_active, setBurgerActive] = useState(false)
    const history = useHistory();

    const toggleBurger = () => {
        const style = burger_active ? 'navbar-menu' : 'navbar-menu is-active';
        setBurgerActive(!burger_active);
        setBurgerStyle(style)
    }

    const handleRedirect = () => toggleBurger();
    const handleLogout = () => {
        Auth.logout();
        notificationApi.sendNotificacion({ title: 'Info', message: 'Se ha cerrado sesión' });
        if (burger_active) toggleBurger();
        history.push('/signin');
    }

    return (
        <nav className="navbar is-fixed-top is-info" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <Link className="navbar-item" to="/">
                    <img src={logo} className="logo" />
                </Link>

                <a role="button" onClick={toggleBurger} className="navbar-burger burger mr-3" aria-label="menu" aria-expanded="false">
                    <a role="button" href="#" className="button is-dark rounded mt-1">
                        <i className="fas fa-user"></i>
                    </a>
                </a>
            </div>

            <div className={burger_style}>
                <div className="navbar-end">
                    <div className="navbar-item has-dropdown is-hoverable">
                        <div className="buttons">
                            <a role="button" onClick={toggleBurger} className="button is-dark rounded no-mobile" aria-label="menu" aria-expanded="true">
                                <i className="fas fa-user"></i>
                            </a>

                            <div className="navbar-dropdown translatex-7">
                                <div className="navbar-item">
                                    <a href="#" onClick={()=>{}} role="button" className="button is-white">Ajustes</a>
                                </div>
                                <div className="navbar-item">
                                    <a href="#" onClick={()=>{}} role="button" className="button is-white">Items</a>
                                </div>
                                <div className="navbar-item">
                                    <a href="#" onClick={handleLogout} role="button" className="button is-white">Cerrar Sesión</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
};

export default NavBar;