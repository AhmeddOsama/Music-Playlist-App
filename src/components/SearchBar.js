// SearchBar.js
import React, { useState } from 'react';

const SearchBar = ({ setSearchTerm }) => {
    const [text, setText] = useState('')
    return (
        <div>
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Search for a song..."
            />
            <button onClick={() => setSearchTerm(text)}>Search</button>
        </div>
    );
};

export default SearchBar;
