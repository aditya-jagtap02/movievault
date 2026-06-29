import { useEffect, useState } from "react";
import genreId from "../Utility/Genre";

function Watchlist({ watchlist, setWatchList, removeFromWatchList }) {
  const [search, setSearch] = useState("");
  const [genreList, setGenreList] = useState(["All Genre"]);
  const [curGenre, setCurGenre] = useState(["All Genre"])
  let getSearch = (e) => {
    setSearch(e.target.value);
  };
  let aSort = () => {
    let ASort = watchlist.sort((movieA, movieB) => {
      return movieA.vote_average - movieB.vote_average;
    });
    setWatchList([...ASort]);
  };

  let dSort = () => {
    let DSort = watchlist.sort((movieA, movieB) => {
      return movieB.vote_average - movieA.vote_average;
    });
    setWatchList([...DSort]);
  };

  let getFilter = (genre)=>{
    setCurGenre(genre)
  }
  useEffect(() => {
    let temp = watchlist.map((movieObj) => {
      return genreId[movieObj.genre_ids[0]];
    })
    temp = new Set(temp)
    setGenreList(["All Genre", ...temp]);
    console.log(temp);
  }, [watchlist]);
  return (
    <>
      <div className="flex justify-center m-2">
        <input
          onChange={getSearch}
          value={search}
          type="text"
          placeholder="Search a Movie"
          className="[h-3rem] w-[18rem] bg-gray-300 outline-none px-4"
        />
      </div>

      <div className="flex justify-center flex-wrap m-4 cursor-pointer">
        {genreList.map((genre) => {
          return <div onClick={()=>getFilter(genre)}  className={curGenre==genre?"flex justify-center h-[3rem] w-[9rem] rounded-xl text-white font-bold items-center bg-blue-400 mx-4": "flex justify-center h-[3rem] w-[9rem] rounded-xl text-white font-bold items-center bg-gray-400 mx-4" }>
            {genre}
          </div>;
        })}
      </div>

      <div className="overflow-hidden rounded-lg border border-gray-300 m-8">
        <table className="w-full text-gray-500 text-center">
          <thead className="border-b-2">
            <tr>
              <th>Name</th>
              <th className="flex justify-center ">
                <div className="p-2 hover:cursor-pointer" onClick={aSort}>
                  <i className="fa-solid fa-arrow-up"></i>
                </div>
                <div className="p-2">Rating</div>
                <div className="p-2 hover:cursor-pointer" onClick={dSort}>
                  <i className="fa-solid fa-arrow-down"></i>
                </div>
              </th>
              <th>Popularity</th>
              <th>Genre</th>
            </tr>
          </thead>
          <tbody>
            {watchlist.filter((movieObj)=>{
              if(curGenre=='All Genre'){
                return true
              } else return genreId[movieObj.genre_ids[0]]==curGenre
            }).filter((movieObj) => {
                return movieObj.title
                  .toLowerCase()
                  .includes(search.toLowerCase());
              })
              .map((movieObj) => {
                return (
                  <tr className="border-b-2" key={movieObj.id}>
                    <td className="flex items-center px-6 py-4">
                      <img
                        className="h-[8rem] w-[10rem] object-contain"
                        src={`https://image.tmdb.org/t/p/w500${movieObj.poster_path}`}
                      />
                      <div className="mx-10">{movieObj.title}</div>
                    </td>
                    <td>{movieObj.vote_average}</td>
                    <td>{movieObj.popularity}</td>
                    <td>{genreId[movieObj.genre_ids[0]]}</td>
                    <td
                      className="text-red-700"
                      onClick={() => removeFromWatchList(movieObj)}
                    >
                      Delete
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Watchlist;
