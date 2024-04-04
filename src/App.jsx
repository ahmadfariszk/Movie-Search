import { useEffect, useState } from "react";
import "./App.css";
import SearchBox from "./components/SearchBox";
import Results from "./components/Results";

function App() {
  const [count, setCount] = useState(0);
  const [query, setQuery] = useState("");
  const [movieResults, setMovieResults] = useState({});
  const [movies, setMovies] = useState([]);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
    },
  };

  useEffect(() => {
    if (count > 0) {
      console.log("Hello", movieResults); //prevent code running at page start
      movieResults.results &&
        movieResults.results[4] &&
        console.log("Bye", movieResults.results[4].title);
    }
  }, [movieResults]);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };
  const handleSubmit = async(event) => {
    event.preventDefault();
    // Make the fetch request with the user input
    await fetch(
      `https://api.themoviedb.org/3/search/multi?query=${query}&include_adult=false&language=en-US&page=1`,
      options
    )
      .then((response) => response.json())
      .then((response) => setMovieResults(response))
      .catch((err) => console.error(err));
    console.log("object")
    setCount((prevCount) => prevCount + 1);
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
        <Results movieResults={movieResults} count={count} />
      </div>
    </>
  );
}

export default App;
