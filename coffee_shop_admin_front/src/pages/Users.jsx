import { useEffect, useState } from "react";
import { getAdmins, addAdmin } from "../api/auth";
import toast from "react-hot-toast";

function Users() {
  const [admins, setAdmins] = useState([]);
  const [newAdmin, setNewAdmin] = useState({
    username: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const data = await getAdmins();
        setAdmins(data);
      } catch (error) {
        toast.error(error.message || "Failed to fetch admin users");
      }
    };
    fetchAdmins();
  }, []);

  const handleInputChange = (e) => {
    setNewAdmin({ ...newAdmin, [e.target.name]: e.target.value });
  };

  const handleAddAdmin = async (e) => {
    e.preventDefault();
    try {
      await addAdmin(newAdmin);
      toast.success("Admin added successfully!");
      setNewAdmin({ username: "", email: "", password: "" });
      const updatedAdmins = await getAdmins();
      setAdmins(updatedAdmins);
    } catch (error) {
      toast.error(error.message || "Failed to add admin");
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f3ef] p-8 font-sans">
      {/* Header */}
      <h1 className="mb-10 text-center text-4xl font-semibold text-[#5c4033]">
        ☕ Admin Management
      </h1>

      {/* Add Admin Card */}
      <form
        onSubmit={handleAddAdmin}
        className="mx-auto mb-12 max-w-md rounded-2xl border border-[#e0d7cf] bg-[#fffdf9] p-6 shadow-[0_4px_15px_rgba(92,64,51,0.1)]"
      >
        <h2 className="mb-5 text-center text-2xl font-semibold text-[#5c4033]">
          Add New Barista (Admin)
        </h2>

        <div className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={newAdmin.username}
            onChange={handleInputChange}
            className="w-full rounded-lg border border-[#d8c9b7] bg-[#fcfaf8] p-3 text-[#5c4033] placeholder-[#a48c77] focus:border-[#b58963] focus:ring-2 focus:ring-[#b58963]/40"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={newAdmin.email}
            onChange={handleInputChange}
            className="w-full rounded-lg border border-[#d8c9b7] bg-[#fcfaf8] p-3 text-[#5c4033] placeholder-[#a48c77] focus:border-[#b58963] focus:ring-2 focus:ring-[#b58963]/40"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={newAdmin.password}
            onChange={handleInputChange}
            className="w-full rounded-lg border border-[#d8c9b7] bg-[#fcfaf8] p-3 text-[#5c4033] placeholder-[#a48c77] focus:border-[#b58963] focus:ring-2 focus:ring-[#b58963]/40"
            required
          />

          <button
            type="submit"
            className="w-full rounded-lg bg-[#b58963] p-3 font-medium text-white shadow-md transition-all duration-200 hover:bg-[#a57855]"
          >
            ☕ Add Admin
          </button>
        </div>
      </form>

      {/* Admin List Table */}
      <div className="mx-auto max-w-4xl overflow-hidden rounded-xl border border-[#e0d7cf] bg-[#fffdf9] shadow-[0_4px_15px_rgba(92,64,51,0.08)]">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[#b58963] text-white">
              <th className="p-3 text-left font-medium">ID</th>
              <th className="p-3 text-left font-medium">Username</th>
              <th className="p-3 text-left font-medium">Email</th>
            </tr>
          </thead>
          <tbody>
            {admins.length > 0 ? (
              admins.map((admin, index) => (
                <tr
                  key={admin.id}
                  className={`border-b border-[#e0d7cf] ${
                    index % 2 === 0 ? "bg-[#fcfaf8]" : "bg-[#f3ede7]"
                  } transition-colors hover:bg-[#ede2d7]`}
                >
                  <td className="p-3 text-[#5c4033]">{admin.id}</td>
                  <td className="p-3 text-[#5c4033]">{admin.username}</td>
                  <td className="p-3 text-[#5c4033]">{admin.email}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="3"
                  className="p-5 text-center italic text-[#a48c77]"
                >
                  No admins found ☕
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users;
