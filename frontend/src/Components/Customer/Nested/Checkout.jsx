import { useState } from "react";
import { useCutomer } from "../../../Context/CustomerContext";
import { toast } from "react-toastify";
import CheckoutAddress from "./CheckoutAddress";
import { useEffect } from "react";
import {
  FiCheckCircle,
  FiCreditCard,
  FiMapPin,
  FiShoppingBag,
} from "react-icons/fi";

export default function Checkout() {
  const {
    cart,
    buyProduct,
    customer,
    address,
    setAddress,
    placeOrder,
    placeOrderOnline,
  } = useCutomer();
  const [paymentMethod, setPaymentMethod] = useState(null);

  useEffect(() => {
    setAddress({
      address: "",
      state: "",
      pincode: "",
    });
    setPaymentMethod(null);
  }, []);

  const subtotal = buyProduct
    ? buyProduct.price
    : cart.reduce((sum, p) => sum + p.quantity * p.product.price, 0);

  const shipping = 500;
  const discount = 2000;
  const total = subtotal + shipping - discount;

  const [loading, setLoading] = useState(false);

  async function handlePlaceOrder() {
    if (!address || !address.address || !address.state || !address.pincode) {
      return toast.info(
        "You must provide full address before placing order..!!",
      );
    }
    if (!paymentMethod) {
      return toast.info(
        "You must select payment method before placing order..!!",
      );
    }

    try {
      setLoading(true);
      if (paymentMethod === "COD") {
        if (buyProduct) {
          await placeOrder(buyProduct, []);
        } else {
          await placeOrder(null, cart);
        }
      } else if (paymentMethod === "ONLINE") {
        if (buyProduct) {
          await placeOrderOnline(buyProduct, []);
        } else {
          await placeOrderOnline(null, cart);
        }
      }
    } catch (error) {
      console.error("Order error:", error);
      toast.error("Failed to process order. Please try again.");
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="min-h-screen  text-gray-900 p-4 sm:p-8 font-sans antialiased">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Heading Header */}
        <div className="w-full bg-white border border-gray-200/60 px-6 py-5 rounded-2xl shadow-sm">
          <h1 className="text-xl font-extrabold tracking-tight text-gray-900">
            Secure Checkout
          </h1>
          <p className="text-xs text-gray-400 mt-0.5">
            Complete your premium order acquisition parameters
          </p>
        </div>

        {/* 1. Order Items Section */}
        <div className="bg-white border border-slate-200/60 p-5 sm:p-6 rounded-2xl shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-gray-200/60">
            <FiShoppingBag className="text-indigo-600 text-lg" />
            <h2 className="text-base font-bold text-gray-900 tracking-tight">
              Your Order
            </h2>
          </div>

          <div className="space-y-3">
            {buyProduct ? (
              <div className="flex items-center justify-between bg-slate-50/60 border border-gray-100 p-3 rounded-xl shadow-xs">
                <div className="w-14 h-14 bg-white border border-gray-50 rounded-lg p-1 overflow-hidden flex items-center justify-center shrink-0 mr-4">
                  <img
                    src={buyProduct.image}
                    alt={buyProduct.title}
                    className="max-h-full max-w-full object-contain mix-blend-multiply"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="block font-bold text-gray-900 text-sm truncate">
                    {buyProduct.title}
                  </span>
                  <span className="block text-xs text-gray-400 mt-0.5">
                    Quantity: {buyProduct.quantity}
                  </span>
                </div>
                <span className="font-extrabold text-gray-900 text-sm ml-4 whitespace-nowrap">
                  ₹{buyProduct.price.toLocaleString("en-IN")}
                </span>
              </div>
            ) : (
              cart.map((p) => (
                <div
                  key={p.product._id}
                  className="flex items-center justify-between bg-slate-100 border border-gray-100 p-3 rounded-xl shadow-xs"
                >
                  <div className="w-14 h-14 bg-white border border-gray-50 rounded-lg p-1 overflow-hidden flex items-center justify-center shrink-0 mr-4">
                    <img
                      src={p.product.image}
                      alt={p.product.title}
                      className="max-h-full max-w-full object-contain mix-blend-multiply"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="block font-bold text-gray-900 text-sm truncate">
                      {p.product.title}
                    </span>
                    <span className="block text-xs text-gray-400 mt-0.5">
                      Quantity: {p.quantity}
                    </span>
                  </div>
                  <span className="font-extrabold text-gray-900 text-sm ml-4 whitespace-nowrap">
                    ₹{(p.quantity * p.product.price).toLocaleString("en-IN")}
                  </span>
                </div>
              ))
            )}
          </div>

          {/* Pricing Summary */}
          <div className="space-y-2.5 border-t border-gray-200/60 pt-4 text-sm font-medium text-gray-600">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="text-gray-900 font-semibold">
                ₹{subtotal.toLocaleString("en-IN")}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Shipping Fees</span>
              <span className="text-gray-900 font-semibold">₹{shipping}</span>
            </div>
            <div className="flex justify-between text-emerald-600">
              <span>Discount</span>
              <span className="font-semibold">- ₹{discount}</span>
            </div>
            <div className="flex justify-between font-black text-base text-indigo-600 border-t border-dashed border-gray-200 pt-3 mt-1">
              <span>Total Payable</span>
              <span className="text-lg">₹{total.toLocaleString("en-IN")}</span>
            </div>
          </div>
        </div>

        {/* 2. Address Section */}
        <div className="bg-slate-50/60 border border-slate-200/60 p-5 sm:p-6 rounded-2xl shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-gray-200/60">
            <FiMapPin className="text-indigo-600 text-lg" />
            <h2 className="text-base font-bold text-gray-900 tracking-tight">
              Delivery Destination
            </h2>
          </div>
          <div className="bg-white border border-gray-100 p-2 sm:p-4 rounded-xl shadow-xs">
            <CheckoutAddress />
          </div>
        </div>

        {/* 3. Payment Method Section */}
        <div className="bg-slate-50/60 border border-slate-200/60 p-5 sm:p-6 rounded-2xl shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-gray-200/60">
            <FiCreditCard className="text-indigo-600 text-lg" />
            <h2 className="text-base font-bold text-gray-900 tracking-tight">
              Payment Method
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <label
              className={`flex items-center gap-3 border p-4 rounded-xl cursor-pointer transition-all ${
                paymentMethod === "COD"
                  ? "bg-indigo-50/40 border-indigo-500 text-indigo-600 font-bold"
                  : "bg-white border-gray-100 text-gray-600 hover:bg-gray-100/50"
              }`}
            >
              <input
                type="radio"
                value="COD"
                checked={paymentMethod === "COD"}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500/20"
              />
              <span className="text-sm">Cash on Delivery (COD)</span>
            </label>

            <label
              className={`flex items-center gap-3 border p-4 rounded-xl cursor-pointer transition-all ${
                paymentMethod === "ONLINE"
                  ? "bg-indigo-50/40 border-indigo-500 text-indigo-600 font-bold"
                  : "bg-white border-gray-100 text-gray-600 hover:bg-gray-100/50"
              }`}
            >
              <input
                type="radio"
                value="ONLINE"
                checked={paymentMethod === "ONLINE"}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500/20"
              />
              <span className="text-sm">Pay Securely Online</span>
            </label>
          </div>
        </div>

        {/* 4. Place Order Form Trigger */}
        <div className="flex justify-center pt-2">
          <button
            type="button"
            className="w-full sm:w-72 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm uppercase tracking-wider py-4 rounded-xl shadow-lg shadow-indigo-600/10 transition-all active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
            onClick={handlePlaceOrder}
          >
            <FiCheckCircle />{" "}
            {`${loading ? "Placing your order..." : "Confirm & Place Order"}`}
          </button>
        </div>
      </div>
    </div>
  );
}
