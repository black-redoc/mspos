import React, { useState, useEffect, useRef } from 'react';
import { AlertDelete } from './alert_delete';
import { ModalForm } from './modal_form';

export default function Items() {
    const [modalFormActive, setModalFormActive] = useState(false);
    const [alertDeleteActive, setAlertDeleteActive] = useState(false);
    const [itemId, setItemId] = useState(0);

    const handleAddItem = () => {
        setModalFormActive(!modalFormActive);
        setItemId(0);
    }

    const handleDeleteItem = () => {
        setAlertDeleteActive(!alertDeleteActive);
        setItemId('abc');
    }

    const handleEditItem = () => {
        setModalFormActive(!modalFormActive);
        setItemId('abc');
    }

    return (
        <>
            <ModalForm modal={{ isActive: modalFormActive, setActive: setModalFormActive }} itemId={itemId} />
            <AlertDelete modal={{ isActive: alertDeleteActive, setActive: setAlertDeleteActive }} itemId={itemId} />
            <div className="before-nav full-width mx-5 mb-3">
                <div className="columns mt-2">
                    <div className="column is-7 is-offset-2">
                        <div className="field">
                            <div className="control">
                                <input className="input is-primary" type="text" placeholder="Código/Nombre" />
                            </div>
                        </div>
                    </div>
                    <div className="column is-2 is-offset-1">
                        <button className="button is-primary" onClick={handleAddItem}>
                            <span className="mr-2">
                                <i className="fas fa-plus"></i>
                            </span>
                        Agregar Item
                    </button>
                    </div>
                </div>

                <table className="table is-fullwidth">
                    <thead>
                        <tr>
                            <th>Imagen</th>
                            <th>Nombre</th>
                            <th>Codigo</th>
                            <th>Precio</th>
                            <th>Aplica Inventario</th>
                            <th>Inventario</th>
                            <th></th><th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {MockItems().map((item, idx) => <TableRow key={idx} editAction={handleEditItem} deleteAction={handleDeleteItem}>{item}</TableRow>)}
                    </tbody>
                </table>
            </div>
        </>
    )
}

// this is mock function for build test items. This will be removed
const MockItems = () => [...Array(8).keys()]
    .map(i => {
        const hasStock = Boolean(Math.round(Math.random()));
        return {
            photo: 'https://bulma.io/images/placeholders/128x128.png',
            name: `Item${i + 1}`,
            price: Math.round((Math.random() * 100000) * 100) / 100,
            hasStock,
            stock: hasStock ? Math.round(Math.random() * 100) : 0,
            code: Math.round(Math.random() * 1000000)
        }
    })


const TableRow = ({ editAction, deleteAction, children }) => (
    <tr>
        <td>
            <figure className="image is-128x128">
                <img src={children.photo} />
            </figure>
        </td>
        <td>
            {children.name}
        </td>
        <td>
            {children.code}
        </td>
        <td>
            ${children.price}
        </td>
        <td>
            {children.hasStock ? 'Si' : 'No'}
        </td>
        <td>
            {children.stock}
        </td>
        <td>
            <button className="button is-warning" onClick={editAction}>
                <span className="mr-2">
                    <i className="fas fa-pen"></i>
                </span>
            Editar
        </button>
        </td>
        <td>
            <button className="button is-danger" onClick={deleteAction}>
                <span className="mr-2">
                    <i className="fas fa-trash"></i>
                </span>
            Eliminar
        </button>
        </td>
    </tr>
)

