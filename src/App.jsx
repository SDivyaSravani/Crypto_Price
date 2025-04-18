import axios from 'axios';
import React, { useEffect, useState } from 'react';
import "./App.css";

const App = () => {
  const [search, setSearch] = useState("");
  const [currency, setCurrency] = useState([]);

  useEffect(() => {
    axios.get("https://openapiv1.coinstats.app/coins", {
      headers: { 'X-API-KEY': 'RwA8QdBsoIDX2ylK26kxcpErb7jh7to4dVQSAPNqEh4=' }
    }).then(res => setCurrency(res.data.result))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="App">
      <h2>Crypto Currency Tracker</h2>
      <input
        type="text"
        placeholder="Search..."
        className="search-box"
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>Symbol</th>
              <th>Market Cap</th>
              <th>Price</th>
              <th>Available Supply</th>
              <th>Volume (24hr)</th>
            </tr>
          </thead>
          <tbody>
            {currency.filter((val) => {
              return val.name.toLowerCase().includes(search.toLowerCase());
            }).map((val) => (
              <tr key={val.id}>
                <td className="rank">{val.rank}</td>
                <td className="logo">
                  <a href={val.websiteUrl} target="_blank" rel="noopener noreferrer">
                    <img src={val.icon} alt="crypto" />
                  </a>
                  <p>{val.name}</p>
                </td>
                <td className="symbol">{val.symbol}</td>
                <td>${val.marketCap.toLocaleString()}</td>
                <td>${val.price.toFixed(2)}</td>
                <td>{val.availableSupply.toLocaleString()}</td>
                <td>{val.volume.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;
