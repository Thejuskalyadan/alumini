import { useEffect, useState } from "react";

function UsersManagement() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/users");
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.log("Error fetching users", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const deleteUser = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?",
    );

    if (!confirmDelete) return;

    try {
      await fetch(`http://localhost:5000/api/auth/${id}`, {
        method: "DELETE",
      });

      fetchUsers(); // refresh 🔥
    } catch (err) {
      console.log("Delete failed", err);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Users Management
      </h2>

      <div className="space-y-4">
        {users.map((user) => (
          <div
            key={user._id}
            className="bg-white/40 backdrop-blur-xl p-5 rounded-2xl shadow flex justify-between items-center transition hover:bg-white/60 hover:shadow-lg"
          >
            {/* ✅ Left */}
            <div className="flex items-center gap-4">
              {/* Avatar */}
              <div className="w-10 h-10 rounded-full bg-indigo-500 text-white flex items-center justify-center font-medium">
                {user.name?.charAt(0).toUpperCase()}
              </div>

              {/* Info */}
              <div>
                <div className="flex gap-2 items-center">
                  <p className="font-medium text-gray-800">{user.name}</p>

                  {/* ✅ Role Badge 🔥 */}
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      user.role === "admin"
                        ? "bg-purple-100 text-purple-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {user.role}
                  </span>

                  {/* ✅ Status Badge 🔥 */}
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      user.status === "approved"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {user.status}
                  </span>
                </div>

                <p className="text-sm text-gray-600">{user.email}</p>

                <p className="text-xs text-gray-500">
                  {user.department} • {user.graduationYear}
                </p>
              </div>
            </div>

            {/* ✅ Right */}
            <button
              onClick={() => deleteUser(user._id)}
              className="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 transition shadow-sm hover:shadow-md active:scale-[0.97]"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UsersManagement;
