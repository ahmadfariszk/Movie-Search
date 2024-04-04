import { useEffect, useState } from "react";
import "./App.css";
import SearchBox from "./components/SearchBox";

function App() {
  const [count, setCount] = useState(0);
  const [query, setQuery] = useState("");
  const [responseM, setResponseM] = useState({});
  const [movies, setMovies] = useState([]);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
    },
  };
  
  useEffect(() => {
    if (count>0){console.log("Hello", responseM); //prevent code running at page start
    responseM.results && responseM.results[4] && console.log("Bye", responseM.results[4].name);
    setMovies(responseM.results);}
  }, [responseM]);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    // Make the fetch request with the user input
    fetch(
      `https://api.themoviedb.org/3/search/multi?query=${query}&include_adult=false&language=en-US&page=1`,
      options
    )
      .then((response) => response.json())
      .then((response) => setResponseM(response))
      .catch((err) => console.error(err));
    setCount(prevCount=>prevCount+1);
  };

  return (
    <>
      <h1>Movie-Search</h1>
      <div className="card">
        <SearchBox
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          query={query}
        />
        <div>{responseM.total_results}</div>
        <div>
          {responseM && responseM.results ? (
            responseM.results.map((movie) => movie.name)
          ) : (
            <p>No results found</p>
          )}
        </div>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
