import { useEffect, useState } from "react";
import { useAdmin } from "../../../Context/AdminContext";
import { FaRegEdit } from "react-icons/fa";
import {
  FiSearch,
  FiLayers,
  FiCheckCircle,
  FiXCircle,
  FiPlus,
  FiTrash2,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import Fuse from "fuse.js";

export default function ManageInventory() {
  const { products, fetchProducts, setItemId, deleteProduct } = useAdmin();

  useEffect(() => {
    fetchProducts();
  }, []);

  const totalProducts = products.length;
  const inStock = products.filter((p) => p.stock > 0).length;
  const outOfStock = products.filter((p) => p.stock === 0).length;

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

  /* 🛠️ Optional Operational Mock Handler - Wire this up to your context/API action if available */
  const handleDeleteProduct = (id, title) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to permanently delete "${title}"?`,
    );
    if (confirmDelete) {
      deleteProduct(id);
    }
  };

  return (
    <div className="text-gray-900 min-h-screen p-4 pt-24 pb-12 sm:p-8 font-sans antialiased">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Top Header Panel */}
        <div className="w-full bg-slate-50 border border-gray-200/60 px-6 py-5 rounded-2xl shadow-sm flex items-center gap-3">
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl text-xl">
            <FiLayers />
          </div>
          <div>
            <h1 className="text-xl font-extrabold tracking-tight text-gray-900">
              Inventory Operations
            </h1>
            <p className="text-xs text-gray-400 mt-0.5">
              Audit stock levels, update acquisition listings, and monitor
              parameters
            </p>
          </div>
        </div>

        {/* Inventory Overview Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="bg-white border border-gray-200/80 rounded-2xl p-5 flex flex-col items-center text-center shadow-xs">
            <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl text-lg mb-2">
              <FiLayers />
            </div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-gray-400">
              Total Products
            </h2>
            <p className="text-2xl font-black text-gray-900 tracking-tight mt-1">
              {totalProducts}
            </p>
          </div>

          <div className="bg-white border border-gray-200/80 rounded-2xl p-5 flex flex-col items-center text-center shadow-xs">
            <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl text-lg mb-2">
              <FiCheckCircle />
            </div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-gray-400">
              In Stock
            </h2>
            <p className="text-2xl font-black text-emerald-600 tracking-tight mt-1">
              {inStock}
            </p>
          </div>

          <div className="bg-white border border-gray-200/80 rounded-2xl p-5 flex flex-col items-center text-center shadow-xs">
            <div className="p-2.5 bg-red-50 text-red-600 rounded-xl text-lg mb-2">
              <FiXCircle />
            </div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-gray-400">
              Out of Stock
            </h2>
            <p className="text-2xl font-black text-red-600 tracking-tight mt-1">
              {outOfStock}
            </p>
          </div>
        </div>

        {/* Control Toolbar */}
        <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center bg-slate-50 border border-gray-200/60 p-4 rounded-2xl shadow-sm gap-4">
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <select
              value={sortValue}
              onChange={(e) => setSortValue(e.target.value)}
              className="px-4 py-2.5 rounded-xl bg-white border border-gray-200 text-gray-700 text-xs font-bold uppercase tracking-wider outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all cursor-pointer min-w-45"
            >
              <option value="">Sort: All Products</option>
              <option value="available">Sort: In Stock</option>
              <option value="notAvailable">Sort: Out of Stock</option>
              <option value="priceLowHigh">Sort: Low → High</option>
              <option value="priceHighLow">Sort: High → Low</option>
            </select>

            <Link
              to="/admin-dashboard/upload-products"
              className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold uppercase tracking-wider px-5 py-3 rounded-xl shadow-md shadow-indigo-600/10 transition-all active:scale-98 text-center flex items-center justify-center gap-1.5"
            >
              <FiPlus size={14} /> Add Product
            </Link>
          </div>

          {/* Search Action Bar */}
          <form
            onSubmit={handleSearch}
            className="flex items-center bg-white border border-gray-200 rounded-xl px-4 py-2.5 flex-1 md:max-w-md focus-within:ring-2 focus-within:ring-indigo-500/20 focus-within:border-indigo-500 transition-all"
          >
            <input
              type="text"
              placeholder="Search specifications or titles..."
              value={search}
              className="grow outline-none text-sm bg-transparent text-gray-800 placeholder-gray-400 font-medium"
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              type="submit"
              className="text-gray-400 hover:text-indigo-600 transition cursor-pointer ml-2"
            >
              <FiSearch size={18} />
            </button>
          </form>
        </div>

        {/* Product Cards Feed Array */}
        <div className="flex flex-col gap-4">
          {sorted && sorted.length > 0 ? (
            sorted.map((items) => (
              <div
                key={items._id}
                className="flex flex-col sm:flex-row items-center p-4 sm:p-5 gap-5 w-full rounded-2xl border border-gray-200/80 bg-white shadow-sm hover:shadow-md transition-all duration-200"
              >
                {/* Product Thumbnail Box */}
                <div className="w-32 h-32 bg-slate-50 border border-slate-100 rounded-xl p-3 flex items-center justify-center shrink-0">
                  <img
                    src={items.image}
                    alt={items.title}
                    className="max-h-full max-w-full object-contain mix-blend-multiply"
                  />
                </div>

                {/* Meta Description Node */}
                <div className="flex flex-col grow w-full min-w-0 py-1">
                  <div className="flex justify-between items-start gap-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 block mb-0.5">
                      {items.category || "Premium Catalog"}
                    </span>
                  </div>
                  <h2 className="font-bold text-base text-gray-900 tracking-tight truncate">
                    {items.title}
                  </h2>
                  <p className="text-xs text-gray-400 line-clamp-2 mt-1 font-light leading-relaxed">
                    {items.description}
                  </p>

                  {/* Footer Metrics Data Row */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-4 pt-3 border-t border-slate-100 gap-3">
                    <div className="flex gap-5 text-xs font-semibold text-gray-500">
                      <p>
                        Price:{" "}
                        <span className="text-gray-900 font-extrabold ml-1">
                          ₹{items.price?.toLocaleString("en-IN")}
                        </span>
                      </p>
                      <div className="flex items-center gap-1.5">
                        <span>Stock Parameters:</span>
                        <span
                          className={`px-2 py-0.5 text-[11px] font-bold rounded-md border ${
                            items.stock > 0
                              ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                              : "bg-red-50 text-red-700 border-red-100"
                          }`}
                        >
                          {items.stock > 0
                            ? `${items.stock} Available`
                            : "Out of Stock"}
                        </span>
                      </div>
                    </div>

                    {/* 🛠️ Action Links/Triggers Wrapper Grid */}
                    <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                      {/* Modify Button Trigger */}
                      <Link
                        to="/admin-dashboard/edit-product"
                        onClick={() => setItemId(items._id)}
                        className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider border border-gray-200 hover:border-indigo-600 text-gray-600 hover:text-indigo-600 px-3.5 py-2 bg-white hover:bg-indigo-50/20 rounded-xl transition-all active:scale-95 cursor-pointer"
                      >
                        <span>Edit Product</span>
                        <FaRegEdit size={13} />
                      </Link>

                      {/* 🛠️ NEW: Added Premium Red Delete Button Trigger */}
                      <button
                        type="button"
                        onClick={() =>
                          handleDeleteProduct(items._id, items.title)
                        }
                        className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider bg-red-50 hover:bg-red-100 border border-red-100 hover:border-red-200 text-red-600 px-3.5 py-2 rounded-xl transition-all active:scale-95 cursor-pointer"
                        title="Delete product listing"
                      >
                        <span>Delete</span>
                        <FiTrash2 size={13} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            /* Fallback Container Empty Grid */
            <div className="text-center py-16 bg-slate-50 border border-dashed border-gray-200 rounded-2xl shadow-sm">
              <p className="text-sm font-bold text-red-600 uppercase tracking-wider">
                No products found..!!
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Try changing your structural filter options if any...
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
