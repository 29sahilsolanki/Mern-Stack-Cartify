import { toast } from "react-toastify";
import { useAdmin } from "../../../Context/AdminContext";
import { FiUser, FiCamera, FiCheckCircle } from "react-icons/fi";

export default function EditProfile({ edit, setEdit }) {
  const {
    admin,
    profilePic,
    setProfilePic,
    adminDetails,
    setAdminDetails,
    updateAdminProfile,
    updateAdminInfo,
  } = useAdmin();

  function handleProfile() {
    if (!profilePic) {
      return toast.info("Please select a profile image first..!!");
    }
    updateAdminProfile();
    setEdit(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (adminDetails.password !== adminDetails.confirmPassword) {
      return toast.error("passwords do not match..!!");
    }
    if (
      adminDetails.name === admin.name &&
      adminDetails.email === admin.email &&
      adminDetails.phone === admin.phone &&
      !adminDetails.password
    )
      return toast.info("No changes detected..!!");
    updateAdminInfo();
    setEdit(false);
  }

  return (
    <div className="flex items-center justify-center text-gray-900 font-sans antialiased w-full">
      <div className="w-full bg-white border border-gray-200/80 p-5 sm:p-8 rounded-2xl shadow-sm space-y-6">
        {/* Header Panel */}
        <div className="flex justify-between items-center pb-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <FiUser className="text-indigo-600 text-lg" />
            <h1 className="text:md md:text-lg font-extrabold tracking-tight text-gray-900">
              Edit Your Profile
            </h1>
          </div>
          <button
            type="button"
            onClick={() => setEdit(false)}
            className="cursor-pointer text-xs font-bold uppercase tracking-wider px-3 py-1.5 bg-red-50 hover:bg-red-100 border border-red-100 text-red-600 rounded-lg transition-all"
          >
            Cancel X
          </button>
        </div>

        {/* Profile Pic + File Input */}
        <div className="bg-slate-50/60 border border-slate-200/40 p-4 rounded-xl">
          <div className="flex flex-col sm:flex-row gap-5 items-center">
            {/* Left: Image Container */}
            <div className="shrink-0">
              <img
                src={admin.profilePic}
                alt={admin.name}
                className="h-24 w-24 sm:h-28 sm:w-28 object-cover rounded-full border-4 border-white shadow-md ring-4 ring-indigo-50"
              />
            </div>

            {/* Right: File input + Change action */}
            <div className="flex-1 w-full flex flex-col justify-center gap-2.5">
              <input
                type="file"
                onChange={(e) => setProfilePic(e.target.files[0])}
                className="block w-full text-xs text-gray-500 font-medium
                           file:mr-4 file:py-2 file:px-3
                           file:rounded-xl file:border file:border-gray-200
                           file:text-xs file:font-bold file:uppercase file:tracking-wider
                           file:bg-white file:text-gray-700
                           hover:file:bg-slate-50 file:cursor-pointer"
              />
              <button
                type="button"
                onClick={handleProfile}
                className="w-full sm:w-32 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-xs active:scale-95 cursor-pointer"
              >
                <FiCamera size={13} /> Change
              </button>
            </div>
          </div>
        </div>

        {/* Form for updating parameters */}
        <form className="space-y-4 pt-1" onSubmit={handleSubmit}>
          {/* Name field */}
          <div className="space-y-1">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-500">
              Full Name
            </label>
            <input
              type="text"
              value={adminDetails.name}
              required
              onChange={(e) =>
                setAdminDetails({ ...adminDetails, name: e.target.value })
              }
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-gray-200 text-sm font-medium text-gray-800 outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
            />
          </div>

          {/* Email + Phone Grid Split */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-500">
                Email Address
              </label>
              <input
                type="email"
                value={adminDetails.email}
                required
                onChange={(e) =>
                  setAdminDetails({ ...adminDetails, email: e.target.value })
                }
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-gray-200 text-sm font-medium text-gray-800 outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-500">
                Phone Contact
              </label>
              <input
                type="text"
                value={adminDetails.phone}
                required
                onChange={(e) =>
                  setAdminDetails({ ...adminDetails, phone: e.target.value })
                }
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-gray-200 text-sm font-medium text-gray-800 outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
              />
            </div>
          </div>

          {/* Password + Confirm Password Grid Split */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-500">
                New Password
              </label>
              <input
                type="password"
                placeholder="••••••••••••"
                value={adminDetails.password}
                onChange={(e) =>
                  setAdminDetails({ ...adminDetails, password: e.target.value })
                }
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-gray-200 text-sm font-medium text-gray-800 outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-500">
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="••••••••••••"
                value={adminDetails.confirmPassword}
                onChange={(e) =>
                  setAdminDetails({
                    ...adminDetails,
                    confirmPassword: e.target.value,
                  })
                }
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-gray-200 text-sm font-medium text-gray-800 outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
              />
            </div>
          </div>

          {/* Form Trigger Action */}
          <div className="flex justify-center pt-4">
            <button
              type="submit"
              className="w-full sm:w-56 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md shadow-indigo-600/10 transition-all active:scale-98 cursor-pointer flex items-center justify-center gap-2"
            >
              <FiCheckCircle size={14} /> Save Global Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
