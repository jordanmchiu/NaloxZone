import React from 'react';
import './MainMap.css'

const SearchBox = ({setLocation}) => {
    let currLoc;
    return (
        <div className="form">
            <input className="submit-input-location" placeholder="Enter your location" ref={node => {
                currLoc = node;
            }} />
            <button className="submit" onClick={() => {
                setLocation(currLoc.value);
            }}>
                submit
            </button>
        </div>
    )
};

export default SearchBox