import { useCutomer } from "../Context/CustomerContext";
import { IoIosArrowDown } from "react-icons/io";
import { GiSettingsKnobs } from "react-icons/gi";
import { FiSearch } from "react-icons/fi";
import { useEffect } from "react";
import { CiBookmarkPlus } from "react-icons/ci";
import { FaBookmark } from "react-icons/fa";
import { useState } from "react";
import Fuse from "fuse.js";
export default function Shop() {
  const {
    products,
    singleProductDetail,
    fetchProducts,
    wishlist,
    addToWishlist,
    removeFromWishlist,
    addToCart,
    cart,
    manageBuyNow,
  } = useCutomer();

  useEffect(() => {
    fetchProducts();
  }, []);

  function handleClick(product) {
    singleProductDetail(product);
  }

  function handleAddWishlist(productId) {
    addToWishlist(productId);
  }

  function handleRemoveWishlist(productId) {
    removeFromWishlist(productId);
  }

  function handleCart(productId) {
    addToCart(productId);
  }

  function handleBuyNow(product) {
    manageBuyNow(product);
  }

  //-----------------------duplicate products holder-----------------------//
  const [productsCopy, setProductsCopy] = useState([]);
  //-------------------filtering----------------------//
  const [category, setCategory] = useState("");

  useEffect(() => {
    if (category === "") {
      setProductsCopy(products);
    } else if (category === "electronics") {
      setProductsCopy(products.filter((p) => p.category === "electronics"));
    } else if (category === "furniture") {
      setProductsCopy(products.filter((p) => p.category === "furniture"));
    } else if (category === "jewellery") {
      setProductsCopy(products.filter((p) => p.category === "jewellery"));
    } else if (category === "fashion") {
      setProductsCopy(products.filter((p) => p.category === "fashion"));
    } else if (category === "beauty") {
      setProductsCopy(products.filter((p) => p.category === "beauty"));
    } else if (category === "sports") {
      setProductsCopy(products.filter((p) => p.category === "sports"));
    } else if (category === "home") {
      setProductsCopy(products.filter((p) => p.category === "home"));
    } else if (category === "toys") {
      setProductsCopy(products.filter((p) => p.category === "toys"));
    }
  }, [category, products]);

  //--------------------sorting-----------------------//
  const [sortValue, setSortValue] = useState("");

  useEffect(() => {
    if (sortValue === "") {
      setProductsCopy(products);
    } else if (sortValue === "priceLowHigh") {
      setProductsCopy([...products].sort((a, b) => a.price - b.price));
    } else if (sortValue === "priceHighLow") {
      setProductsCopy([...products].sort((a, b) => b.price - a.price));
    }
  }, [sortValue, products]);

  //--------------------------searching---------------------------
  const options = {
    keys: ["title", "description"],
    threshold: 0.4,
  };
  const fuse = new Fuse(products, options);
  const [search, setSearch] = useState("");

  function handleSearch(e) {
    e.preventDefault();
    if (!search) {
      setProductsCopy(products);
    }
    const results = fuse.search(search);
    setProductsCopy(results.map((p) => p.item));
  }

  useEffect(() => {
    if (!search) {
      setProductsCopy(products);
    }
  }, [search]);

  return (
    <div className="p-6">
      {/* Toolbar */}
      <div
        className="w-full flex flex-col sm:flex-row sm:justify-between sm:items-center
             bg-gradient-to-r from-gray-900/80 via-black/70 to-gray-900/80
             backdrop-blur-md px-4 py-4 sm:px-6 rounded-2xl shadow-xl
             mb-5 gap-4 border border-gray-700"
      >
        {/* Search Bar (mobile: first row, desktop: right side) */}
        <form
          onSubmit={handleSearch}
          className="order-1 sm:order-2 flex items-center bg-gray-800/70 border border-gray-600 
                 rounded-full px-3 py-2 w-full sm:w-1/2"
        >
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-grow outline-none text-xs sm:text-sm bg-transparent text-white placeholder-gray-400"
          />
          <FiSearch
            onClick={handleSearch}
            className="text-lg sm:text-xl text-indigo-400 cursor-pointer ml-2"
          />
        </form>

        {/* Sort + Filter Controls (mobile: second row, desktop: left side) */}
        <div className="order-2 sm:order-1 flex flex-row gap-3 w-full sm:w-auto">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-1/2 sm:w-40 px-3 py-2 rounded-md bg-gray-900 font-bold text-white 
               border-2 border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 
               text-xs sm:text-sm"
          >
            <option value="">All Category</option>
            <option value="electronics">Electronics</option>
            <option value="furniture">Furniture</option>
            <option value="jewellery">Jewellery</option>
            <option value="fashion">Fashion</option>
            <option value="beauty">Beauty</option>
            <option value="sports">Sports</option>
            <option value="home">Home</option>
            <option value="toys">Toys</option>
          </select>

          <select
            value={sortValue}
            onChange={(e) => setSortValue(e.target.value)}
            className="w-1/2 sm:w-40 px-3 py-2 rounded-md bg-gray-900 font-bold text-white 
               border-2 border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 
               text-xs sm:text-sm"
          >
            <option value="">Sort Products</option>
            <option value="priceLowHigh">Price: Low → High</option>
            <option value="priceHighLow">Price: High → Low</option>
          </select>
        </div>
      </div>

      {/* Product Flex Grid */}
      <div className="flex flex-wrap justify-center gap-6">
        {productsCopy && productsCopy.length > 0 ? (
          productsCopy.map((p) => (
            <div
              key={p._id}
              className="relative bg-gradient-to-b from-slate-800 via-gray-900 to-gray-800 text-white rounded-xl shadow-xl overflow-hidden w-60 hover:scale-102 transition duration-300 hover:shadow-pink-500/40"
            >
              {/* Wishlist Icon */}
              <div className="absolute top-3 right-3 z-20 bg-black/40 rounded-full p-1">
                {wishlist?.items?.some(
                  (item) => item?.product?._id === p._id,
                ) ? (
                  <FaBookmark
                    className="text-yellow-400 hover:text-red-500 transition-transform hover:scale-110 cursor-pointer"
                    size={22}
                    onClick={() => handleRemoveWishlist(p._id)}
                  />
                ) : (
                  <CiBookmarkPlus
                    className="text-gray-300 hover:text-green-500 transition-transform hover:scale-110 cursor-pointer"
                    size={24}
                    onClick={() => handleAddWishlist(p._id)}
                  />
                )}
              </div>

              {/* Product Image */}
              <img
                src={p.image}
                alt={p.title}
                className="w-full h-56 object-cover cursor-pointer"
                onClick={() => handleClick(p)}
              />

              {/* Product Info */}
              <div className="p-4 flex flex-col gap-2">
                <h3 className="text-lg font-semibold truncate">{p.title}</h3>
                <div className="flex justify-between text-sm text-gray-300">
                  <span className="font-medium text-green-400">
                    ₹ {p.price.toLocaleString("en-IN")}
                  </span>
                  <span className="font-medium">Stock: {p.stock}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between px-4 pb-4">
                {p.stock <= 0 ? (
                  <button
                    type="button"
                    className="bg-gray-500 text-white text-sm w-full py-2 rounded-full shadow-md cursor-not-allowed"
                  >
                    Out of stock
                  </button>
                ) : (
                  <>
                    <button
                      type="button"
                      className="bg-green-500 hover:bg-green-600 text-white text-sm w-24 py-2 rounded-full shadow-md transition"
                      onClick={() => handleBuyNow(p)}
                    >
                      Buy Now
                    </button>
                    <button
                      type="button"
                      disabled={cart?.some(
                        (item) => item.product._id === p._id,
                      )}
                      className={`${
                        cart?.some((item) => item.product._id === p._id)
                          ? "bg-gray-500 text-white text-sm w-24 py-2 rounded-full shadow-md cursor-not-allowed"
                          : "bg-blue-500 hover:bg-blue-600 text-white text-sm w-24 py-2 rounded-full shadow-md transition"
                      }`}
                      onClick={() => handleCart(p._id)}
                    >
                      {cart?.some((item) => item.product._id === p._id)
                        ? "Added"
                        : "Add to Cart"}
                    </button>
                  </>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-400 py-10 bg-slate-800 rounded-md w-full">
            <p className="text-lg font-semibold text-red-400">
              No products found
            </p>
            <p className="text-sm">
              Try changing your search keywords or filters.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setProductsCopy(products);
              }}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-md shadow-md transition mt-4"
            >
              Explore Products
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
