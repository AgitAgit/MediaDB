import React, { useState } from "react";

function FilterButton(){
    const [method, setMethod] = useState("title");

    function handleFilterChange(event){
        setMethod(event.target.value);
    }
    
    return(
        <div id="filter-container">
            <label>Search By:</label>
            <select value={method} onChange={handleFilterChange}>
                <option value="title">Title</option>
                <option value="author">Author</option>
                <option value="language">Language</option>
                <option value="description">Description</option>
            </select>
        </div>
    );
}

export default FilterButton;