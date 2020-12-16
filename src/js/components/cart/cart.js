import React, { useState, createRef, useContext } from 'react';
import { useEffect } from 'react/cjs/react.development';
import { ItemsContext } from '../items';

function CartList({ item }) {
    /*
     * helper function for build the table body when comes the param 
     * item when it's iterating the items array
     */
    return (
        <tr>
            <td>
                <a href="#" className="panel-block is-active">
                    <span className="panel-icon">
                        <i className="fas fa-shopping-basket"></i>
                    </span>
                    {item.name}
                </a>
            </td>
            <td>
                <a href="#" className="panel-block is-active">
                    {item.quantity}
                </a>
            </td>
            <td>
                <a href="#" className="panel-block is-active">
                    {item.price}
                </a>
            </td>

        </tr>
    )
}

export default function Cart({ items }) {
    const cartRef = createRef();
    const toggleCartRef = createRef();
    const [cart_arrow, setCartArrow] = useState('fas fa-chevron-left');
    const [cartQuantity, setCartQuantity] = useState(0);
    const { cartItems } = useContext(ItemsContext);

    // function for rounde a point floating number
    const rounder = num => Math.round(num * 100) / 100;
    // function for sum all the prices of an items array
    const pricesReducer = elements => elements.reduce((prev, curr) => curr.price + prev, 0);

    useEffect(() => {
        if (cartItems.length > 0) {
            setCartQuantity(cartItems.reduce((prev, curr) => curr.quantity + prev, 0));
        }
    }, [cartItems])

    /*
     * function triggered when the toggleButton is clicked and enable 
     * animation for toggleButton and cartPanel
     */
    const toggleCart = () => {
        const cart = cartRef.current;
        const toggleCart = toggleCartRef.current;
        cart.classList.toggle('cart-closed');
        toggleCart.classList.toggle('toggle-cart-closed');
        const style = cart_arrow.includes('right') ? 'fas fa-chevron-left' : 'fas fa-chevron-right';
        setCartArrow(style);
    }

    return (
        <>
            <div ref={toggleCartRef} className="toggle-cart fixed mb-2 mr-2 toggle-cart-closed" onClick={toggleCart}>
                <span className="icon is-large is-left is-relative">
                    <i className={cart_arrow}></i>
                    <p className="cart-quantity">
                        {cartQuantity}
                    </p>
                </span>
            </div>
            <aside ref={cartRef} className="column panel is-primary cart-panel fixed v-scroll cart-closed">
                <p className="panel-heading">
                    <div className="columns">
                        <div className="column mt-1">
                            Venta
                    </div>
                        <div className="column is-offset-6">
                            <button className="button is-info">Facturar</button>
                        </div>
                    </div>
                </p>

                <table className="table is-narrow is-hoverable is-striped is-fullwidth">
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th>Cantidad</th>
                            <th>Precio</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems.map((e, idx) => <CartList key={idx} item={e} />)}
                    </tbody>
                </table>
                <table className="table is-fullwidth">
                    <thead>
                        <tr>
                            <th>Total</th>
                            <th></th><th></th><th></th><th></th>
                            <th>{rounder(pricesReducer(cartItems))}</th>
                        </tr>
                    </thead>
                </table>
            </aside>
        </>
    )
}
