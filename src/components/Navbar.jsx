import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex border space-x-8 items-center pl-3 py-2">
      <i class="fa-solid fa-clapperboard fa-2xl"></i>{" "}
      <Link to="/" className="text-blue-500 text-xl font-bold">
        Movies
      </Link>
      <Link to="/watchlist" className="text-blue-500 text-xl font-bold">
        Watchlist
      </Link>
    </div>
  );
};

export default Navbar;
