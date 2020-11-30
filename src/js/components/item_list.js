import React from 'react';

const BuildCard = ({ content }) => {
    return (
        <div className="card column is-3 mb-1">
            <div className="card-image">
                <figure className="image is-4by3 pointer pointer-box">
                    <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image" />
                </figure>
            </div>
            <div className="card-content">

                <div className="content">
                    <p className="title is-6 pointer">Item {content}</p>
                </div>
            </div>
        </div>
    )
}

export default function ItemList() {
    const list = [...Array(20).keys()];
    return (
        <div className="container mt-3">
            <div className="columns is-gapeless is-multiline is-mobile px-3">
                {list.map(i => <BuildCard key={i} content={i} />)}
            </div>
        </div>
    )
}