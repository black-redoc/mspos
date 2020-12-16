import React, { useReducer, useEffect } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';

import NavBar from './components/navbar';
import SearchBar from './components/searchbar';
import ItemList from './components/item_list';
import Cart, { cartReducer } from './components/cart';
import SignUp from './components/signup';
import SignIn from './components/signin';
import Items from './components/items';
import ProtectedRoute from './components/protected.route';
import { ItemsContext } from './components/items/';
import { itemsReducer } from './components/items/';
import { ITEM_ADD_ALL } from './components/items/';
const { dbApi } = electron;


const Index = () => {
    return (
        <>
            <SearchBar />
            <ItemList />
            <Cart />
        </>
    )
}

const App = () => {
    const [itemsState, itemsDispatcher] = useReducer(itemsReducer, []);
    const [cartItems, cartDispatcher] = useReducer(cartReducer, []);

    useEffect(async () => {
        try {
            const items = (await dbApi.getItems()).flatMap(e => e._doc);
            itemsDispatcher({ payload: [...items], action: ITEM_ADD_ALL });
        } catch (err) {
            if (err) console.error(err);
        }
    }, [])

    return (
        <>
            <ItemsContext.Provider value={{ itemsDispatcher, items: itemsState, cartItems, cartDispatcher }}>
                <Router>
                    <NavBar />
                    <Route path="/signin" component={SignIn} />
                    <Route path="/signup" component={SignUp} />
                    <Route path="/items" component={Items} />
                    <ProtectedRoute path="/" exact component={Index} />
                </Router>
            </ItemsContext.Provider>
        </>
    );
}

export default App;