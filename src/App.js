import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import quote from "./quote.png";
import "./App.css";

function App() {
  const [quotes, setQuotes] = useState([]);
  const [err, setErr] = useState(false);
  const [loaded, setLoaded] = useState(false);

  function fetchQuotesApi() {
    setLoaded(true);
    fetch("https://cyf-alexandrubudaca-quotes-api.herokuapp.com/quotes/random")
      .then((res) => res.json())
      .then((data) => setQuotes(data))
      .catch((err) => setErr(err));
    setLoaded(false);
  }
  useEffect(() => {
    fetchQuotesApi();
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        {err && (
          <div>
            <div>404</div>
            <div>Sorry, something went wrong!</div>
          </div>
        )}
        {loaded ? (
          <img src={logo} className="App-logo" alt="logo" />
        ) : err ? null : (
          <div className="quotes-card">
            <div className="quote">
              <img src={quote} alt="quote" />
              <h2>{quotes.quote}</h2>
            </div>
            <div>
              <h5>{quotes.author}</h5>
            </div>
            <button onClick={fetchQuotesApi}>New Quote</button>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
