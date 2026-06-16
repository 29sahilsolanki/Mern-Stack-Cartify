import { useEffect } from "react";
import { useCutomer } from "../../../Context/CustomerContext";
import { MdDeleteForever } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import {
  FiHeart,
  FiShoppingBag,
  FiShoppingCart,
  FiTrash2,
} from "react-icons/fi";

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
    <div className=" text-gray-900 min-h-screen p-2 sm:p-6 mt-10 font-sans antialiased">
      <div className="max-w-4xl mx-auto">
        {/* Heading Panel */}
        {wishlist?.items?.length > 0 ? (
          <div className="w-full bg-slate-50 border border-gray-200/60 px-6 py-5 rounded-2xl mb-8 shadow-sm flex items-center gap-3">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl text-xl">
              <FaRegHeart />
            </div>
            <div>
              <h1 className="text-xl font-extrabold tracking-tight text-gray-900">
                Your Wishlist
              </h1>
              <p className="text-xs text-gray-400">
                Your curated favorite items repository
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-[65vh] text-center px-4">
            <div className="p-5 bg-indigo-50 text-indigo-600 rounded-full text-5xl mb-6 shadow-sm">
              <FaRegHeart />
            </div>
            <h1 className="text-2xl font-black text-gray-900 tracking-tight">
              Your wishlist is empty
            </h1>
            <p className="text-gray-400 text-sm max-w-sm mt-2 leading-relaxed">
              You haven't saved any items yet. Browse our collections to add
              architectural premium products to your favorites list.
            </p>
            <NavLink
              to="/customer-dashboard/shop"
              className="mt-6 inline-flex items-center bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold uppercase tracking-wider px-6 py-3.5 rounded-xl shadow-md shadow-indigo-600/10 transition-all active:scale-95"
            >
              Add Products
            </NavLink>
          </div>
        )}

        {/* Wishlist List Layout */}
        {wishlist?.items?.length > 0 && (
          <div className="flex flex-col gap-5">
            {wishlist.items.map((p) => (
              <div
                key={p._id}
                className="group relative bg-white rounded-2xl border border-slate-200/60 p-4 sm:p-5 flex flex-col sm:flex-row gap-5 transition-all duration-300 hover:bg-white hover:border-indigo-200 hover:shadow-xl"
              >
                {/* Product Image Wrapper */}
                <div className="w-full sm:w-40 h-40 bg-white border border-gray-100 rounded-xl overflow-hidden flex items-center justify-center p-3 shrink-0">
                  <img
                    src={p?.product?.image}
                    alt={p?.product?.title}
                    className="max-h-full max-w-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Product Info Node */}
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 block mb-0.5">
                      {p?.product?.category || "Premium Catalog"}
                    </span>
                    <h2 className="text-base font-bold text-gray-900 tracking-tight line-clamp-1">
                      {p?.product?.title}
                    </h2>
                    <p className="text-xs text-gray-400 line-clamp-2 mt-1 font-light leading-relaxed">
                      {p?.product?.description}
                    </p>
                  </div>

                  {/* Operational Controls Panel */}
                  <div className="flex flex-wrap items-center justify-between mt-4 pt-4 border-t border-slate-200/40 gap-4">
                    {/* Price and Stock Tags */}
                    <div className="flex items-center gap-4">
                      <span className="text-lg font-extrabold text-gray-900">
                        ₹{p?.product?.price?.toLocaleString("en-IN")}
                      </span>
                      <span
                        className={`text-[11px] font-medium px-2 py-0.5 rounded-md ${
                          p?.product?.stock > 5
                            ? "text-gray-400 bg-white border border-gray-100"
                            : "text-amber-700 bg-amber-50"
                        }`}
                      >
                        Stock: {p?.product?.stock}
                      </span>
                    </div>

                    {/* Operational Trigger Buttons */}
                    <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                      {p?.product?.stock <= 0 ? (
                        <button
                          type="button"
                          disabled
                          className="w-32 bg-slate-100 text-slate-400 text-xs font-bold uppercase tracking-wider py-2.5 rounded-xl cursor-not-allowed border border-slate-200 text-center"
                        >
                          Out of stock
                        </button>
                      ) : (
                        <div className="flex gap-2">
                          <button
                            type="button"
                            className="w-24 sm:w-28 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold uppercase tracking-wider py-2.5 rounded-xl shadow-xs shadow-indigo-600/5 transition-all active:scale-95 text-center flex items-center justify-center gap-1"
                            onClick={() => handleBuyNow(p?.product)}
                          >
                            <FiShoppingBag size={13} /> Buy
                          </button>

                          {cart &&
                          cart.some(
                            (item) => item.product._id === p?.product?._id,
                          ) ? (
                            <button
                              type="button"
                              disabled
                              className="w-24 sm:w-28 bg-slate-100 border border-slate-200 text-slate-400 text-xs font-bold uppercase tracking-wider py-2.5 rounded-xl text-center"
                            >
                              In Cart
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() => handleCart(p?.product?._id)}
                              className="w-24 sm:w-28 bg-white text-indigo-600 border border-indigo-200 hover:border-indigo-600 hover:bg-indigo-50/50 text-xs font-bold uppercase tracking-wider py-2.5 rounded-xl transition-all active:scale-95 text-center flex items-center justify-center gap-1"
                            >
                              <FiShoppingCart size={13} /> +Cart
                            </button>
                          )}
                        </div>
                      )}

                      {/* Explicit Remove From Wishlist Button */}
                      <button
                        type="button"
                        onClick={() => handleWishlist(p?.product?._id)}
                        className="text-gray-400 hover:text-red-500 border border-transparent hover:border-red-100 p-2 rounded-xl transition-all"
                        title="Remove from wishlist"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
