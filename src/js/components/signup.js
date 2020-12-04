import React, { useState, useEffect, createRef } from 'react'
import { Link } from 'react-router-dom';

export default function SignUp() {
    const submitBtnRef = createRef();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [hasErrors, setHasErrors] = useState({
        username: true,
        password: true,
        passwordCon: true
    });

    useEffect(() => {
        const submit = submitBtnRef.current;
        if (!hasErrors.username && !hasErrors.password && !hasErrors.passwordCon)
            submit.disabled = false;
        else
            submit.disabled = true;
    }, [hasErrors]);

    useEffect(() => {
        if (false) {
            setUsernameError('El nombre de usuario ya existe');
            setHasErrors({ ...hasErrors, username: true });
        } else {
            setUsernameError('');
            setHasErrors({ ...hasErrors, username: false });
        }
    }, [username]);

    useEffect(() => {
        if (password.length < 8) {
            setPasswordError('La contraseña debe tener mínimo 8 caracteres');
            setHasErrors({ ...hasErrors, password: true });
        } else {
            setPasswordError('');
            setHasErrors({ ...hasErrors, password: false });
        }

    }, [password]);

    useEffect(() => {
        if (passwordConfirmation !== password) {
            setPasswordError('Las contraseñas no coinciden');
            setHasErrors({ ...hasErrors, passwordCon: true });
        } else {
            setPasswordError('')
            setHasErrors({ ...hasErrors, passwordCon: false });
        };

    }, [passwordConfirmation]);

    const handleUserName = e => setUsername(e.target.value);

    const handlePassword = e => setPassword(e.target.value);

    const handlePasswordConfirmation = e => setPasswordConfirmation(e.target.value);

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
                        <div className="field-label is-normal mt-5 mx-2">
                            <label className="label">Usuario</label>
                        </div>
                        <div className="field-body mt-4 mx-2">
                            <div className="field">
                                <p className="control is-expanded has-icons-left">
                                    <input className="input" type="text" placeholder="Nombre de Usuario" onChange={handleUserName} />
                                    <span className="icon is-small is-left">
                                        <i className="fas fa-user"></i>
                                    </span>
                                </p>
                                <p className="help is-danger">{usernameError}</p>
                            </div>
                        </div>
                    </div>

                    <div className="field is-horizontal">
                        <div className="field-label is-normal mt-4 mx-2">
                            <label className="label">Contraseña</label>
                        </div>
                        <div className="field-body mt-4 mx-2">
                            <div className="field">
                                <p className="control is-expanded has-icons-left">
                                    <input className="input" type="password" placeholder="Contraseña" onChange={handlePassword} />
                                    <span className="icon is-small is-left">
                                        <i className="fas fa-key"></i>
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="field is-horizontal">
                        <div className="field-label is-normal mt-4 mx-2">
                            <label className="label">Repetir Contraseña</label>
                        </div>
                        <div className="field-body mt-4 mx-2">
                            <div className="field">
                                <p className="control is-expanded has-icons-left">
                                    <input className="input" type="password" placeholder="Contraseña" onChange={handlePasswordConfirmation} />
                                    <span className="icon is-small is-left">
                                        <i className="fas fa-key"></i>
                                    </span>
                                </p>
                                <p className="help is-danger">{passwordError}</p>
                            </div>
                        </div>
                    </div>

                    <div className="field is-horizontal">
                        <div className="field-label is-normal mt-4 mx-2">

                        </div>
                        <div className="field-body mt-4 mx-2">
                            <div className="field">
                                <label className="ceckbox">
                                    <input type="checkbox" className="checkbox" /> ¿Es admin?
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="field">
                        <div className="control my-5">
                            <div className="columns">
                                <div className="column is-offset-2">
                                    <button ref={submitBtnRef} className="button is-link ml-2" disabled>Registrarse</button>
                                    <span className="button is-white">
                                        Ya tienes cuenta? Quizas quieres
                                    <Link to="/signin" className="button is-link is-inverted ml-1">
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
