import { useEffect, useState } from "react";
import "./App.css";
import SearchBox from "./components/SearchBox";

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
        console.log("Bye", movieResults.results[4].name);
      setMovies(movieResults.results);
    }
  }, [movieResults]);

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
      .then((response) => setMovieResults(response))
      .catch((err) => console.error(err));
    setCount((prevCount) => prevCount + 1);
  };

  const commonURL = `https://image.tmdb.org/t/p/w300`;

  return (
    <>
      <h1>Movie-Search</h1>
      <div className="card">
        <SearchBox
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          query={query}
        />
        <div>
          {count > 0 && <>Found: </>}
          {movieResults.total_results}
        </div>
        <div>
          {movieResults && movieResults.results ? (
            movieResults.results.map((show) => (
              <div key={show.id}>
                {show.media_type == `movie` && (
                  <>
                    <div>
                      {show.id}|{show.title} | {show.original_title} | {show.media_type}
                    </div>
                    {<img width="300" src={show.poster_path===null?(`https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png`):(commonURL+show.poster_path)}></img>}
                  </>
                )}
                {show.media_type == `tv` && (
                  <div>
                    {show.name} | {show.original_name} | {show.media_type}
                  </div>
                )}
                {show.media_type == `person` && (
                  <div>
                    {show.name} | {show.original_name} | {show.media_type}
                  </div>
                )}
              </div>
            ))
          ) : (
            <p>No results found</p>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
