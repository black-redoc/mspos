import React, { useState, useEffect, useRef } from 'react';

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

const ModalForm = ({ modal, itemId }) => {
    const [code, setCode] = useState('');
    const [itemName, setItemName] = useState('');
    const [price, setPrice] = useState('');
    const [hasStock, setHasStock] = useState(false);
    const [stock, setStock] = useState();
    const [image, setImage] = useState();
    const [imageName, setImageName] = useState('');
    const [style, setStyle] = useState('modal');
    const [modalTitle, setModalTitle] = useState('');
    const stockRef = useRef();

    const handleSubmit = e => e.preventDefault();

    const handleClose = () => {
        modal.setActive(!modal.isActive);
        setCode('');
        setItemName('');
        setPrice('');
        setHasStock(false);
        setStock('');
        setImage(null);
        setImageName('');
    }
    useEffect(() => {
        if (image)
            setImageName(image.name)
    }, [image])
    const handleCode = e => setCode(e.target.value);
    const handleItem = e => setItemName(e.target.value);
    const handlePrice = e => setPrice(e.target.value);
    const handleHasStock = e => setHasStock(!hasStock);
    const handleStock = e => setStock(e.target.value);
    const handleImage = e => setImage(e.target.files[0]);

    useEffect(() => {
        if (itemId) {
            setModalTitle('Editar Item');
        } else setModalTitle('Agregar Item');
    })

    useEffect(() => {
        const currStock = stockRef.current;
        currStock.disabled = !hasStock;
    }, [hasStock])

    useEffect(() => {
        if (modal.isActive) setStyle('modal is-active')
        else setStyle('modal');
    }, [modal.isActive])

    return (
        <div className={style}>
            <div className="modal-background"></div>
            <div className="modal-content">
                <div className="centered columns">
                    <div className="column panel is-primary is-narrow is-6">
                        <form onSubmit={handleSubmit} className="modal-form">
                            <p className="panel-heading">
                                {modalTitle}
                            </p>
                            <div className="field is-horizontal">
                                <div className="field-label is-normal mt-5 mx-4">
                                    <label className="label">Código</label>
                                </div>
                                <div className="field-body mt-4 mx-4">
                                    <div className="field">
                                        <p className="control is-expanded has-icons-left">
                                            <input onChange={handleCode} className="input" type="text" placeholder="Código" />
                                            <span className="icon is-small is-left">
                                                <i className="fas fa-qrcode"></i>
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="field is-horizontal">
                                <div className="field-label is-normal mt-5 mx-4">
                                    <label className="label">Nombre</label>
                                </div>
                                <div className="field-body mt-4 mx-4">
                                    <div className="field">
                                        <p className="control is-expanded has-icons-left">
                                            <input onChange={handleItem} className="input" type="text" placeholder="Nombre" />
                                            <span className="icon is-small is-left">
                                                <i className="fas fa-shopping-cart"></i>
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="field is-horizontal">
                                <div className="field-label is-normal mt-5 mx-4">
                                    <label className="label">Precio</label>
                                </div>
                                <div className="field-body mt-4 mx-4">
                                    <div className="field">
                                        <p className="control is-expanded has-icons-left">
                                            <input onChange={handlePrice} className="input" type="number" placeholder="Precio" />
                                            <span className="icon is-small is-left">
                                                <i className="fas fa-cash-register"></i>
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="field is-horizontal">
                                <div className="field-label is-normal mt-5 mx-4">
                                    <label className="label">Aplica Inventario</label>
                                </div>
                                <div className="field-body mt-6 mx-4">
                                    <input onChange={handleHasStock} type="checkbox" />
                                </div>
                            </div>

                            <div className="field is-horizontal">
                                <div className="field-label is-normal mt-5 mx-4">
                                    <label className="label">Inventario</label>
                                </div>
                                <div className="field-body mt-4 mx-4">
                                    <div className="field">
                                        <p className="control is-expanded has-icons-left">
                                            <input ref={stockRef} onChange={handleStock} className="input" type="number" placeholder="Inventario" />
                                            <span className="icon is-small is-left">
                                                <i className="fas fa-cubes"></i>
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="field is-horizontal align-right">
                                <div className="file is-right is-primary">
                                    <label className="file-label mt-4">
                                        <input className="file-input" type="file" accept="image/*" onChange={handleImage} />
                                        <span className="file-cta">
                                            <span className="file-icon">
                                                <i className="fas fa-upload"></i>
                                            </span>
                                            <span className="file-label">
                                                Subir foto
                                        </span>
                                        </span>
                                        <span className="file-name">
                                            {imageName}
                                        </span>
                                    </label>
                                </div>
                            </div>

                            <div className="field">
                                <div className="control">
                                    <div className="align-right my-2">
                                        <button className="button is-link ml-2">Guardar</button>
                                        <button className="button is-danger mr-2" onClick={handleClose}>Cancelar</button>
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

const AlertDelete = ({ modal, itemId }) => {
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