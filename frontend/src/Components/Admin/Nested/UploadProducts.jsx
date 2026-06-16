import { useAdmin } from "../../../Context/AdminContext";
import { RiImageAddLine } from "react-icons/ri";
import { RxCross1 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { FiPlusCircle } from "react-icons/fi";

export default function UploadProducts() {
  const { data, setData, image, setImage, uploadProduct } = useAdmin();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("stock", data.stock);
    formData.append("category", data.category);
    uploadProduct(formData);
  }

  return (
    <div className=" text-gray-900 min-h-screen p-4 pt-24 pb-12 sm:p-8 font-sans antialiased flex items-center justify-center">
      <div className="w-full max-w-4xl bg-white border border-gray-200/80 p-5 sm:p-8 rounded-2xl shadow-sm space-y-6">
        {/* Header Block */}
        <div className="flex justify-between items-center pb-4 border-b border-gray-100">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-600 block mb-0.5">
              Product Upload page
            </span>
            <h1 className="text-lg font-extrabold tracking-tight text-gray-900">
              Add Product
            </h1>
          </div>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="p-2 rounded-xl text-gray-400 hover:text-gray-900 hover:bg-slate-50 transition cursor-pointer flex items-center justify-center"
          >
            <RxCross1 size={18} />
          </button>
        </div>

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Image Upload Block */}
          <div className="space-y-1">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-500">
              Product Image
            </label>
            <div className="flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-3 bg-slate-50/60 transition-all focus-within:bg-white focus-within:ring-2 focus-within:ring-indigo-500/20 focus-within:border-indigo-500">
              <RiImageAddLine className="text-2xl text-indigo-600 shrink-0" />
              <input
                type="file"
                required
                onChange={(e) => setImage(e.target.files[0])}
                className="text-xs text-gray-500 font-medium file:mr-3 file:py-1 file:px-2.5 file:rounded-lg file:border file:border-gray-200 file:text-[11px] file:font-bold file:uppercase file:bg-white file:text-gray-700 hover:file:bg-slate-50 cursor-pointer w-full"
              />
            </div>
          </div>

          {/* Title Parameter Input */}
          <div className="space-y-1">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-500">
              Product Title
            </label>
            <input
              type="text"
              placeholder="Enter product title..."
              value={data.title}
              required
              onChange={(e) => setData({ ...data, title: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-gray-200 text-sm font-medium text-gray-800 outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
            />
          </div>

          {/* Description Parameter Input */}
          <div className="space-y-1">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-500">
              Product Description
            </label>
            <textarea
              placeholder="Provide a detailed description of features..."
              value={data.description}
              required
              onChange={(e) =>
                setData({ ...data, description: e.target.value })
              }
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-gray-200 text-sm font-medium text-gray-800 outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
              rows={3}
            />
          </div>

          {/* Price + Stock Grid Split Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-500">
                Price (INR)
              </label>
              <input
                type="number"
                placeholder="0.00"
                value={data.price}
                required
                onChange={(e) => setData({ ...data, price: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-gray-200 text-sm font-medium text-gray-800 outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-500">
                Stock Quantity
              </label>
              <input
                type="number"
                placeholder="Available units count"
                value={data.stock}
                required
                onChange={(e) => setData({ ...data, stock: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-gray-200 text-sm font-medium text-gray-800 outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
              />
            </div>
          </div>

          {/* Category Dropdown Selection Panel */}
          <div className="space-y-1">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-500">
              Product Category
            </label>
            <select
              value={data.category}
              required
              onChange={(e) => setData({ ...data, category: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-gray-200 text-sm font-bold text-gray-700 outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all cursor-pointer"
            >
              <option value="">Select Category</option>
              <option value="fashion">Fashion</option>
              <option value="electronics">Electronics</option>
              <option value="beauty">Beauty</option>
              <option value="home">Home</option>
              <option value="furniture">Furniture</option>
              <option value="sports">Sports</option>
              <option value="jewellery">Jewellery</option>
              <option value="toys">Toys</option>
            </select>
          </div>

          {/* Submit Trigger Action */}
          <div className="flex justify-center pt-4">
            <button
              type="submit"
              className="w-full sm:w-56 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md shadow-indigo-600/10 transition-all active:scale-98 cursor-pointer flex items-center justify-center gap-2"
            >
              <FiPlusCircle size={14} /> Upload Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
