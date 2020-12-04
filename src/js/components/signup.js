import React from 'react'
import { Link } from 'react-router-dom';

export default function SignUp() {
    const handleSubmit = e => {
        e.preventDefault();
    }
    return (
        <div className="centered columns">
            <div className="column panel is-primary is-narrow is-6">
                <p className="panel-heading">
                    Registro de Usuario
                </p>
                <form onSubmit={handleSubmit}>
                    <div className="field is-horizontal">
                        <div className="field-label is-normal mt-5">
                            <label className="label">Usuario</label>
                        </div>
                        <div className="field-body mt-4">
                            <div className="field">
                                <p className="control is-expanded has-icons-left">
                                    <input className="input" type="text" placeholder="Nombre de Usuario" />
                                    <span className="icon is-small is-left">
                                        <i className="fas fa-user"></i>
                                    </span>
                                </p>
                                <p class="help is-danger">El nombre de usuario ya existe</p>
                            </div>
                        </div>
                    </div>

                    <div className="field is-horizontal">
                        <div className="field-label is-normal mt-4">
                            <label className="label">Contraseña</label>
                        </div>
                        <div className="field-body mt-4">
                            <div className="field">
                                <p className="control is-expanded has-icons-left">
                                    <input className="input" type="password" placeholder="Contraseña" />
                                    <span className="icon is-small is-left">
                                        <i className="fas fa-key"></i>
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="field is-horizontal">
                        <div className="field-label is-normal mt-4">
                            <label className="label">Repetir Contraseña</label>
                        </div>
                        <div className="field-body mt-4">
                            <div className="field">
                                <p className="control is-expanded has-icons-left">
                                    <input className="input" type="password" placeholder="Contraseña" />
                                    <span className="icon is-small is-left">
                                        <i className="fas fa-key"></i>
                                    </span>
                                </p>
                                <p class="help is-danger">Las contraseñas no coinciden</p>
                            </div>
                        </div>
                    </div>

                    <div className="field">
                        <div className="control my-5">
                            <div className="columns">
                                <div className="column is-offset-2">
                                    <button className="button is-link">Registrarse</button>
                                    <span className="button is-white">
                                        Ya tienes cuenta? Quizas quieres
                                    <Link to="/signin" className="button is-ghost ml-1">
                                            iniciar sesión
                                    </Link>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                </form>
            </div>
        </div>
    )
}
