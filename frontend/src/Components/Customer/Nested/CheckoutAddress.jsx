import { useState } from "react";
import { useCutomer } from "../../../Context/CustomerContext";

export default function CheckoutAddress() {
  const { customer, address, setAddress, updateAddress } = useCutomer();
  const [newAddress, setNewAddress] = useState(false);
  function handleAddress(e) {
    e.preventDefault();
    updateAddress();
    setNewAddress(false);
  }
  return (
    <div className="mt-6">
      {newAddress ? (
        ""
      ) : customer?.items && customer?.items.length > 0 ? (
        <div>
          <h2 className="text-xl font-bold mb-4">Your Saved Addresses</h2>
          <ul className="space-y-3">
            {customer.items.map((p) => (
              <li
                key={p._id}
                className="flex items-center gap-3 bg-slate-100 p-3 rounded-md hover:bg-white transition cursor-pointer"
              >
                <label className="flex items-center gap-3 w-full cursor-pointer">
                  <input
                    type="radio"
                    name="selectedAddress"
                    value={p._id}
                    onChange={() => setAddress(p)}
                    checked={address._id === p._id}
                    className="accent-indigo-600 cursor-pointer"
                  />
                  <span>
                    {p.address}, {p.state}, {p.pincode}
                  </span>
                </label>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <h2 className="text-md font-bold mb-2">
          You don't have any saved Address..
        </h2>
      )}
      {newAddress ? (
        ""
      ) : (
        <button
          type="button"
          className="mt-4 px-5 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 transition"
          onClick={() => setNewAddress(true)}
        >
          Add New Address
        </button>
      )}
      {newAddress && (
        <div className="mt-10">
          <div className="flex justify-between">
            <h2 className="text-xl font-bold">Enter new address details..</h2>
            <button
              type="button"
              onClick={() => setNewAddress(false)}
              className="cursor-pointer px-3 py-1 bg-red-600 rounded-md hover:bg-red-700 transition"
            >
              Cancel
            </button>
          </div>
          <form onSubmit={handleAddress} className="space-y-4 mt-4">
            <div>
              <label className="block text-sm mb-1">Address</label>
              <input
                type="text"
                placeholder="Address..."
                value={address.address}
                onChange={(e) =>
                  setAddress({ ...address, address: e.target.value })
                }
                required
                className="w-full p-2 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">State</label>
              <input
                type="text"
                placeholder="State..."
                value={address.state}
                onChange={(e) =>
                  setAddress({ ...address, state: e.target.value })
                }
                required
                className="w-full p-2 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Pincode</label>
              <input
                type="text"
                placeholder="Pincode..."
                value={address.pincode}
                onChange={(e) =>
                  setAddress({ ...address, pincode: e.target.value })
                }
                required
                className="w-full p-2 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-indigo-600 rounded-md font-semibold hover:bg-indigo-700 transition"
            >
              Save Address
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
