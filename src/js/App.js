import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';

import NavBar from './components/navbar';
import SearchBar from './components/searchbar';
import ItemList from './components/item_list';
import Cart from './components/cart';
import SignUp from './components/signup';
import SignIn from './components/signin';

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

const App = () => {
    const items = buildItems(); // this will removed - only for mock items
    return (
        <>
            <Router>
                <NavBar />
                <Route path="/signin" component={SignIn} />
                <Route path="/signup" component={SignUp} />
                <Route path="/" exact>
                    <>
                        <SearchBar />
                        <ItemList />
                        <Cart items={items} />
                    </>
                </Route>
            </Router>
        </>
    );
}

export default App;