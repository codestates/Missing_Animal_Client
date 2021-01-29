import React, { useState } from 'react';
import './searchBar.css';

function SearchBar({ searchPets }) {
    const [ state, setState ] = useState({ keyword: '' });

    return (
        <div className="searchbar">
            {/* <div>반려동물 검색</div> */}
            <input className="searchInput" type="search" placeholder="검색어를 입력하세요."
                value={state.keyword} 
                onChange={(event) => {
                    setState(() => ({ keyword: event.target.value }));
                }} 
            ></input> 
            <button className="searchButton" type="submit" 
                onClick={(event) => {
                    event.preventDefault();
                    searchPets(state.keyword);
                }}
            >검색하기</button>
        </div>
    )
}

export default SearchBar;