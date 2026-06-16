import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <h2 className="text-3xl font-extrabold">
              <span className="text-gray-900">Cart</span>
              <span className="text-indigo-600">ify</span>
            </h2>

            <p className="mt-4 text-gray-600 leading-relaxed">
              Discover premium products across electronics, fashion, furniture
              and lifestyle categories. Quality, trust and customer satisfaction
              at the heart of everything we do.
            </p>

            <div className="flex gap-3 mt-6">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-100 hover:bg-indigo-600 hover:text-white flex items-center justify-center transition"
              >
                <FaFacebookF />
              </a>

              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-100 hover:bg-indigo-600 hover:text-white flex items-center justify-center transition"
              >
                <FaInstagram />
              </a>

              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-100 hover:bg-indigo-600 hover:text-white flex items-center justify-center transition"
              >
                <FaTwitter />
              </a>

              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-100 hover:bg-indigo-600 hover:text-white flex items-center justify-center transition"
              >
                <FaYoutube />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-5">Shop</h3>

            <ul className="space-y-3 text-gray-600">
              <li>
                <Link to="/shop" className="hover:text-indigo-600">
                  All Products
                </Link>
              </li>

              <li>
                <Link to="/shop" className="hover:text-indigo-600">
                  Electronics
                </Link>
              </li>

              <li>
                <Link to="/shop" className="hover:text-indigo-600">
                  Fashion
                </Link>
              </li>

              <li>
                <Link to="/shop" className="hover:text-indigo-600">
                  Furniture
                </Link>
              </li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-5">
              My Account
            </h3>

            <ul className="space-y-3 text-gray-600">
              <li>
                <Link
                  to="/customer-dashboard/profile"
                  className="hover:text-indigo-600"
                >
                  Profile
                </Link>
              </li>

              <li>
                <Link
                  to="/customer-dashboard/cart"
                  className="hover:text-indigo-600"
                >
                  Cart
                </Link>
              </li>

              <li>
                <Link
                  to="/customer-dashboard/wishlist"
                  className="hover:text-indigo-600"
                >
                  Wishlist
                </Link>
              </li>

              <li>
                <Link
                  to="/customer-dashboard/orders"
                  className="hover:text-indigo-600"
                >
                  Orders
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-5">
              Stay Updated
            </h3>

            <p className="text-gray-600 mb-4">
              Subscribe to receive offers, discounts and new product launches.
            </p>

            <div className="flex">
              <input
                type="email"
                placeholder="Enter email"
                className="flex-1 border border-gray-300 rounded-l-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />

              <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 rounded-r-xl transition">
                Join
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-200 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Cartify. All rights reserved.
          </p>

          <div className="flex gap-6 text-sm text-gray-500">
            <Link to="#" className="hover:text-indigo-600">
              Privacy Policy
            </Link>

            <Link to="#" className="hover:text-indigo-600">
              Terms of Service
            </Link>

            <Link to="#" className="hover:text-indigo-600">
              Refund Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
