import { Link } from "react-router-dom";
import { useLogin } from "../Context/LoginContext";
import { FiMail, FiLock, FiUserCheck, FiShield } from "react-icons/fi";

export default function Login() {
  const { userLogin, loginInput, setLoginInput, loading } = useLogin();

  function handleLogin(e) {
    e.preventDefault();
    userLogin();
  }

  function handleUserLogin() {
    userLogin({ email: "sahil@gmail.com", password: "12345" });
  }

  function handleAdminLogin() {
    userLogin({ email: "admin@gmail.com", password: "admin" });
  }

  return (
    <div className="min-h-screen  text-gray-900 font-sans antialiased flex items-center justify-center p-4 ">
      {/* 1. LOADING LOADER */}
      {loading && (
        <div className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="animate-spin rounded-full h-14 w-14 border-t-4 border-indigo-600 border-b-4"></div>
        </div>
      )}

      {/* 2. LOGIN CARD (Luxury White Minimal Architecture) */}
      <div className="bg-white border border-gray-100 w-full max-w-md p-6 sm:p-10 rounded-3xl shadow-xl shadow-slate-200/50">
        {/* Brand Curation Title */}
        <div className="text-center mb-8 space-y-1">
          <h1 className="text-3xl font-black tracking-tight text-gray-900">
            Welcome Back
          </h1>
          <p className="text-xs text-gray-400">
            Access your premium Cartify dashboard node
          </p>
        </div>

        {/* Credentials Form Structure */}
        <form className="space-y-5" onSubmit={handleLogin}>
          {/* Email Input Node */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-500">
              Email Address
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-4 text-gray-400">
                <FiMail size={16} />
              </span>
              <input
                type="email"
                value={loginInput.email}
                placeholder="name@example.com"
                required
                onChange={(e) =>
                  setLoginInput({ ...loginInput, email: e.target.value })
                }
                className="w-full border border-gray-200 bg-slate-50/50 text-sm pl-11 pr-4 py-3.5 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder-gray-400 font-medium"
              />
            </div>
          </div>

          {/* Password Input Node */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-500">
              Security Token / Password
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-4 text-gray-400">
                <FiLock size={16} />
              </span>
              <input
                type="password"
                value={loginInput.password}
                placeholder="••••••••••••"
                required
                onChange={(e) =>
                  setLoginInput({ ...loginInput, password: e.target.value })
                }
                className="w-full border border-gray-200 bg-slate-50/50 text-sm pl-11 pr-4 py-3.5 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder-gray-400"
              />
            </div>
          </div>

          {/* Primary Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 py-4 rounded-xl text-white text-sm font-bold uppercase tracking-wider transition-all shadow-md shadow-indigo-600/10 active:scale-98 mt-2"
          >
            Authenticate Login
          </button>

          {/* Separator Accent */}
          <div className="relative flex py-2 items-center">
            <div className="grow border-t border-gray-100"></div>
            <span className="shrink mx-4 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
              Demo Sandbox
            </span>
            <div className="grow border-t border-gray-100"></div>
          </div>

          {/* Sandbox Mock Access Actions */}
          <div className="flex justify-between gap-3 w-full">
            <button
              type="button"
              onClick={handleUserLogin}
              className="w-1/2 bg-slate-50 hover:bg-slate-100 border border-gray-200 text-gray-700 text-xs font-bold py-3 px-2 rounded-xl transition-all active:scale-95 flex items-center justify-center gap-1.5"
            >
              <FiUserCheck className="text-indigo-600" /> Demo User
            </button>
            <button
              type="button"
              onClick={handleAdminLogin}
              className="w-1/2 bg-slate-50 hover:bg-slate-100 border border-gray-200 text-gray-700 text-xs font-bold py-3 px-2 rounded-xl transition-all active:scale-95 flex items-center justify-center gap-1.5"
            >
              <FiShield className="text-indigo-600" /> Demo Admin
            </button>
          </div>
        </form>

        {/* Context Redirect Anchors */}
        <p className="text-xs sm:text-sm text-gray-400 text-center mt-8">
          Not registered in the database?{" "}
          <Link
            to="/register"
            className="text-indigo-600 font-bold hover:underline"
          >
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
}
