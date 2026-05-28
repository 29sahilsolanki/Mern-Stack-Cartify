import { useState } from "react";
import { useCutomer } from "../../../Context/CustomerContext";
import { toast } from "react-toastify";
import CheckoutAddress from "./CheckoutAddress";
import { useEffect } from "react";

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

  function handlePlaceOrder() {
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

    if (paymentMethod === "COD") {
      if (buyProduct) {
        placeOrder(buyProduct, []);
      } else {
        placeOrder(null, cart);
      }
    } else if (paymentMethod === "ONLINE") {
      if (buyProduct) {
        console.log(buyProduct);
        placeOrderOnline(buyProduct, []);
      } else {
        console.log(cart);
        placeOrderOnline(null, cart);
      }
    }
  }
  return (
    <div className="min-h-screen text-white p-8">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Order Section */}
        <div className="bg-gradient-to-b from-slate-800 via-gray-900 to-gray-800 p-6 rounded-lg shadow-lg space-y-6">
          <h2 className="text-xl font-bold mb-3">Your Order</h2>

          {buyProduct ? (
            <div className="flex items-center justify-between bg-gray-800 p-3 rounded-md">
              <img
                src={buyProduct.image}
                alt={buyProduct.title}
                className="w-16 h-16 object-cover rounded-md mr-4"
              />
              <div className="flex-1">
                <span className="block font-semibold">{buyProduct.title}</span>
                <span className="block text-sm text-gray-400">
                  Qty: {buyProduct.quantity}
                </span>
              </div>
              <span className="font-bold hidden sm:block">
                ₹ {buyProduct.price.toLocaleString("en-IN")}
              </span>
            </div>
          ) : (
            cart.map((p) => (
              <div
                key={p.product._id}
                className="flex items-center justify-between bg-gray-800 p-3 rounded-md"
              >
                <img
                  src={p.product.image}
                  alt={p.product.title}
                  className="w-16 h-16 object-cover rounded-md mr-4"
                />
                <div className="flex-1">
                  <span className="block font-semibold">{p.product.title}</span>
                  <span className="block text-sm text-gray-400">
                    Qty: {p.quantity}
                  </span>
                </div>
                <span className="font-bold">
                  ₹ {p.quantity * p.product.price}
                </span>
              </div>
            ))
          )}

          {/* Summary */}
          <div className="space-y-2 border-t border-gray-700 pt-4">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹ {subtotal.toLocaleString("en-IN")}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>₹ {shipping}</span>
            </div>
            <div className="flex justify-between">
              <span>Discount</span>
              <span>- ₹ {discount}</span>
            </div>
            <div className="flex justify-between font-bold text-lg text-green-400">
              <span>Total</span>
              <span>₹ {total.toLocaleString("en-IN")}</span>
            </div>
          </div>
        </div>

        {/* Address Section */}
        <div className="bg-gradient-to-b from-slate-800 via-gray-900 to-gray-800 p-6 rounded-lg shadow-lg space-y-4">
          <h2 className="text-xl font-bold mb-3 text-blue-500">
            Delivery Address
          </h2>
          <CheckoutAddress />
        </div>

        {/* Payment Method Section */}
        <div className="bg-gradient-to-b from-slate-800 via-gray-900 to-gray-800 p-6 rounded-lg shadow-lg space-y-4">
          <h2 className="text-xl font-bold mb-3 text-purple-500">
            Payment Method
          </h2>
          <div className="flex flex-col space-y-2">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                value="COD"
                checked={paymentMethod === "COD"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <span>Cash on Delivery</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                value="ONLINE"
                checked={paymentMethod === "ONLINE"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <span>Pay Online</span>
            </label>
          </div>
        </div>

        {/* Place Order */}
        <div className="flex justify-center mt-8">
          <button
            type="button"
            className="w-full max-w-xl cursor-pointer px-6 py-3 bg-gradient-to-r from-red-500 to-pink-600 text-white font-bold rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
            onClick={handlePlaceOrder}
          >
            ✅ Place Order
          </button>
        </div>
      </div>
    </div>
  );
}
