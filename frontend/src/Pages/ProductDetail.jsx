import { useState } from "react";
import { useCutomer } from "../Context/CustomerContext";
import { useLogin } from "../Context/LoginContext";
import { FaTrashAlt, FaStar, FaShoppingBag, FaCartPlus } from "react-icons/fa";

export default function ProductDetail() {
  const {
    singleProduct,
    submitRating,
    deleteReview,
    cart,
    manageBuyNow,
    addToCart,
  } = useCutomer();
  const { token, role, userId } = useLogin();
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");

  const submitReview = () => {
    if (!rating) {
      alert("Please select a rating before submitting.");
      return;
    }
    submitRating(rating, comment);
    setComment("");
    setRating("");
  };

  const handleDelete = (reviewId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this review?",
    );
    if (confirmed) {
      deleteReview(reviewId);
    }
  };

  function handleBuyNow(product) {
    manageBuyNow(product);
  }

  function handleCart(productId) {
    addToCart(productId);
  }

  const isItemInCart = cart?.some(
    (item) => item.product._id === singleProduct._id,
  );

  return (
    <div className=" text-gray-900 min-h-screen py-12 px-4 sm:px-6 lg:px-8 ">
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-xl border border-gray-100 p-6 sm:p-10">
        {/* 1. PRODUCT TOP SECTION */}
        <div className="grid md:grid-cols-2 gap-10 pb-10 border-b border-gray-100">
          {/* Image Showcase */}
          <div className="w-full bg-gray-50 rounded-2xl overflow-hidden relative border border-gray-100 flex items-center justify-center p-4 min-h-87 sm:min-h-100">
            <img
              src={singleProduct.image}
              alt={singleProduct.title}
              className="max-h-95 w-auto object-contain hover:scale-105 transition-transform duration-300"
            />
            {singleProduct.stock <= 0 && (
              <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center">
                <span className="text-xs uppercase tracking-widest text-red-600 font-bold bg-red-50 border border-red-200 px-4 py-2 rounded-xl shadow-sm">
                  Out Of Stock
                </span>
              </div>
            )}
          </div>

          {/* Product Info & Action Buttons */}
          <div className="flex flex-col justify-between">
            <div className="space-y-4">
              <div>
                <span className="text-indigo-600 text-xs font-semibold uppercase tracking-wider block mb-1">
                  {singleProduct.category}
                </span>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
                  {singleProduct.title}
                </h1>
              </div>

              {/* Price & Stock Badge */}
              <div className="flex items-center gap-4 pt-1">
                <p className="text-3xl font-bold text-indigo-600">
                  ₹{singleProduct.price?.toLocaleString("en-IN")}
                </p>
                {singleProduct.stock > 0 ? (
                  <span className="text-xs font-medium text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                    Only {singleProduct.stock} left in stock
                  </span>
                ) : (
                  <span className="text-xs font-medium text-red-700 bg-red-50 px-3 py-1 rounded-full border border-red-200">
                    Currently Unavailable
                  </span>
                )}
              </div>

              <div className="border-t border-gray-100 my-4 pt-4">
                <h3 className="text-sm font-semibold text-gray-800 mb-2">
                  Description
                </h3>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                  {singleProduct.description}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-8">
              {singleProduct.stock <= 0 ? (
                <button
                  type="button"
                  disabled
                  className="w-full bg-gray-100 text-gray-400 text-sm font-bold uppercase tracking-wider py-4 rounded-xl cursor-not-allowed border border-gray-200 text-center"
                >
                  Product Out of Stock
                </button>
              ) : (
                <div className="flex flex-col sm:flex-row gap-4 w-full">
                  <button
                    type="button"
                    className="flex-1 bg-indigo-600 text-white hover:bg-indigo-700 text-sm font-bold uppercase tracking-wider py-4 rounded-xl transition-all active:scale-98 text-center shadow-lg shadow-indigo-600/10 flex items-center justify-center gap-2"
                    onClick={() => handleBuyNow(singleProduct)}
                  >
                    <FaShoppingBag /> Buy Now
                  </button>

                  <button
                    type="button"
                    disabled={isItemInCart}
                    className={`flex-1 text-sm font-bold uppercase tracking-wider py-4 rounded-xl transition-all border text-center flex items-center justify-center gap-2 ${
                      isItemInCart
                        ? "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed"
                        : "bg-white text-indigo-600 border-indigo-200 hover:border-indigo-600 hover:bg-indigo-50/30 active:scale-98"
                    }`}
                    onClick={() => handleCart(singleProduct._id)}
                  >
                    <FaCartPlus />{" "}
                    {isItemInCart ? "Added To Cart" : "Add To Cart"}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 2. REVIEWS SECTION */}
        <div className="mt-10">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
              Customer Reviews
            </h2>
          </div>

          {/* Review Input Form */}
          {token && role === "customer" && (
            <div className="mb-10 bg-indigo-50/40 border border-indigo-100 rounded-2xl p-5 sm:p-6 shadow-sm">
              <h3 className="text-sm font-bold text-gray-800 mb-3">
                Share your experience
              </h3>

              {/* Star Selection Row */}
              <div className="flex flex-wrap gap-2 mb-4">
                {[1, 2, 3, 4, 5].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setRating(num)}
                    className={`px-4 py-2 rounded-xl border text-sm font-semibold transition-all duration-200 flex items-center gap-1 ${
                      rating === num
                        ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-600/10"
                        : "bg-white text-gray-600 border-gray-200 hover:border-indigo-300 hover:text-indigo-600"
                    }`}
                  >
                    <FaStar
                      className={
                        rating === num ? "text-white" : "text-amber-400"
                      }
                    />{" "}
                    {num}
                  </button>
                ))}
              </div>

              {/* Comment Inputs */}
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  placeholder="Write a review about this product..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="flex-1 bg-white border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all"
                />
                <button
                  type="button"
                  className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm uppercase tracking-wider rounded-xl transition-all shadow-md active:scale-95"
                  onClick={submitReview}
                >
                  Submit Review
                </button>
              </div>
            </div>
          )}

          {/* Reviews Output List */}
          <div className="space-y-4">
            {singleProduct.reviews && singleProduct.reviews.length > 0 ? (
              singleProduct.reviews.map((p) => (
                <div
                  key={p._id}
                  className="border border-gray-100 rounded-2xl p-5 bg-white shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col gap-3"
                >
                  {/* Top metadata info */}
                  <div className="flex justify-between items-start border-b border-gray-50 pb-3">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1 text-xs font-bold text-white bg-indigo-600 px-2.5 py-1 rounded-lg">
                        <FaStar className="text-[10px]" /> {p.rating}.0
                      </span>
                      <div>
                        <p className="text-sm font-bold text-gray-900 tracking-wide">
                          {p?.user?.name}
                        </p>
                        <p className="text-xs text-gray-400">
                          {p?.user?.email}
                        </p>
                      </div>
                    </div>

                    <span className="text-xs text-gray-400">
                      {new Date(p.createdAt).toLocaleDateString("en-IN", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>

                  {/* Comment Context */}
                  <div className="flex justify-between items-start gap-4">
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {p.comment}
                    </p>
                    {p?.user?._id === userId && (
                      <button
                        type="button"
                        className="text-gray-400 hover:text-red-500 p-2 hover:bg-red-50 border border-transparent hover:border-red-100 rounded-xl transition-all shrink-0"
                        onClick={() => handleDelete(p._id)}
                        title="Delete this review"
                      >
                        <FaTrashAlt size={14} />
                      </button>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 bg-gray-50 border border-dashed border-gray-200 rounded-2xl">
                <p className="text-gray-400 text-sm">
                  No reviews yet. Be the first to share your thoughts!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
