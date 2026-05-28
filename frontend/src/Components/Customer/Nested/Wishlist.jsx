import { useEffect } from "react";
import { useCutomer } from "../../../Context/CustomerContext";
import { MdDeleteForever } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import { NavLink } from "react-router-dom";

export default function Wishlist() {
  const {
    wishlist,
    fetchWishlist,
    removeFromWishlist,
    addToCart,
    cart,
    manageBuyNow,
  } = useCutomer();

  useEffect(() => {
    fetchWishlist();
  }, []);

  function handleWishlist(productId) {
    removeFromWishlist(productId);
  }

  function handleBuyNow(singleProduct) {
    manageBuyNow(singleProduct);
  }

  function handleCart(product) {
    addToCart(product);
  }

  return (
    <div className="px-3 sm:px-8 py-4 sm:py-8">
      {/* Heading */}
      {wishlist?.items?.length > 0 ? (
        <h1 className="flex items-center justify-center gap-3 text-2xl sm:text-4xl font-bold text-center mb-6 sm:mb-8 text-gray-300">
          <FaRegHeart className="text-pink-400 drop-shadow-md animate-pulse text-4xl sm:text-5xl" />
          <span>Your Wishlist</span>
          <FaRegHeart className="text-pink-400 drop-shadow-md text-4xl sm:text-5xl" />
        </h1>
      ) : (
        <div className="flex flex-col items-center justify-center h-[60vh] gap-6">
          <FaRegHeart className="text-6xl sm:text-7xl text-pink-400 drop-shadow-lg animate-pulse" />
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-300">
            Nothing in your wishlist
          </h1>
          <NavLink
            to="/customer-dashboard/shop"
            className="bg-blue-600 hover:bg-indigo-600 text-white px-6 py-3 rounded-full shadow-md transition"
          >
            Add Products
          </NavLink>
        </div>
      )}

      {/* Wishlist List */}
      {wishlist?.items?.length > 0 && (
        <div className="flex flex-col gap-4 sm:gap-6">
          {wishlist.items.map((p) => (
            <div
              key={p._id}
              className="flex flex-col sm:flex-row bg-gradient-to-b from-slate-800 via-gray-900 to-gray-800 text-white rounded-xl shadow-lg hover:scale-[1.02] hover:shadow-pink-500/40 transition-transform duration-300"
            >
              {/* Product Image */}
              <div className="w-full sm:w-48 h-40 sm:h-50 rounded-t-xl sm:rounded-l-xl overflow-hidden">
                <img
                  src={p?.product?.image}
                  alt={p?.product?.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>

              {/* Product Info */}
              <div className="flex-1 p-4 sm:p-5 flex flex-col justify-between">
                <div>
                  <h2 className="text-md sm:text-lg font-bold truncate">
                    {p?.product?.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-400 line-clamp-2">
                    {p?.product?.description}
                  </p>
                  <div className="flex justify-between items-center mt-2 text-xs sm:text-sm text-gray-300">
                    <span className="text-green-400 font-semibold text-base sm:text-lg">
                      ₹ {p?.product?.price?.toLocaleString("en-IN")}
                    </span>
                    <span className="text-pink-300 text-xs">
                      Stock: {p?.product?.stock}
                    </span>
                  </div>
                </div>

                {/* Bottom Controls */}
                <div className="flex flex-col sm:flex-row items-center justify-between mt-4 gap-3 sm:gap-0">
                  {p?.product?.stock <= 0 ? (
                    <button
                      type="button"
                      className="w-full sm:w-1/2 bg-gray-500 text-white text-sm py-2 rounded-full shadow-md cursor-not-allowed"
                    >
                      Out of stock
                    </button>
                  ) : (
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
                      <button
                        type="button"
                        className="w-full sm:w-30 bg-green-500 hover:bg-green-600 text-white text-sm py-2 rounded-full shadow-md transition"
                        onClick={() => handleBuyNow(p?.product)}
                      >
                        Buy Now
                      </button>
                      {cart &&
                      cart.some(
                        (item) => item.product._id === p?.product?._id,
                      ) ? (
                        <button
                          type="button"
                          className="w-full sm:w-30 bg-gray-500 text-white text-sm py-2 rounded-full cursor-not-allowed"
                        >
                          Already in Cart
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleCart(p?.product?._id)}
                          className="w-full sm:w-30 bg-blue-500 hover:bg-blue-600 text-white text-sm py-2 rounded-full shadow-md transition"
                        >
                          Add to Cart
                        </button>
                      )}
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => handleWishlist(p?.product?._id)}
                    className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-full shadow-md transition"
                  >
                    <MdDeleteForever size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
