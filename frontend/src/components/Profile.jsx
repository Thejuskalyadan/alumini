import { useEffect, useState } from "react";
const Profile = () => {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
    const [formData, setFormData] = useState({
    name: "",
    email: "",
    graduationYear: "",
    department: "",
  });

    useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setFormData({
        name: parsedUser.name || "",
        email: parsedUser.email || "",
        graduationYear: parsedUser.graduationYear || "",
        department: parsedUser.department || "",
      });
    }
    }, []);

    const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {

    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/auth/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formData),
      });

        const data = await response.json();
        if (!response.ok) {
            alert(data.message || "Failed to update profile");
            return;
        }

        setUser(data);
        localStorage.setItem("user", JSON.stringify(data));
        setEditing(false);
    } catch (err) {
        alert("Unable to connect to server");
    }
    };

    if (!user) return <div>Loading...</div>;
    return (
    <div
     className="h-screen bg-cover bg-center relative"
     style={{ backgroundImage: "url('/img.jpg')" }}
   >
     {/* Glass Overlay */}
     <div className="absolute inset-0 bg-white/30 backdrop-blur-sm" />
   
        {/* Main Content Wrapper */}
        <div className="relative z-10 w-full px-10 py-6 space-y-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">My Profile</h2>
            <form onSubmit={handleSubmit} className="bg-white/50 backdrop-blur-md border border-white/30 rounded-xl shadow p-6 max-w-lg">
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">Name</label>

                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        disabled={!editing}
                        className="w-full p-3 border border-gray-300 bg-white/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        disabled={!editing}
                        className="w-full p-3 border border-gray-300 bg-white/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">Graduation Year</label>
                    <input
                        type="text"
                        name="graduationYear"
                        value={formData.graduationYear}
                        onChange={handleChange}
                        disabled={!editing}
                        className="w-full p-3 border border-gray-300 bg-white/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">Department</label>
                    <input
                        type="text"
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                        disabled={!editing}
                        className="w-full p-3 border border-gray-300 bg-white/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
                    />
                </div>
                {editing && (
                    <button
                        type="submit"
                        className="bg-indigo-600 text-white py-2 px-4 rounded-xl hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
                    >
                        Save Changes
                    </button>
                )}
            </form>
            {!editing && (
                <button
                    onClick={() => setEditing(true)}
                    className="bg-gray-200 text-gray-700 py-2 px-4 rounded-xl hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition"
                >
                    Edit Profile
                </button>
            )}
         </div>

        </div>
       
    
);
};

export default Profile;