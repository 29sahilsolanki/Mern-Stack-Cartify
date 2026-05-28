import { useEffect, useState } from "react";
import { useAdmin } from "../../../Context/AdminContext";
import { FaRegEdit } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";
import Fuse from "fuse.js";

export default function ManageInventory() {
  const { products, fetchProducts, setItemId } = useAdmin();

  useEffect(() => {
    fetchProducts();
  }, []);

  const totalProducts = products.length;
  const inStock = products.filter((p) => p.stock > 0).length;
  const outOfStock = products.filter((p) => p.stock === 0).length;

  // Sorting
  const [sortValue, setSortValue] = useState("");
  const [sorted, setSorted] = useState([]);

  useEffect(() => {
    if (sortValue === "") {
      setSorted([...products]);
    } else if (sortValue === "available") {
      setSorted(products.filter((p) => p.stock > 0));
    } else if (sortValue === "notAvailable") {
      setSorted(products.filter((p) => p.stock === 0));
    } else if (sortValue === "priceLowHigh") {
      setSorted([...products].sort((a, b) => a.price - b.price));
    } else if (sortValue === "priceHighLow") {
      setSorted([...products].sort((a, b) => b.price - a.price));
    }
  }, [sortValue, products]);

  // Search
  const options = { keys: ["title", "description"], threshold: 0.4 };
  const fuse = new Fuse(products, options);
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (!search) {
      setSorted(products);
      return;
    }
    const results = fuse.search(search);
    setSorted(results.map((p) => p.item));
  };

  return (
    <div>
      {/* Inventory Overview */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-4 mt-4 text-white">
          Inventory Overview
        </h1>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="bg-gradient-to-b from-slate-800 via-gray-900 to-gray-800 rounded-md shadow p-4 flex flex-col items-center flex-1">
            <h2 className="text-lg font-bold text-gray-300">Total Products</h2>
            <p className="text-2xl font-semibold text-indigo-400">
              {totalProducts}
            </p>
          </div>
          <div className="bg-gradient-to-b from-slate-800 via-gray-900 to-gray-800 rounded-md shadow p-4 flex flex-col items-center flex-1">
            <h2 className="text-lg font-bold text-gray-300">In Stock</h2>
            <p className="text-2xl font-semibold text-green-400">{inStock}</p>
          </div>
          <div className="bg-gradient-to-b from-slate-800 via-gray-900 to-gray-800 rounded-md shadow p-4 flex flex-col items-center flex-1">
            <h2 className="text-lg font-bold text-gray-300">Out of Stock</h2>
            <p className="text-2xl font-semibold text-red-400">{outOfStock}</p>
          </div>
        </div>
      </div>

      {/* Manage Inventory */}
      <h1 className="text-2xl font-bold mb-2 mt-10 text-white">
        Manage Inventory
      </h1>
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center bg-gradient-to-r from-slate-800 via-gray-900 to-black p-4 rounded-md shadow mb-6 gap-4">
        {/* Left Controls */}
        <div className="flex flex-row gap-4 flex-wrap w-full sm:w-auto">
          <select
            value={sortValue}
            onChange={(e) => setSortValue(e.target.value)}
            className="px-4 py-2 rounded-md bg-gray-900 font-bold text-white border-2 border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm flex-1"
          >
            <option value="">Sort: Default</option>
            <option value="available">Sort: In Stock</option>
            <option value="notAvailable">Sort: Out of Stock</option>
            <option value="priceLowHigh">Sort: Low → High</option>
            <option value="priceHighLow">Sort: High → Low</option>
          </select>

          <Link
            to="/admin-dashboard/upload-products"
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-2 py-2 sm:px-4 rounded-md shadow hover:from-indigo-700 hover:to-purple-700 text-sm flex-1 text-center"
          >
            + Add Product
          </Link>
        </div>

        {/* Search Bar */}
        <form
          onSubmit={handleSearch}
          className="flex items-center bg-slate-700 border-2 border-indigo-600 rounded-md px-3 py-2 w-full sm:w-1/2"
        >
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            className="flex-grow outline-none text-sm bg-transparent text-white placeholder-gray-400"
            onChange={(e) => setSearch(e.target.value)}
          />
          <FiSearch
            className="text-xl text-indigo-400 cursor-pointer ml-2"
            onClick={handleSearch}
          />
        </form>
      </div>

      {/* Product Cards */}
      <div className="flex flex-col gap-4">
        {sorted && sorted.length > 0 ? (
          sorted.map((items) => (
            <div
              key={items._id}
              className="flex flex-col sm:flex-row items-center p-4 gap-4 w-full rounded-md shadow-md bg-gradient-to-b from-slate-800 via-gray-900 to-gray-800 text-white"
            >
              <img
                src={items.image}
                alt={items.title}
                className="h-32 w-32 object-cover rounded-md border border-slate-600 p-2"
              />
              <div className="flex flex-col flex-grow w-full">
                <h2 className="font-bold text-base sm:text-lg">
                  {items.title}
                </h2>
                <p className="text-sm text-gray-300">{items.description}</p>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-3 sm:mt-auto gap-2">
                  <span className="flex gap-4 text-sm text-gray-400">
                    <p>
                      Price:{" "}
                      <label className="text-indigo-400">₹{items.price}</label>
                    </p>
                    <p>
                      Stock:{" "}
                      <label
                        className={
                          items.stock > 0 ? "text-green-400" : "text-red-400"
                        }
                      >
                        {items.stock}
                      </label>
                    </p>
                  </span>
                  <Link
                    to="/admin-dashboard/edit-product"
                    onClick={() => setItemId(items._id)}
                    className="flex text-blue-500 items-center gap-1 cursor-pointer hover:text-indigo-500"
                  >
                    <span>Edit</span>
                    <FaRegEdit />
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-400 py-10 bg-slate-800 rounded-md">
            <p className="text-lg font-semibold text-red-400">
              No products found in this category
            </p>
            <p className="text-sm">
              Try changing your sort option or add new products.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
