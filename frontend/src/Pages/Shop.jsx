import { useCutomer } from "../Context/CustomerContext";
import { useEffect, useState } from "react";
import { FiHeart, FiShoppingBag, FiShoppingCart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";

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
    search,
    setSearch,
    productsCopy,
    setProductsCopy,
  } = useCutomer();

  useEffect(() => {
    fetchProducts();
  }, []);

  const [category, setCategory] = useState("");
  const [sortValue, setSortValue] = useState("");

  // Filter and Sort Logic combined
  useEffect(() => {
    let result = [...products];

    // Category Filter
    if (category !== "") {
      result = result.filter(
        (p) => p.category?.toLowerCase() === category.toLowerCase(),
      );
    }

    // Navbar Search Synchronizer
    if (search.trim() !== "") {
      const query = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.title?.toLowerCase().includes(query) ||
          p.description?.toLowerCase().includes(query),
      );
    }

    // Price Sorting
    if (sortValue === "priceLowHigh") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortValue === "priceHighLow") {
      result.sort((a, b) => b.price - a.price);
    }

    setProductsCopy(result);
  }, [category, sortValue, products, search]);

  return (
    <div className=" text-gray-900 min-h-screen p-4 sm:p-8 font-sans antialiased pt-10 mb-20">
      <div className="max-w-7xl mx-auto">
        {/* 1. CONTROLS TOOLBAR (Clean, Elegant & Integrated Layout) */}
        <div className="w-full flex flex-col sm:flex-row sm:justify-between sm:items-center bg-white px-6 py-4 rounded-2xl border border-gray-200/80 mb-10 gap-4 shadow-sm">
          <div>
            <h1 className="text-lg font-bold text-gray-900 tracking-tight">
              The Marketplace
            </h1>
            <p className="text-xs text-gray-400">
              Showing {productsCopy?.length || 0} premium items
            </p>
          </div>

          {/* Filter Dropdowns */}
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-1/2 sm:w-44 px-4 py-2.5 rounded-xl bg-slate-50 text-xs sm:text-sm font-medium text-gray-700 border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all cursor-pointer"
            >
              <option value="">All Categories</option>
              <option value="electronics">Electronics</option>
              <option value="furniture">Furniture</option>
              <option value="jewellery">Jewellery</option>
              <option value="fashion">Fashion</option>
            </select>

            <select
              value={sortValue}
              onChange={(e) => setSortValue(e.target.value)}
              className="w-1/2 sm:w-44 px-4 py-2.5 rounded-xl bg-slate-50 text-xs sm:text-sm font-medium text-gray-700 border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all cursor-pointer"
            >
              <option value="">Sort Products</option>
              <option value="priceLowHigh">Price: Low → High</option>
              <option value="priceHighLow">Price: High → Low</option>
            </select>
          </div>
        </div>

        {/* 2. PRODUCT CARDS GRID (Luxury Minimalist Cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {productsCopy && productsCopy.length > 0 ? (
            productsCopy.map((p) => {
              const isItemInCart = cart?.some(
                (item) => item.product._id === p._id,
              );
              const isItemInWishlist = wishlist?.items?.some(
                (item) => item?.product?._id === p._id,
              );

              return (
                <div
                  key={p._id}
                  className="group relative bg-white rounded-2xl border border-gray-200/60 overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:border-indigo-200"
                >
                  {/* Wishlist Button (Minimal Glass Circle) */}
                  <div className="absolute top-3 right-3 z-20 bg-white/90 backdrop-blur-md border border-gray-100 rounded-full p-2 shadow-sm hover:scale-105 transition-transform">
                    {isItemInWishlist ? (
                      <FaHeart
                        className="text-red-500 cursor-pointer active:scale-90 transition-transform"
                        size={15}
                        onClick={() => removeFromWishlist(p._id)}
                      />
                    ) : (
                      <FiHeart
                        className="text-gray-400 hover:text-red-500 cursor-pointer active:scale-90 transition-transform"
                        size={15}
                        onClick={() => addToWishlist(p._id)}
                      />
                    )}
                  </div>

                  {/* Product Image Container (Seamless Light Blend) */}
                  <div className="w-full h-64 bg-white relative overflow-hidden flex items-center justify-center p-4 group-hover:scale-102 transition-transform duration-300">
                    <img
                      src={p.image}
                      alt={p.title}
                      loading="lazy"
                      className="max-h-full max-w-full object-contain mix-blend-multiply transition-transform duration-500"
                      onClick={() => singleProductDetail(p)}
                    />
                    {p.stock <= 0 && (
                      <div className="absolute inset-0 bg-white/80 backdrop-blur-xs flex items-center justify-center">
                        <span className="text-[10px] uppercase tracking-widest text-red-600 font-bold bg-red-50 border border-red-200 px-3 py-1.5 rounded-lg shadow-sm">
                          Out Of Stock
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Product Info Panel (Saaf Elegant Typography) */}
                  <div className="p-4 grow flex flex-col justify-between bg-white border-t border-gray-100">
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 block">
                        {p.category || "General"}
                      </span>
                      <h3
                        onClick={() => singleProductDetail(p)}
                        className="text-sm font-semibold text-gray-800 tracking-tight line-clamp-2 cursor-pointer hover:text-indigo-600 transition-colors"
                      >
                        {p.title}
                      </h3>
                    </div>

                    <div className="flex justify-between items-center pt-3 mt-2">
                      <span className="text-base font-bold text-gray-900">
                        ₹{p.price.toLocaleString("en-IN")}
                      </span>
                      <span
                        className={`text-[11px] font-medium px-2 py-0.5 rounded-md ${
                          p.stock > 5
                            ? "text-gray-400 bg-gray-50"
                            : "text-amber-700 bg-amber-50"
                        }`}
                      >
                        {p.stock > 0 ? `${p.stock} left` : "Sold Out"}
                      </span>
                    </div>
                  </div>

                  {/* Operational Action Panel (Sleek Buttons) */}
                  <div className="px-4 pb-4 bg-white flex gap-2">
                    {p.stock <= 0 ? (
                      <button
                        type="button"
                        disabled
                        className="w-full bg-gray-100 text-gray-400 text-xs font-bold uppercase tracking-wider py-3 rounded-xl cursor-not-allowed border border-gray-200 text-center"
                      >
                        Unavailable
                      </button>
                    ) : (
                      <>
                        <button
                          type="button"
                          className="w-1/2 bg-indigo-600 text-white hover:bg-indigo-700 text-xs font-bold uppercase tracking-wider py-3 rounded-xl transition-all active:scale-95 text-center shadow-sm shadow-indigo-600/10 flex items-center justify-center gap-1.5"
                          onClick={() => manageBuyNow(p)}
                        >
                          <FiShoppingBag /> Buy
                        </button>

                        <button
                          type="button"
                          disabled={isItemInCart}
                          className={`w-1/2 text-xs font-bold uppercase tracking-wider py-3 rounded-xl transition-all border text-center flex items-center justify-center gap-1.5 ${
                            isItemInCart
                              ? "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed"
                              : "bg-white text-indigo-600 border-indigo-200 hover:border-indigo-600 hover:bg-indigo-50 active:scale-95"
                          }`}
                          onClick={() => addToCart(p._id)}
                        >
                          <FiShoppingCart /> {isItemInCart ? "Added" : "Cart"}
                        </button>
                      </>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            /* 3. ZERO RESULTS FALLBACK BLOCK */
            <div className="text-center py-20 px-4 bg-white border border-gray-200 rounded-2xl w-full col-span-full flex flex-col items-center justify-center shadow-sm">
              <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 block mb-2">
                No Products Found
              </span>
              <h3 className="text-xl font-bold text-gray-900 tracking-tight">
                No Parameters Matched Your Request
              </h3>
              <p className="text-sm text-gray-400 max-w-sm mt-2 leading-relaxed">
                We couldn't find anything matching your filters or search terms.
                Try resetting filters.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setCategory("");
                  setSortValue("");
                  setProductsCopy(products);
                }}
                className="cursor-pointer bg-indigo-600 text-white font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-xl shadow-md hover:bg-indigo-700 transition-colors mt-6"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
