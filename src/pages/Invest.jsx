import React from 'react';
import { useLocation } from 'react-router-dom';
export default function Invest() {
 const query = new URLSearchParams(useLocation().search).get('query');

    return (
        <div>
            <h1>Invest Page</h1>
            {query ? <p>Searching for: {query}</p> : <p>No search term provided.</p>}
        </div>
    );
}
