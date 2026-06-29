import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import axios from "axios";
import Pagination from "./Pagination";
function Movies({addToWatchList, removeFromWatchList, watchlist}) {
  const [movies, setMovies] = useState([]);
  const [pageNo, setPageNo] = useState(1);

  const toPREV = () => {
    if (pageNo === 1) setPageNo(1);
    else setPageNo(pageNo - 1);
  };

  const toNEXT = () => {
    setPageNo(pageNo + 1);
  };

  useEffect(() => {
    axios
      .get(
        `/tmdb-api/discover/movie?api_key=68912da212615bf9fe7b081bf7bf6856&include_adult=false&include_video=false&language=en-US&page=${pageNo}&sort_by=popularity.desc`,
      )
      .then(function (res) {
        console.log(res.data.results);
        setMovies(res.data.results);
      })
      .catch(function (error) {
        console.error("Error fetching movies via proxy:", error);
      });
  }, [pageNo]);
  return (
    <div className="p-5">
      <div className="text-2xl font-bold text-center m-5">Trending Movies</div>
      <div className="flex flex-row flex-wrap justify-around items-end gap-10">
        {movies.map((movieObj) => {
          return (
            <MovieCard
              key={movieObj.id}
              poster_path={movieObj.poster_path}
              name={movieObj.title}
              addToWatchList={addToWatchList}
              movieObj={movieObj}
              removeFromWatchList={removeFromWatchList}
              watchlist={watchlist}
            />
          );
        })}
      </div>
      <Pagination toNEXT={toNEXT} toPREV={toPREV} pageNo={pageNo} />
    </div>
  );
}

export default Movies;

// https://api.themoviedb.org/3/discover/movie?api_key=68912da212615bf9fe7b081bf7bf6856&include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc
