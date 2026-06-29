// import Watchlist from "./Watchlist";

function MovieCard({
  poster_path,
  name,
  addToWatchList,
  movieObj,
  removeFromWatchList,
  watchlist = [],
}) {
  function doesContain(movieObj) {
    for (let i = 0; i < watchlist.length; i++) {
      if (watchlist[i].id === movieObj.id) {
        return true;
      }
    }
    return false;
  }

  return (
    <div
      className="h-[50vh] w-[200px] bg-cover bg-center rounded-xl hover:cursor-pointer hover:scale-110 duration-300 flex items-end flex-col justify-between"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/w500${poster_path})`,
      }}
    >
      {doesContain(movieObj) ? (
        <div
          onClick={() => removeFromWatchList(movieObj)}
          className="m-4 flex justify-center items-center w-8 h-8 rounded-lg bg-gray-900/60"
        >
          &#10060;
          
        </div>
      ) : (
        <div
          onClick={() => addToWatchList(movieObj)}
          className="m-4 flex justify-center items-center w-8 h-8 rounded-lg bg-gray-900/60"
        >
          &#10084;
        </div>
      )}

      <div className="text-white text-xl w-full text-center bg-gray-900/50 rounded-b-xl">
        {name}
      </div>
    </div>
  );
}

export default MovieCard;
