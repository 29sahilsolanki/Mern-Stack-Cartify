import { useAdmin } from "../../../Context/AdminContext";
import { RiImageAddLine } from "react-icons/ri";
import { RxCross1 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";

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
    <div className="max-w-6xl mx-auto bg-slate-800 p-6 rounded-lg shadow-md text-white mt-6">
      {/* Header with back button */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Add Product</h1>
        <RxCross1
          size={24}
          onClick={() => navigate(-1)}
          className="transition hover:text-blue-500 cursor-pointer"
        />
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Image Upload */}
        <div className="flex items-center gap-3 border border-slate-600 rounded px-3 py-2 bg-slate-700">
          <RiImageAddLine className="text-3xl text-indigo-400" />
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="text-gray-300 cursor-pointer"
          />
        </div>

        {/* Title */}
        <input
          type="text"
          placeholder="Product Title"
          value={data.title}
          onChange={(e) => setData({ ...data, title: e.target.value })}
          className="w-full px-3 py-2 rounded-md bg-gray-900 text-white"
        />

        {/* Description */}
        <textarea
          placeholder="Description"
          value={data.description}
          onChange={(e) => setData({ ...data, description: e.target.value })}
          className="w-full px-3 py-2 rounded-md bg-gray-900 text-white"
          rows={3}
        />

        {/* Price */}
        <input
          type="number"
          placeholder="Price"
          value={data.price}
          onChange={(e) => setData({ ...data, price: e.target.value })}
          className="w-full px-3 py-2 rounded-md bg-gray-900 text-white"
        />

        {/* Stock */}
        <input
          type="number"
          placeholder="Stock"
          value={data.stock}
          onChange={(e) => setData({ ...data, stock: e.target.value })}
          className="w-full px-3 py-2 rounded-md bg-gray-900 text-white"
        />

        {/* Category Dropdown */}
        <select
          value={data.category}
          onChange={(e) => setData({ ...data, category: e.target.value })}
          className="w-full px-3 py-2 rounded-md bg-gray-900 text-white"
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

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 bg-indigo-600 rounded-md text-white hover:bg-indigo-700 transition"
        >
          Upload Product
        </button>
      </form>
    </div>
  );
}
