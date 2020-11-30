import React from 'react';

import NavBar from './components/navbar';
import SearchBar from './components/searchbar';
import ItemList from './components/item_list';

const App = () => {
    return (
        <>
            <NavBar />
            <SearchBar />
            <ItemList />
        </>
    );
}

export default App;