import { useCutomer } from "../../../Context/CustomerContext";
import { MdOutlineExposurePlus1 } from "react-icons/md";
import { TbExposureMinus1 } from "react-icons/tb";
import { MdDeleteForever } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { FiPlus, FiMinus, FiTrash2, FiShoppingBag } from "react-icons/fi";

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
    <div className=" text-gray-900 min-h-screen p-2 sm:p-6 font-sans antialiased mt-5 md:mt-10">
      <div className="max-w-4xl mx-auto">
        {/* Heading Panel */}
        {cart?.length > 0 ? (
          <div className="w-full bg-slate-50 border border-gray-200/60 px-6 py-5 rounded-2xl mb-8 shadow-sm flex items-center gap-3">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl text-xl">
              <FaShoppingCart />
            </div>
            <div>
              <h1 className="text-xl font-extrabold tracking-tight text-gray-900">
                Your Shopping Cart
              </h1>
              <p className="text-xs text-gray-400">
                Review and manage your selected items
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-[65vh] text-center px-4">
            <div className="p-5 bg-indigo-50 text-indigo-600 rounded-full text-5xl mb-6 shadow-sm">
              <FaShoppingCart />
            </div>
            <h1 className="text-2xl font-black text-gray-900 tracking-tight">
              Your cart is empty
            </h1>
            <p className="text-gray-400 text-sm max-w-sm mt-2 leading-relaxed">
              Looks like you haven't added anything to your container yet.
              Explore our curated collections to get started.
            </p>
            <NavLink
              to="/customer-dashboard/shop"
              className="mt-6 inline-flex items-center bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold uppercase tracking-wider px-6 py-3.5 rounded-xl shadow-md shadow-indigo-600/10 transition-all active:scale-95"
            >
              Explore Marketplace
            </NavLink>
          </div>
        )}

        {/* Cart List Layout */}
        {cart?.length > 0 && (
          <div className="flex flex-col gap-5">
            {cart.map((p) => (
              <div
                key={p.product._id}
                className="group relative bg-white rounded-2xl border border-slate-200/60 p-4 sm:p-5 flex flex-col sm:flex-row gap-5 transition-all duration-300 hover:bg-slate-50/60 hover:border-indigo-200 hover:shadow-xl"
              >
                {/* Product Image Wrapper */}
                <div className="w-full sm:w-40 h-40 bg-white border border-gray-100 rounded-xl overflow-hidden flex items-center justify-center p-3 shrink-0">
                  <img
                    src={p.product.image}
                    alt={p.product.title}
                    className="max-h-full max-w-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Product Info Description Node */}
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div>
                    <div className="flex justify-between items-start gap-4">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 block mb-0.5">
                        {p.product.category || "Premium Catalog"}
                      </span>
                    </div>
                    <h2 className="text-base font-bold text-gray-900 tracking-tight line-clamp-1">
                      {p.product.title}
                    </h2>
                    <p className="text-xs text-gray-400 line-clamp-2 mt-1 font-light leading-relaxed">
                      {p.product.description}
                    </p>
                  </div>

                  {/* Operational Interface Metrics */}
                  <div className="flex flex-wrap items-center justify-between mt-4 pt-4 border-t border-slate-200/40 gap-4">
                    {/* Price and Stock Tags */}
                    <div className="flex items-center gap-4">
                      <span className="text-lg font-extrabold text-gray-900">
                        ₹
                        {(p.product.price * p.quantity).toLocaleString("en-IN")}
                      </span>
                      <span
                        className={`text-[11px] font-medium px-2 py-0.5 rounded-md ${
                          p.product.stock > 5
                            ? "text-gray-400 bg-white border border-gray-100"
                            : "text-amber-700 bg-amber-50"
                        }`}
                      >
                        Stock: {p.product.stock}
                      </span>
                    </div>

                    {/* Quantity Controls and Trash Buttons */}
                    <div className="flex items-center gap-4">
                      <div className="flex items-center bg-white border border-gray-200/80 rounded-xl p-1 shadow-xs">
                        <button
                          type="button"
                          className="text-gray-500 hover:text-indigo-600 hover:bg-slate-50 p-2 rounded-lg transition-colors flex items-center justify-center"
                          onClick={() => decreaseQuantity(p.product._id, -1)}
                        >
                          <FiMinus size={14} />
                        </button>

                        <h2 className="text-sm font-bold text-gray-900 w-10 text-center">
                          {p.quantity}
                        </h2>

                        <button
                          type="button"
                          className="text-gray-500 hover:text-indigo-600 hover:bg-slate-50 p-2 rounded-lg transition-colors flex items-center justify-center"
                          onClick={() => increaseQuantity(p.product._id, +1)}
                        >
                          <FiPlus size={14} />
                        </button>
                      </div>

                      {/* Explicit Remove Button */}
                      <button
                        type="button"
                        className="text-gray-400 hover:text-red-500 border border-transparent hover:border-red-100 p-2.5 hover:bg-red-50/50 rounded-xl transition-all"
                        onClick={() => handleCart(p.product._id)}
                        title="Remove product container"
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

        {/* Action Checkout Trigger Panel */}
        {cart?.length > 0 && (
          <div className="mt-8 border-t border-gray-100 pt-6 flex justify-end">
            <button
              type="button"
              className="w-full sm:w-72 px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm uppercase tracking-wider rounded-xl shadow-lg shadow-indigo-600/10 transition-all active:scale-98 flex items-center justify-center gap-2"
              onClick={() => {
                setBuyProduct("");
                navigate("/customer-dashboard/checkout");
              }}
            >
              <FiShoppingBag /> Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
