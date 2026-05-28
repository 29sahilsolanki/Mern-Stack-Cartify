import { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { RiImageAddLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useAdmin } from "../../../Context/AdminContext";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function EditProducts() {
  const { existingDetails, updateProductDetails } = useAdmin();
  const [product, setProduct] = useState({
    title: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    image: "",
  });
  useEffect(() => {
    if (existingDetails) {
      setProduct({
        title: existingDetails.title || "",
        description: existingDetails.description || "",
        price: existingDetails.price || "",
        stock: existingDetails.stock || "",
        category: existingDetails.category || "",
        image: "",
      });
    }
  }, [existingDetails]);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (
      existingDetails.title === product.title &&
      existingDetails.description === product.description &&
      existingDetails.price === product.price &&
      existingDetails.stock === product.stock &&
      existingDetails.category === product.category &&
      !product.image
    )
      return toast.info("No changes detected..!!");

    {
      /* append to send */
    }
    const formData = new FormData();
    formData.append("productId", existingDetails._id);
    formData.append("image", product.image);
    formData.append("title", product.title);
    formData.append("description", product.description);
    formData.append("price", product.price);
    formData.append("stock", product.stock);
    formData.append("category", product.category);

    updateProductDetails(formData);
  }

  return (
    <div className="max-w-6xl mx-auto bg-slate-800 p-6 rounded-lg shadow-md text-white mt-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Edit Product</h1>
        <RxCross1
          size={24}
          onClick={() => navigate(-1)}
          className="transition hover:text-blue-500 cursor-pointer"
        />
      </div>

      {/* Form */}
      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Image Upload with Icon */}
        <div className="flex items-center gap-3 border border-slate-600 rounded px-3 py-2 bg-slate-700">
          <RiImageAddLine className="text-3xl text-indigo-400" />
          <input
            type="file"
            name="image"
            onChange={(e) =>
              setProduct({ ...product, image: e.target.files[0] })
            }
            className="text-gray-300 cursor-pointer"
          />
        </div>

        <input
          type="text"
          name="title"
          value={product.title}
          required
          onChange={(e) => setProduct({ ...product, title: e.target.value })}
          placeholder="Product Title"
          className="w-full px-3 py-2 rounded-md bg-gray-900 text-white"
        />

        <textarea
          name="description"
          value={product.description}
          required
          onChange={(e) =>
            setProduct({ ...product, description: e.target.value })
          }
          placeholder="Description"
          className="w-full px-3 py-2 rounded-md bg-gray-900 text-white"
          rows={3}
        />

        <input
          type="number"
          name="price"
          required
          value={product.price}
          onChange={(e) => setProduct({ ...product, price: e.target.value })}
          placeholder="Price"
          className="w-full px-3 py-2 rounded-md bg-gray-900 text-white"
        />

        <input
          type="number"
          name="stock"
          required
          value={product.stock}
          onChange={(e) => setProduct({ ...product, stock: e.target.value })}
          placeholder="Stock"
          className="w-full px-3 py-2 rounded-md bg-gray-900 text-white"
        />

        {/* Category Dropdown */}
        <select
          name="category"
          value={product.category}
          required
          onChange={(e) => setProduct({ ...product, category: e.target.value })}
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

        <button
          type="submit"
          className="w-full cursor-pointer py-2 bg-indigo-600 rounded-md text-white hover:bg-indigo-700 transition"
        >
          Update Product
        </button>
      </form>
    </div>
  );
}
