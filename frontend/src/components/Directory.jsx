import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Directory = () => {
  const [alumni, setAlumni] = useState([]);
  const [search, setSearch] = useState("");
  const user = JSON.parse(localStorage.getItem("user") || "null");

  useEffect(() => {
    fetch("http://localhost:5000/api/auth/directory")
      .then((res) => res.json())
      .then((data) => setAlumni(data));
  }, []);

  const filteredAlumni = alumni.filter((person) =>
    person.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div
      className="min-h-screen bg-cover bg-center relative"
      style={{ backgroundImage: "url('/img.jpg')" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-white/30 backdrop-blur-sm" />

      <div className="relative z-10 w-full px-10 py-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between bg-white/70 backdrop-blur-md border border-white/30 rounded-2xl px-6 py-4 shadow-lg">
          <div className="flex items-center gap-4">
            <img
              src={
                user?.profileImage
                  ? `http://localhost:5000/uploads/${user.profileImage}`
                  : "https://ui-avatars.com/api/?name=" +
                    (user?.name || "Alumni")
              }
              alt="Profile"
              className="w-12 h-12 rounded-full object-cover border border-white/40 shadow"
            />
            <h1 className="text-lg font-semibold text-gray-800">
              {user?.name || "Alumni"}
            </h1>
          </div>

          <button
            onClick={() => {
              localStorage.clear();
              window.location.href = "/login";
            }}
            className="text-sm bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-800">Alumni Directory</h2>

        {/* Search */}
        <input
          type="text"
          placeholder="Search alumni by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 rounded-xl border border-white/40 bg-white/60 backdrop-blur-md"
        />

        {/* Grid */}
        <div className="grid grid-cols-4 gap-6">
          {filteredAlumni.map((person) => (
            <div
              key={person._id}
              className="bg-white/60 backdrop-blur-md border border-white/30 rounded-xl shadow p-5 hover:scale-[1.02] transition"
            >
              <div className="flex items-center gap-4 mb-3">
                <img
                  src={
                    person.profileImage
                      ? `http://localhost:5000/uploads/${person.profileImage}`
                      : "https://ui-avatars.com/api/?name=" + person.name
                  }
                  alt="alumni"
                  className="w-14 h-14 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold text-gray-800">{person.name}</h3>
                  <p className="text-sm text-gray-600">{person.department}</p>
                </div>
              </div>

              <p className="text-sm text-gray-500">
                Batch: {person.graduationYear}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Directory;
