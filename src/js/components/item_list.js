import React, { useContext } from 'react';
import { ItemsContext } from './items';

const BuildCard = ({ name, price, code, photo }) => {
    return (
        <div className="card column is-3 mb-1">
            <div className="card-image">
                <figure className="image is-4by3 pointer pointer-box">
                    <img src={photo} alt="Placeholder image" />
                </figure>
            </div>
            <div className="card-content">

                <div className="content">
                    <div className="colums">
                        <div className="column">
                            <p className="subtitle is-6 pointer">{name} | ${price}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function ItemList() {
    const { items, itemsDispatcher } = useContext(ItemsContext);
    const list = [...Array(20).keys()];
    return (
        <div className="container mt-3">
            <div className="columns is-gapeless is-multiline is-mobile px-3">
                {items.map((e, idx) =>
                    <BuildCard key={idx} name={e.name} price={e.price} photo={e.photo} code={e.code} />
                )}
            </div>
        </div>
    )
}