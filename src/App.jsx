import { useEffect, useState } from "react";
import "./App.css";
import SearchBox from "./components/SearchBox";
import Results from "./components/Results";
import TabBar from "./components/TabBar";
import PagesBar from "./components/PagesBar";

function App() {
  const [isInitialised, setIsInitialised] = useState(0);
  const [query, setQuery] = useState("");
  const [resultsData, setResultsData] = useState({});
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
    setResultsData({});
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
      .then((response) => setResultsData(response))
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
          resultsData={resultsData}
          isInitialised={isInitialised}
          activeTab={activeTab}
        />
        <div>
          {resultsData.total_pages && (
            <PagesBar
              resultsData={resultsData}
              handlePageChange={handlePageChange}
            />
          )}{" "}
        </div>
      </div>
    </>
  );
}

export default App;
