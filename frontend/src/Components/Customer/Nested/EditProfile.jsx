import { toast } from "react-toastify";
import { useCutomer } from "../../../Context/CustomerContext";

export default function EditProfile({ customer, edit, setEdit }) {
  const {
    updateCus,
    setUpdateCus,
    profile,
    setProfile,
    updateProfile,
    updateCustomerDetails,
  } = useCutomer();

  function handleSubmit(e) {
    e.preventDefault();
    if (updateCus.password !== updateCus.confirmPassword) {
      return toast.error("passwords do not match..!!");
    }
    if (
      updateCus.name === customer.name &&
      updateCus.email === customer.email &&
      updateCus.phone === customer.phone &&
      !updateCus.password
    ) {
      return toast.info("No changes detected..!!");
    }
    updateCustomerDetails();
    setEdit(false);
  }

  function handleProfile() {
    if (!profile) {
      return toast.info("Please select a profile image first..!!");
    }
    updateProfile();
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
                src={customer.profilePic}
                alt={customer.name}
                className="h-32 w-32 object-cover rounded-full border-4 border-indigo-600"
              />
            </div>

            {/* Right: File input + Change button */}
            <div className="w-2/3 flex flex-col justify-center">
              <input
                type="file"
                onChange={(e) => setProfile(e.target.files[0])}
                className="block w-full text-sm text-gray-300
                           file:mr-4 file:py-2 file:px-4
                           file:rounded-md file:border-0
                           file:text-sm file:font-semibold
                           file:bg-indigo-600 file:text-white
                           hover:file:bg-indigo-700"
              />
              <button
                type="button" // important: not submit
                onClick={handleProfile}
                className="mt-3 px-4 py-2 bg-indigo-600 rounded-md hover:bg-indigo-700 transition"
              >
                Change
              </button>
            </div>
          </div>
        </div>

        {/* Form for updating details */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name field */}
          <div>
            <label className="block mb-1">Name</label>
            <input
              type="text"
              value={updateCus.name}
              onChange={(e) =>
                setUpdateCus({ ...updateCus, name: e.target.value })
              }
              className="w-full px-3 py-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Email + Phone */}
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block mb-1">Email</label>
              <input
                type="email"
                value={updateCus.email}
                onChange={(e) =>
                  setUpdateCus({ ...updateCus, email: e.target.value })
                }
                className="w-full px-3 py-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="flex-1">
              <label className="block mb-1">Phone</label>
              <input
                type="text"
                value={updateCus.phone}
                onChange={(e) =>
                  setUpdateCus({ ...updateCus, phone: e.target.value })
                }
                className="w-full px-3 py-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Password + Confirm Password */}
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block mb-1">Password</label>
              <input
                type="password"
                value={updateCus.password}
                placeholder="**********"
                onChange={(e) =>
                  setUpdateCus({ ...updateCus, password: e.target.value })
                }
                className="w-full px-3 py-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="flex-1">
              <label className="block mb-1">Confirm Password</label>
              <input
                type="password"
                placeholder="**********"
                value={updateCus.confirmPassword}
                onChange={(e) =>
                  setUpdateCus({
                    ...updateCus,
                    confirmPassword: e.target.value,
                  })
                }
                className="w-full px-3 py-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
