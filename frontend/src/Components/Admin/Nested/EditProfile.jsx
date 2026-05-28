import { toast } from "react-toastify";
import { useAdmin } from "../../../Context/AdminContext";

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
    <div className="flex items-center justify-center text-white">
      <div className="w-full bg-gradient-to-b from-slate-800 via-gray-900 to-gray-800 p-6 rounded-lg shadow-lg">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold">Edit Your Profile</h1>
          <button
            type="button"
            onClick={() => setEdit(false)}
            className="cursor-pointer px-3 py-1 bg-red-600 rounded-md hover:bg-red-700 transition"
          >
            Cancel
          </button>
        </div>

        {/* Profile Pic + File Input (separate section) */}
        <div className="mb-6">
          <div className="flex gap-6">
            {/* Left: Image */}
            <div className="w-1/3 flex justify-center items-center">
              <img
                src={admin.profilePic}
                alt={admin.name}
                className="h-32 w-32 object-cover rounded-full border-4 border-indigo-600"
              />
            </div>

            {/* Right: File input + Change button */}
            <div className="w-2/3 flex flex-col justify-center">
              <input
                type="file"
                onChange={(e) => setProfilePic(e.target.files[0])}
                className="block w-full text-sm text-gray-300
                           file:mr-4 file:py-2 file:px-4
                           file:rounded-md file:border-0
                           file:text-sm file:font-semibold
                           file:bg-indigo-600 file:text-white
                           hover:file:bg-indigo-700"
              />
              <button
                type="button" // important: not submit
                className="mt-3 px-4 py-2 bg-indigo-600 rounded-md hover:bg-indigo-700 transition"
                onClick={handleProfile}
              >
                Change
              </button>
            </div>
          </div>
        </div>

        {/* Form for updating details */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Name field */}
          <div>
            <label className="block mb-1">Name</label>
            <input
              type="text"
              value={adminDetails.name}
              required
              className="w-full px-3 py-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onChange={(e) =>
                setAdminDetails({ ...adminDetails, name: e.target.value })
              }
            />
          </div>

          {/* Email + Phone */}
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block mb-1">Email</label>
              <input
                type="email"
                value={adminDetails.email}
                required
                className="w-full px-3 py-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onChange={(e) =>
                  setAdminDetails({ ...adminDetails, email: e.target.value })
                }
              />
            </div>
            <div className="flex-1">
              <label className="block mb-1">Phone</label>
              <input
                type="text"
                value={adminDetails.phone}
                required
                className="w-full px-3 py-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onChange={(e) =>
                  setAdminDetails({ ...adminDetails, phone: e.target.value })
                }
              />
            </div>
          </div>

          {/* Password + Confirm Password */}
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block mb-1">Password</label>
              <input
                type="password"
                placeholder="**********"
                value={adminDetails.password}
                className="w-full px-3 py-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onChange={(e) =>
                  setAdminDetails({ ...adminDetails, password: e.target.value })
                }
              />
            </div>
            <div className="flex-1">
              <label className="block mb-1">Confirm Password</label>
              <input
                type="password"
                placeholder="**********"
                value={adminDetails.confirmPassword}
                className="w-full px-3 py-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onChange={(e) =>
                  setAdminDetails({
                    ...adminDetails,
                    confirmPass: e.target.value,
                  })
                }
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center mt-10">
            <button
              type="submit"
              className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 transition"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
