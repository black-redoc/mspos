import React, { useState, useEffect } from 'react';


export const AlertDelete = ({ modal, itemId }) => {
    const [style, setStyle] = useState('modal');

    useEffect(() => {
        if (modal.isActive) setStyle('modal is-active')
        else setStyle('modal')
    })

    const handleSubmit = e => e.preventDefault();
    const handleClose = () => {
        modal.setActive(!modal.isActive);
    }

    return (
        <div className={style}>
            <div className="modal-background"></div>
            <div className="modal-content">
                <div className="centered columns">
                    <div className="column panel is-primary is-narrow is-6">
                        <form onSubmit={handleSubmit} className="modal-form">
                            <p className="panel-heading">Eliminar Item</p>
                            <div className="field">
                                <div className="control my-6">
                                    <div className="center-horizontal">
                                        <h2 className="title is-6 mb-4">Desea eliminar este Item?</h2>
                                    </div>
                                    <div className="center-horizontal">
                                        <button className="button is-link mx-5">Eliminar</button>
                                        <button className="button is-danger mx-5" onClick={handleClose}>Cancelar</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}