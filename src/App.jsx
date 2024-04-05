import { useEffect, useState } from "react";
import "./App.css";
import SearchBox from "./components/SearchBox";
import Results from "./components/Results";
import TabBar from "./components/TabBar";

function App() {
  const [count, setCount] = useState(0);
  const [query, setQuery] = useState("");
  const [movieResults, setMovieResults] = useState({});
  const [activeTab, setActiveTab] = useState("Movies");
  const [pageNumber, setPageNumber] = useState(1);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
    },
  };
  useEffect(() => {
    if (query !== "") {
      getResults();
      console.log("find me");
    }
  }, [activeTab, pageNumber]);

  useEffect(() => {
    if (count > 0) {
      console.log("Hello", movieResults); //prevent code running at page start
      movieResults.results &&
        movieResults.results[4] &&
        console.log("Bye", movieResults.results[4].title);
    }
  }, [movieResults]);

  function getResults() {
    const searchType = () => {
      if (activeTab === "Movies") {
        return "movie";
      } else if (activeTab === "Series") {
        return "tv";
      }
    };
    fetch(
      `https://api.themoviedb.org/3/search/${searchType()}?query=${query}&include_adult=false&language=en-US&page=${pageNumber}`,
      options
    )
      .then((response) => response.json())
      .then((response) => setMovieResults(response))
      .catch((err) => console.error(err));
  }
  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Make the fetch request with the user input
    await getResults();
    console.log("object");
    setCount((prevCount) => prevCount + 1);
  };
  const handlePageChange = (event) => {
    setPageNumber(event.target.value);
  };
  useEffect(() => {
    console.log("Page:", pageNumber);
  }, [pageNumber]);
  function pagination() {
    let pageList = [];
    for (let i = 1; i <= movieResults.total_pages; i++) {
      pageList.push(i);
    }

    console.log({ pageList });
    return (
      <>
        <>
          showing {movieResults.results.length} results of{" "}
          {movieResults.total_results}
        </>
        <>
          <select onChange={handlePageChange}>
            {pageList.map((number) => (
              <option key={number}>{number}</option>
            ))}
          </select>
        </>
      </>
    );
  }

  return (
    <>
      <h1>Movie-Search</h1>
      <div className="card">
        <SearchBox
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          query={query}
        />
        <TabBar activeTab={activeTab} setActiveTab={setActiveTab} />
        <Results
          movieResults={movieResults}
          count={count}
          activeTab={activeTab}
        />
        <div>{movieResults.total_pages && pagination()} </div>
      </div>
    </>
  );
}

export default App;
