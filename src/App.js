import React from 'react';
import { useState } from 'react'
import { FaSearch } from 'react-icons/fa';
import './style.css';

function App() {
  const [search, setSearch] = useState('');
  const [result, setResult] = useState([]);
  const [information, setInformation] = useState([]);

  // to handle the search results
  const handleSearch = async event => {
    // This will prevent refresh from the user
    event.preventDefault();

    if (search === '') return;
    const api = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=21&srsearch=${search}`;
    const response = await fetch(api);
    
    // This will throw a error to the user if there is nothing in the search results
    if (!response.ok) {
      throw Error(response.statusText);
    }

    const json = await response.json();
    
    setResult(json.query.search);
    setInformation(json.query.searchinfo);
  }

  return (
    <div className="App">
      <header>
        <h1>Fernando Search<FaSearch className="search-icon" /></h1>
        <form className="search-box" onSubmit={handleSearch}>
          <input 
          type="search" 
          placeholder="What are you looking for?" 
          value={search}
          onChange={event => setSearch(event.target.value)}
          />
        </form>
        { (information.totalhits) ? <p>Search Results: {information.totalhits}</p> : ''}
      </header>
      
        {result.map((result, i) => {
          // Get the url
          const url = `https://en.wikipedia.org/?curid${result.pageid}`;

          return (
            <div className="result" key={i}>
              <h3>{result.title}</h3>
              <p dangerouslySetInnerHTML={{ __html: result.snippet }}></p>
              <a href={url} target="_blank" rel="nofollow">Read more</a>
            </div>
          )
        })}
    </div>
  );
}

export default App;
