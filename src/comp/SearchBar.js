//Sök komponent med basic input 
import React from 'react';

const SearchBar = ({ keyword, setKeyword }) => {
    const BarStyling = {
        width: "20rem",
        background: "#F2F1F9",
        border: "none",
        padding: "0.5rem"
    };

    return (
        <>
            <input
                className='searchfield'
                style={BarStyling}
                key="random1"
                value={keyword}
                placeholder={"Search"}
                onChange={(e) => setKeyword(e.target.name, e.target.value)}
            />
            <div className='search-icon'></div>
        </>
    );
}


export default SearchBar;