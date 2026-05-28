import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-slate-900 via-gray-900 to-black text-gray-300 mt-12 sm:mt-8">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-10 sm:py-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <h3 className="text-xl font-bold text-indigo-400 mb-4">
            Cartify Store
          </h3>
          <p className="text-sm leading-6">
            Premium shopping experience with fashion, furniture, jewellery &
            electronics.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold text-indigo-400 mb-4">
            Quick Links
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="#" className="hover:text-indigo-300">
                Shop
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-indigo-300">
                My Orders
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-indigo-300">
                Wishlist
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-indigo-300">
                Support
              </Link>
            </li>
          </ul>
        </div>

        {/* Policies */}
        <div>
          <h4 className="text-lg font-semibold text-indigo-400 mb-4">
            Policies
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="#" className="hover:text-indigo-300">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-indigo-300">
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-indigo-300">
                Return Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="text-lg font-semibold text-indigo-400 mb-4">
            Stay Updated
          </h4>
          <p className="text-sm mb-4">Subscribe for latest offers & updates.</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 outline-none focus:border-indigo-500 text-sm"
            />
            <button className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg font-semibold transition">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Bottom strip */}
      <div className="border-t border-gray-700 text-center py-4 text-sm text-gray-500">
        © {new Date().getFullYear()} Cartify Store. All rights reserved.
      </div>
    </footer>
  );
}
