import React from 'react';
import { HashRouter as Router, Route, Redirect } from 'react-router-dom';

import NavBar from './components/navbar';
import SearchBar from './components/searchbar';
import ItemList from './components/item_list';
import Cart from './components/cart';
import SignUp from './components/signup';
import SignIn from './components/signin';
import ProtectedRoute from './components/protected.route';

const buildItems = () => {
    /*
     * temporal function for mock items
     * this will removed
     */
    const items = [];
    function rounder(num) {
        return Math.round(num * 100) / 100
    }
    for (let i = 1; i <= 9; i++) {
        items.push({
            name: `Item ${i}`,
            quantity: Math.round((Math.random() * 20) + 1),
            price: rounder((Math.random() * 50000) + 1)
        });
    }
    return items;
}

const Index = () => {
    const items = buildItems(); // this will removed - only for mock items
    return (
        <>
            <SearchBar />
            <ItemList />
            <Cart items={items} />
        </>
    )
}

const App = () => {
    return (
        <>
            <Router>
                <NavBar />
                <Route path="/signin" component={SignIn} />
                <Route path="/signup" component={SignUp} />
                <ProtectedRoute path="/" exact component={Index} />
            </Router>
        </>
    );
}

export default App;