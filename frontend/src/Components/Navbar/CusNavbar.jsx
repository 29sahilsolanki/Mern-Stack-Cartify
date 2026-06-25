import { GiHamburgerMenu } from "react-icons/gi";
import { FaRegUser, FaRegHeart } from "react-icons/fa";
import { BsCartCheck } from "react-icons/bs";
import { useCutomer } from "../../Context/CustomerContext";
import { useLogin } from "../../Context/LoginContext";
import { NavLink, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import Fuse from "fuse.js";

export default function CusNavbar() {
  const navigate = useNavigate();
  const { menu, setMenu, search, setSearch, setProductsCopy, products } =
    useCutomer();
  const { token } = useLogin();

  //------------------- Fuzzy Searching Configuration -----------------------//
  function handleSearch(e) {
    e.preventDefault();
    if (!search.trim()) {
      setProductsCopy(products);
      return;
    }
    const options = {
      keys: ["title", "description"],
      threshold: 0.4,
    };
    const fuse = new Fuse(products, options);
    const results = fuse.search(search);
    setProductsCopy(results.map((p) => p.item));
    navigate("/shop");
  }

  const navLinkClasses = ({ isActive }) =>
    `relative flex flex-col items-center gap-1 transition-all duration-300 text-xs font-medium ${
      isActive ? "text-indigo-600" : "text-gray-500 hover:text-indigo-600"
    }`;

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          {token && (
            <button
              onClick={() => setMenu(!menu)}
              className="p-2 rounded-lg hover:bg-indigo-50 text-gray-600 hover:text-indigo-600 transition"
            >
              <GiHamburgerMenu size={20} />
            </button>
          )}

          <NavLink to="/" className="flex items-center">
            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">
              <span className="text-gray-900">Cart</span>
              <span className="text-indigo-600">ify</span>
            </h1>
          </NavLink>
        </div>

        <div className="hidden lg:flex flex-1 max-w-xl mx-12">
          <form
            onSubmit={handleSearch}
            className="relative w-full flex items-center"
          >
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search premium products..."
              className="w-full border border-gray-200 rounded-xl pl-5 pr-16 py-3 text-sm bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-inner"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-indigo-600 hover:bg-indigo-700 text-white p-2.5 rounded-lg transition-all flex items-center justify-center"
            >
              <FaSearch size={14} />
            </button>
          </form>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4 sm:gap-6 shrink-0">
          <NavLink to="/customer-dashboard/wishlist" className={navLinkClasses}>
            {({ isActive }) => (
              <>
                <div
                  className={`p-2 rounded-xl transition ${isActive ? "bg-indigo-50 text-indigo-600" : "hover:bg-gray-100"}`}
                >
                  <FaRegHeart className="text-lg sm:text-xl" />
                </div>
                <span className="hidden sm:block">Wishlist</span>
                {isActive && (
                  <span className="absolute -bottom-3 h-0.75 w-full bg-indigo-600 rounded-full" />
                )}
              </>
            )}
          </NavLink>

          <NavLink to="/customer-dashboard/cart" className={navLinkClasses}>
            {({ isActive }) => (
              <>
                <div
                  className={`p-2 rounded-xl transition ${isActive ? "bg-indigo-50 text-indigo-600" : "hover:bg-gray-100"}`}
                >
                  <BsCartCheck className="text-lg sm:text-xl" />
                </div>
                <span className="hidden sm:block">Cart</span>
                {isActive && (
                  <span className="absolute -bottom-3 h-0.75 w-full bg-indigo-600 rounded-full" />
                )}
              </>
            )}
          </NavLink>

          <NavLink to="/customer-dashboard/profile" className={navLinkClasses}>
            {({ isActive }) => (
              <>
                <div
                  className={`p-2 rounded-xl transition ${isActive ? "bg-indigo-50 text-indigo-600" : "hover:bg-gray-100"}`}
                >
                  <FaRegUser className="text-lg sm:text-xl" />
                </div>
                <span className="hidden sm:block">Profile</span>
                {isActive && (
                  <span className="absolute -bottom-3 h-0.75 w-full bg-indigo-600 rounded-full" />
                )}
              </>
            )}
          </NavLink>
        </div>
      </div>

      <div className="block lg:hidden border-t border-gray-100 px-4 py-3 bg-white">
        <form
          onSubmit={handleSearch}
          className="relative w-full flex items-center"
        >
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="w-full border border-gray-200 rounded-xl pl-4 pr-14 py-2.5 text-sm bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
          />
          <button
            type="submit"
            className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-indigo-600 text-white p-2 rounded-lg flex items-center justify-center"
          >
            <FaSearch size={12} />
          </button>
        </form>
      </div>
    </header>
  );
}
