import { useState } from "react";
import { useCutomer } from "../Context/CustomerContext";
import { useLogin } from "../Context/LoginContext";
import { FaDeleteLeft } from "react-icons/fa6";

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
    submitRating(rating, comment);
  };

  const handleDelete = (reviewId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this review?",
    );
    if (confirmed) {
      deleteReview(reviewId);
    }
  };

  function handleBuyNow(singleProduct) {
    manageBuyNow(singleProduct);
  }

  function handleCart(product) {
    addToCart(product);
  }

  return (
    <div className="flex justify-center min-h-screen py-6 sm:py-10 px-4">
      <div className="flex flex-col rounded-xl shadow-lg p-4 sm:p-6 w-full max-w-4xl text-white bg-gradient-to-b from-slate-700 via-gray-950 to-gray-900">
        {/* Product Info */}
        <div className="flex flex-col md:flex-row gap-6 border-b border-gray-700 pb-6">
          <img
            src={singleProduct.image}
            alt={singleProduct.title}
            className="w-full md:w-60 h-60 object-cover rounded-md border border-indigo-500 shadow-md"
          />

          <div className="flex flex-col justify-between w-full">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-indigo-400 mb-2">
                {singleProduct.title}
              </h1>
              <p className="text-gray-300 mb-4 text-sm sm:text-base">
                {singleProduct.description}
              </p>
              <p className="text-sm text-gray-400 mb-2">
                Category:{" "}
                <span className="font-medium">{singleProduct.category}</span>
              </p>
              <p className="mb-2">
                {singleProduct.stock > 0 ? (
                  <span className="bg-green-600 text-white px-2 py-1 rounded-md text-xs sm:text-sm">
                    In Stock
                  </span>
                ) : (
                  <span className="bg-red-600 text-white px-2 py-1 rounded-md text-xs sm:text-sm">
                    Out of Stock
                  </span>
                )}
              </p>
              <p className="text-xl sm:text-2xl font-bold text-yellow-400">
                ₹{singleProduct.price}
              </p>
            </div>

            {/* Action Buttons */}
            {singleProduct.stock <= 0 ? (
              <button
                type="button"
                className="mt-4 w-full cursor-pointer bg-gray-500 text-white text-sm py-2 rounded-full shadow-md cursor-not-allowed"
              >
                Out of stock
              </button>
            ) : (
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <button
                  type="button"
                  className="flex-1 py-2 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white font-semibold"
                  onClick={() => handleBuyNow(singleProduct)}
                >
                  Buy Now
                </button>
                {cart &&
                cart.some((item) => item.product._id === singleProduct._id) ? (
                  <button
                    type="button"
                    className="flex-1 py-2 rounded-md bg-gray-500 text-white font-semibold cursor-not-allowed"
                  >
                    Already in Cart
                  </button>
                ) : (
                  <button
                    type="button"
                    className="flex-1 py-2 rounded-md bg-blue-500 hover:bg-blue-600 text-white font-semibold"
                    onClick={() => handleCart(singleProduct._id)}
                  >
                    Add to Cart
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-6">
          <h2 className="text-lg sm:text-xl font-bold text-indigo-400 mb-4">
            Ratings & Reviews
          </h2>

          {/* Review Form */}
          {token && role === "customer" && (
            <div className="mb-6 bg-gray-800 p-4 rounded-md">
              <h3 className="text-base sm:text-lg font-semibold mb-2">
                Give a review
              </h3>

              {/* Rating Options */}
              <div className="flex gap-2 mb-4">
                {[1, 2, 3, 4, 5].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setRating(num)}
                    className={`px-3 py-1 rounded-md border border-gray-600 text-xs sm:text-sm
                      ${rating === num ? "bg-yellow-400 text-black" : "text-yellow-400 hover:bg-yellow-500 hover:text-black"}`}
                  >
                    {num}
                  </button>
                ))}
              </div>

              {/* Comment Input */}
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  placeholder="Write your review..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="flex-1 border border-gray-700 rounded-md px-3 py-2 text-sm bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  type="button"
                  className="px-6 sm:px-8 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                  onClick={submitReview}
                >
                  Submit
                </button>
              </div>
            </div>
          )}

          {/* Reviews List */}
          <div className="space-y-4">
            {singleProduct.reviews && singleProduct.reviews.length > 0 ? (
              singleProduct.reviews.map((p) => (
                <div
                  key={p._id}
                  className="border border-gray-700 rounded-md p-4 bg-gray-800 shadow-sm"
                >
                  {/* Top row: rating + date */}
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-yellow-400 text-sm sm:text-base">
                      ⭐ {p.rating}
                    </span>
                    <span className="text-xs text-gray-400">
                      {new Date(p.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  {/* Reviewer info */}
                  <div className="mb-2 text-sm text-gray-300">
                    <p className="font-medium">{p?.user?.name}</p>
                    <p className="text-gray-400">{p?.user?.email}</p>
                  </div>

                  {/* Comment + Delete */}
                  <div className="flex justify-between items-start">
                    <p className="text-gray-200 text-sm sm:text-base">
                      {p.comment}
                    </p>
                    {p?.user?._id === userId && (
                      <button
                        type="button"
                        className="text-red-500 hover:text-red-700 ml-2"
                        onClick={() => handleDelete(p._id)}
                      >
                        <FaDeleteLeft size={20} />
                      </button>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-400 text-sm">
                No reviews yet. Be the first!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
