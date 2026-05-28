import { useLogin } from "../Context/LoginContext";
import { RiImageAddLine } from "react-icons/ri";
import { Link } from "react-router-dom";
export default function Register() {
  const { image, setImage, input, setInput, registerCustomer } = useLogin();

  const handleRegister = (e) => {
    e.preventDefault();
    registerCustomer();
  };

  return (
    <div className="flex justify-center mt-10 mb-10">
      <div className="bg-gradient-to-r from-black via-gray-900 to-black bg-opacity-90 w-xl p-8 rounded-xl shadow-2xl">
        {/* Heading */}
        <h1 className="text-3xl font-bold text-center text-indigo-400 mb-6">
          Register
        </h1>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleRegister}>
          {/* Profile Upload */}
          <div>
            <label className="block text-gray-300 mb-1">Profile</label>
            <div className="flex items-center border border-gray-600 bg-gray-700 text-white px-3 py-2 rounded-md">
              <RiImageAddLine className="text-2xl text-indigo-400 mr-2" />
              <input
                type="file"
                required
                onChange={(e) => setImage(e.target.files[0])}
                className="text-sm text-gray-300"
              />
            </div>
          </div>

          {/* Name */}
          <div>
            <label className="block text-gray-300 mb-1">Name</label>
            <input
              type="text"
              required
              value={input.name}
              placeholder="Enter your name..."
              onChange={(e) => setInput({ ...input, name: e.target.value })}
              className="w-full border border-gray-600 bg-gray-700 text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-300 mb-1">Email</label>
            <input
              type="text"
              required
              value={input.email}
              placeholder="Enter your email..."
              onChange={(e) => setInput({ ...input, email: e.target.value })}
              className="w-full border border-gray-600 bg-gray-700 text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-gray-300 mb-1">Phone</label>
            <input
              type="text"
              required
              value={input.phone}
              placeholder="Enter your phone..."
              onChange={(e) => setInput({ ...input, phone: e.target.value })}
              className="w-full border border-gray-600 bg-gray-700 text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-300 mb-1">Password</label>
            <input
              type="password"
              required
              value={input.password}
              placeholder="***********"
              onChange={(e) => setInput({ ...input, password: e.target.value })}
              className="w-full border border-gray-600 bg-gray-700 text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-gray-300 mb-1">Confirm Password</label>
            <input
              type="password"
              required
              value={input.confirmPass}
              placeholder="***********"
              onChange={(e) =>
                setInput({ ...input, confirmPass: e.target.value })
              }
              className="w-full border border-gray-600 bg-gray-700 text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 px-6 py-2 rounded-md text-white font-semibold transition-transform duration-200 hover:scale-105"
          >
            Register
          </button>
        </form>

        {/* Extra Links */}
        <p className="text-sm text-gray-400 text-center mt-4">
          Already registered?{" "}
          <Link to="/login" className="text-indigo-400 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
