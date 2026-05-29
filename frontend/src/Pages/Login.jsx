import { Link } from "react-router-dom";
import { useLogin } from "../Context/LoginContext";

export default function Login() {
  const { userLogin, loginInput, setLoginInput } = useLogin();

  function handleLogin(e) {
    e.preventDefault();
    userLogin();
  }

  function handleDemoLogin() {
    userLogin({ email: "sahil@gmail.com", password: "12345" });
  }

  return (
    <div className="flex justify-center mt-22">
      <div className="bg-gradient-to-r from-black via-gray-900 to-black bg-opacity-90 w-xl p-8 rounded-xl shadow-2xl">
        {/* Heading */}
        <h1 className="text-3xl font-bold text-center text-indigo-400 mb-6">
          Login
        </h1>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleLogin}>
          {/* Email */}
          <div>
            <label className="block text-gray-300 mb-1">Email</label>
            <input
              type="text"
              value={loginInput.email}
              placeholder="Enter your email..."
              onChange={(e) =>
                setLoginInput({ ...loginInput, email: e.target.value })
              }
              className="w-full border border-gray-600 bg-gray-700 text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-300 mb-1">Password</label>
            <input
              type="password"
              value={loginInput.password}
              placeholder="***********"
              onChange={(e) =>
                setLoginInput({ ...loginInput, password: e.target.value })
              }
              className="w-full border border-gray-600 bg-gray-700 text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 px-6 py-2 rounded-md text-white font-semibold transition-transform duration-200 hover:scale-105"
          >
            Login
          </button>

          {/* Demo Login Button */}
          <button
            type="button"
            onClick={handleDemoLogin}
            className="w-full bg-gray-200 text-gray-800 font-semibold py-2 rounded-md shadow-md hover:bg-gray-300 transition-transform transform hover:scale-105 mt-3"
          >
            Demo Login
          </button>
        </form>

        {/* Extra Links */}
        <p className="text-sm text-gray-400 text-center mt-4">
          Not registered?{" "}
          <Link to="/register" className="text-indigo-400 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
