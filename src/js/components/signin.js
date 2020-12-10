import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
const { dbApi, notificationApi } = electron;

export default function SignIn() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const history = useHistory();

    const handleUsername = e => setUsername(e.target.value);
    const handlePassword = e => setPassword(e.target.value);

    const handleSubmit = async e => {
        e.preventDefault();
        if (username.split(' ').join('').length !== 0 || password.split(' ').join('').length !== 0) {
            const res = await dbApi.loginUser({ username, password })
            if (!res) return setErrorMsg('Las credenciales no coinciden. Intente otra vez');
            notificationApi.sendNotificacion({ title: 'Info', message: `Bienvenid@ ${username}` });
            history.push('/');
        } else {
            setErrorMsg('Algunos campos estan vacios');
        }
    }

    return (
        <div className="centered columns">
            <div className="column panel is-primary is-narrow is-6">
                <p className="panel-heading">
                    Inicio de Sesión
                </p>
                <form onSubmit={handleSubmit}>
                    <div className="field is-horizontal">
                        <div className="field-label is-normal mt-5 mx-4">
                            <label className="label">Usuario</label>
                        </div>
                        <div className="field-body mt-4 mx-4">
                            <div className="field">
                                <p className="control is-expanded has-icons-left">
                                    <input className="input" type="text" placeholder="Usuario" onChange={handleUsername} />
                                    <span className="icon is-small is-left">
                                        <i className="fas fa-user"></i>
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="field is-horizontal">
                        <div className="field-label is-normal mt-4 mx-4">
                            <label className="label">Contraseña</label>
                        </div>
                        <div className="field-body mt-4 mx-4">
                            <div className="field">
                                <p className="control is-expanded has-icons-left">
                                    <input className="input" type="password" placeholder="Contraseña" onChange={handlePassword} />
                                    <span className="icon is-small is-left">
                                        <i className="fas fa-key"></i>
                                    </span>
                                </p>
                                <p className="help is-danger">{errorMsg}</p>
                            </div>
                        </div>
                    </div>

                    <div className="field">
                        <div className="control my-5">
                            <div className="columns">
                                <div className="column is-offset-2">
                                    <button className="button is-link ml-4">Iniciar Sesión</button>
                                    <span className="button is-white">
                                        Aún no tienes cuenta? Quizas quieres
                                    <Link to="/signup" className="button is-link is-inverted ml-1">
                                            registrarte
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
