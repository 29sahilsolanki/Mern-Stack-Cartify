import { useCutomer } from "../../../Context/CustomerContext";
import { MdOutlineExposurePlus1 } from "react-icons/md";
import { TbExposureMinus1 } from "react-icons/tb";
import { MdDeleteForever } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";

export default function Cart() {
  const {
    cart,
    fetchCartItems,
    removeFromCart,
    manageCartQuantity,
    setBuyProduct,
  } = useCutomer();
  const navigate = useNavigate();

  function handleCart(productId) {
    removeFromCart(productId);
  }

  function increaseQuantity(productId, change) {
    manageCartQuantity(productId, change);
  }

  function decreaseQuantity(productId, change) {
    manageCartQuantity(productId, change);
  }

  return (
    <div className="px-3 sm:px-8 py-4 sm:py-8">
      {/* Heading */}
      {cart?.length > 0 ? (
        <h1 className="flex items-center justify-center gap-3 text-2xl sm:text-4xl text-center mb-6 sm:mb-10 text-gray-300 font-bold">
          <FaShoppingCart className="text-pink-400 drop-shadow-md animate-pulse text-4xl sm:text-5xl" />
          <span>Your Cart</span>
          <FaShoppingCart className="text-pink-400 drop-shadow-md text-4xl sm:text-5xl animate-pulse" />
        </h1>
      ) : (
        <div className="flex flex-col items-center justify-center h-[60vh] gap-6">
          <FaShoppingCart className="text-6xl sm:text-7xl text-pink-400 drop-shadow-lg animate-pulse" />
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-300">
            Nothing in your cart
          </h1>
          <NavLink
            to="/customer-dashboard/shop"
            className="bg-blue-600 hover:bg-indigo-600 text-white px-6 py-3 rounded-full shadow-md transition"
          >
            Add Products
          </NavLink>
        </div>
      )}

      {/* Cart List */}
      {cart?.length > 0 && (
        <div className="flex flex-col gap-4 sm:gap-6">
          {cart.map((p) => (
            <div
              key={p.product._id}
              className="flex flex-col sm:flex-row bg-gradient-to-b from-slate-800 via-gray-900 to-gray-800 text-white rounded-xl shadow-lg hover:scale-[1.02] hover:shadow-pink-500/40 transition-transform duration-300"
            >
              {/* Product Image */}
              <div className="w-full sm:w-48 h-40 sm:h-50 rounded-t-xl sm:rounded-l-xl overflow-hidden">
                <img
                  src={p.product.image}
                  alt={p.product.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>

              {/* Product Info */}
              <div className="flex-1 p-4 sm:p-5 flex flex-col justify-between">
                <div>
                  <h2 className="text-md sm:text-lg font-bold truncate">
                    {p.product.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-400 line-clamp-2">
                    {p.product.description}
                  </p>
                  <div className="flex justify-between items-center mt-2 text-xs sm:text-sm text-gray-300">
                    <span className="text-green-400 font-semibold text-base sm:text-lg">
                      ₹ {p.product.price?.toLocaleString("en-IN")}
                    </span>
                    <span className="text-pink-300 text-xs">
                      In Stock: {p.product.stock}
                    </span>
                  </div>
                </div>

                {/* Bottom Controls */}
                <div className="flex flex-col sm:flex-row items-center justify-between mt-4 gap-3 sm:gap-0">
                  {/* Quantity Controls */}
                  <div className="flex items-center gap-3 sm:gap-4">
                    <button
                      type="button"
                      className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-md transition"
                      onClick={() => decreaseQuantity(p.product._id, -1)}
                    >
                      <TbExposureMinus1 size={18} />
                    </button>
                    <h2 className="text-base sm:text-lg font-extrabold text-yellow-300">
                      {p.quantity}
                    </h2>
                    <button
                      type="button"
                      className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-full shadow-md transition"
                      onClick={() => increaseQuantity(p.product._id, +1)}
                    >
                      <MdOutlineExposurePlus1 size={18} />
                    </button>
                  </div>

                  {/* Delete Button */}
                  <button
                    type="button"
                    className="bg-pink-600 hover:bg-pink-700 text-white p-2 rounded-full shadow-md transition"
                    onClick={() => handleCart(p.product._id)}
                  >
                    <MdDeleteForever size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Checkout Button */}
      {cart?.length > 0 && (
        <div className="flex justify-center mt-6 sm:mt-8">
          <button
            type="button"
            className="w-full max-w-xl px-6 py-3 bg-gradient-to-r from-red-500 to-pink-600 text-white font-bold rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
            onClick={() => {
              setBuyProduct("");
              navigate("/customer-dashboard/checkout");
            }}
          >
            🚀 Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
}
