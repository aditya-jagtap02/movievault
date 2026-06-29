import { useState, useEffect } from "react";
import axios from "axios";

function Banner() {
  const [banners, setBanner] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    axios
      .get(
        // CHANGE 1: Swapped domain for '/tmdb-api' to bypass ISP blocks
        "/tmdb-api/discover/movie?api_key=68912da212615bf9fe7b081bf7bf6856&include_adult=false&include_video=false&language=en-US&page=1&sort_by=vote_average.desc&without_genres=99,10755&vote_count.gte=200"
      )
      .then((res) => {
        setBanner(res.data.results);

        // Select a random movie initially
        const random = Math.floor(Math.random() * res.data.results.length);
        setCurrentIndex(random);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (banners.length === 0) return;

    const interval = setInterval(() => {
      setFade(false);

      setTimeout(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === banners.length - 1 ? 0 : prevIndex + 1
        );

        setFade(true);
      }, 500); // Fade duration
    }, 6000); // Change every 6 seconds

    return () => clearInterval(interval);
  }, [banners]);

  if (banners.length === 0) {
    return (
      <div className="h-[20vh] md:h-[80vh] bg-black animate-pulse"></div>
    );
  }

  const movie = banners[currentIndex];

  return (
    <div
      className={`h-[20vh] md:h-[80vh] bg-cover bg-center flex items-end transition-opacity duration-500 ${
        fade ? "opacity-100" : "opacity-0"
      }`}
      style={{
        // CHANGE 2: Swapped domain for '/tmdb-img' to bypass proxy banner image block
        backgroundImage: `url(/tmdb-img/original${movie.backdrop_path})`,
      }}
    >
      <div className="w-full bg-gradient-to-t from-black to-transparent p-6">
        <h1 className="text-white text-3xl md:text-5xl font-bold">
          {movie.title}
        </h1>

        <p className="text-gray-100 mt-3 hidden md:block w-2/3 line-clamp-3">
          {movie.overview}
        </p>
      </div>
    </div>
  );
}

export default Banner;
