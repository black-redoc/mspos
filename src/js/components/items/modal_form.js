import React, { useState, useEffect, useRef } from 'react';
const { dbApi } = electron;

export const ModalForm = ({ modal, itemId }) => {
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

    const handleSubmit = async e => {
        e.preventDefault();
        await dbApi.saveItem({
            name: itemName, 
            price, 
            stockApplies: hasStock, 
            stock,
            code,
            photo_url: image.path, 
            photo_name: image.name
        })
        handleClose();
    }

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