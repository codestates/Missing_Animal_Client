import React, { useState } from 'react';
import './searchBar.css';

function SearchBar({ searchPets }) {
    const [ state, setState ] = useState({ keyword: '' });

    return (
        <div className="searchbar">
            <div>Search Bar</div>
            <input type="text" value={state.keyword} 
                onChange={(event) => {
                    setState(() => ({ keyword: event.target.value }));
                }} 
            ></input> 
            <button type="submit" 
                onClick={(event) => {
                    // console.log('search clicked!');
                    event.preventDefault();
                    searchPets(state.keyword);
                }}
            >Search</button>
        </div>
    )
}

export default SearchBar;