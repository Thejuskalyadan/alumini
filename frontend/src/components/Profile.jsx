import { useEffect, useState } from "react";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    graduationYear: "",
    department: "",
    github: "",
    linkedin: "",
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
        github: parsedUser.github || "",
        linkedin: parsedUser.linkedin || "",
        bio: parsedUser.bio || "",
        organisation: parsedUser.organisation || "",
        jobTitle: parsedUser.jobTitle || "",
        industry: parsedUser.industry || "",
        skills: parsedUser.skills ? parsedUser.skills.join(", ") : "",
        personalWebsite: parsedUser.personalWebsite || "",
        location: parsedUser.location || "",

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
      alert("Profile updated successfully!");
    } catch (err) {
      alert("Unable to connect to server");
    }
  };

  if (!user) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-cover bg-center relative flex items-center justify-center" 
         style={{ backgroundImage: "url('/img.jpg')" }}>
      
      {/* Glass Overlay */}
      <div className="absolute inset-0 bg-white/30 backdrop-blur-sm" />

      {/* Main Content Wrapper */}
      <div className="relative z-10 w-full max-w-2xl px-6 py-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">My Profile</h2>
        
        <form onSubmit={handleSubmit} className="bg-white/60 backdrop-blur-md border border-white/30 rounded-2xl shadow-xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Input Groups */}
            {[
              { label: "Name", name: "name", type: "text" },
              { label: "Email", name: "email", type: "email" },
              { label: "Graduation Year", name: "graduationYear", type: "text" },
              { label: "Department", name: "department", type: "text" },
              { label: "GitHub URL", name: "github", type: "text" },
              { label: "LinkedIn URL", name: "linkedin", type: "text" },
              { label: "Bio", name: "bio", type: "text" },
              { label: "Company/Organisation", name: "company/organisation", type: "text" },
              { label: "Job Title", name: "jobTitle", type: "text" },
              { label: "Industry", name: "industry", type: "text" },
              { label: "Skills (comma separated)", name: "skills", type: "text" },
              { label: "Personal Website URL", name: "personalWebsite", type: "text" }
            ].map((field) => (
              <div key={field.name} className="mb-2">
                <label className="block text-gray-700 font-semibold mb-1 text-sm">{field.label}</label>
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  disabled={!editing}
                  className={`w-full p-3 border rounded-xl transition focus:outline-none focus:ring-2 focus:ring-indigo-400 
                    ${editing ? "bg-white border-indigo-200" : "bg-gray-100/50 border-transparent cursor-not-allowed"}`}
                />
              </div>
            ))}
          </div>

          <div className="mt-8 flex gap-4">
            {editing ? (
              <>
                <button type="submit" className="flex-1 bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700 transition font-bold">
                  Save Changes
                </button>
                <button type="button" onClick={() => setEditing(false)} className="flex-1 bg-gray-400 text-white py-3 rounded-xl hover:bg-gray-500 transition font-bold">
                  Cancel
                </button>
              </>
            ) : (
              <button type="button" onClick={() => setEditing(true)} className="w-full bg-indigo-500 text-white py-3 rounded-xl hover:bg-indigo-600 transition font-bold">
                Edit Profile
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;