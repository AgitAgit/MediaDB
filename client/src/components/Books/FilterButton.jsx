import React, { useState } from "react";

function FilterButton(props){
    const {method, setMethod} = props;

    function handleFilterChange(event){
        setMethod(event.target.value);
    }
    
    return(
        <div id="filter-container">
            <label>Search By:</label>
            <select value={method} onChange={handleFilterChange}>
                <option value="title">Title</option>
                <option value="authors">Author</option>
                <option value="language">Language</option>
                <option value="description">Description</option>
            </select>
        </div>
    );
}

export default FilterButton;