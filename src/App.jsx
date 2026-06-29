import { useEffect, useState } from "react";
import "./App.css";
import Banner from "./components/Banner";
import Movies from "./components/Movies";
import Navbar from "./components/Navbar";
import Watchlist from "./components/Watchlist";
import { BrowserRouter, Route, Routes } from "react-router-dom";
function App() {
  let [watchlist, setWatchList] = useState([]);
  let addToWatchList = (movieObj) => {
    let newWatchList = [...watchlist, movieObj];
    localStorage.setItem("moviesApp", JSON.stringify(newWatchList));
    setWatchList(newWatchList);
    console.log(newWatchList);
  };

  let removeFromWatchList = (movieObj) => {
    let filterWatchList = watchlist.filter((movie) => {
      return movie.id !== movieObj.id;
    });
    setWatchList(filterWatchList);
    console.log(filterWatchList);
    localStorage.setItem("moviesApp", JSON.stringify(filterWatchList));
  };

  useEffect(() => {
    let moviesLocal = localStorage.getItem("moviesApp");
    if (!moviesLocal) {
      return;
    }
    setWatchList(JSON.parse(moviesLocal));
  }, []);
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Banner />
                <Movies
                  watchlist={watchlist}
                  removeFromWatchList={removeFromWatchList}
                  addToWatchList={addToWatchList}
                />
              </>
            }
          />
          <Route
            path="/watchlist"
            element={
              <Watchlist
                watchlist={watchlist}
                setWatchList={setWatchList}
                removeFromWatchList={removeFromWatchList}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
