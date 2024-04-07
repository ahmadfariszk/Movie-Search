import { useEffect, useState } from "react";
import "./App.css";
import SearchBox from "./components/SearchBox";
import Results from "./components/Results";
import TabBar from "./components/TabBar";

function App() {
  const [isInitialised, setIsInitialised] = useState(0);
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

  //useEffect declarations
  //Get new response when tab or page number changes
  useEffect(() => {
    if (query !== "") {
      getResults();
    }
  }, [activeTab, pageNumber]);


  async function getResults() {
    setMovieResults({});
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
    setIsInitialised((previsInitialised) => previsInitialised + 1);
  };
  const handlePageChange = (event) => {
    setPageNumber(event.target.value);
  };

  function pagination() {
    let pageList = [];
    for (let i = 1; i <= movieResults.total_pages; i++) {
      pageList.push(i);
    }
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
          isInitialised={isInitialised}
          activeTab={activeTab}
        />
        <div>{movieResults.total_pages && pagination()} </div>
      </div>
    </>
  );
}

export default App;
