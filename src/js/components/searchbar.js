import React from 'react';

export default function SearchBar() {
    const submit = (e) => {
        e.preventDefault();
        console.log(e.target.searchField.value)
    }

    const change = (e) => {
        console.log(e.target.value);
    }
    return (
        <div className="before-nav">
            <form onSubmit={submit} className="column is-half is-offset-3">
                <div className="field">
                    <div className="control">
                        <input onChange={change} name="searchField" className="input is-info" type="text" placeholder="código/nombre" />
                    </div>
                </div>
            </form>
        </div>
    );
}