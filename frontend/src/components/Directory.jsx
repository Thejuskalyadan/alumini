import { useEffect, useState } from "react";

const Directory = () => {
  const [alumni, setAlumni] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/auth/directory")
      .then((res) => res.json())
      .then((data) => {
        setAlumni(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error("Failed to fetch alumni:", err);
        setAlumni([]);
      })
      .finally(() => setLoading(false));
  }, []);

  // Unique filter values derived from state
  const years = [...new Set(alumni.map((a) => a.graduationYear).filter(Boolean))].sort((a, b) => b - a);
  const departments = [...new Set(alumni.map((a) => a.department).filter(Boolean))].sort();

  // Filtering logic
  const filteredAlumni = alumni.filter((person) => {
    const matchesSearch = person.name?.toLowerCase().includes(search.toLowerCase());
    const matchesYear = selectedYear ? String(person.graduationYear) === selectedYear : true;
    const matchesDept = selectedDepartment ? person.department === selectedDepartment : true;
    return matchesSearch && matchesYear && matchesDept;
  });

  
  return (
    <div
     className="h-screen bg-cover bg-center relative"
     style={{ backgroundImage: "url('/img.jpg')" }}
   >
     {/* Glass Overlay */}
     <div className="absolute inset-0 bg-white/30 backdrop-blur-sm" />

      {/* Main Content Wrapper */}
      
        {/* Header */}
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Alumni Directory</h2>
      <div className="absolute inset-0 bg-white/30 backdrop-blur-[2px] pointer-events-none"></div>

      <div className="container mx-auto relative z-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Alumni Directory</h2>

        {/* Search + Filters */}
        <div className="flex flex-wrap gap-4 mb-10">
          <input
            type="text"
            placeholder="Search alumni by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="p-3 rounded-xl border border-white/40 bg-white/60 backdrop-blur-md w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="p-3 rounded-xl bg-white/60 backdrop-blur-md border border-white/40 focus:outline-none"
          >
            <option value="">All Years</option>
            {years.map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>

          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="p-3 rounded-xl bg-white/60 backdrop-blur-md border border-white/40 focus:outline-none"
          >
            <option value="">All Departments</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
        </div>

        {/* Grid */}
        {loading ? (
          <p className="text-gray-600">Loading directory...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAlumni.map((person) => (
              <div
                key={person._id}
                className="bg-white/70 backdrop-blur-lg border border-white/50 rounded-2xl shadow-lg p-6 hover:translate-y-[-4px] transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={
                      person.profileImage
                        ? `http://localhost:5000/uploads/${person.profileImage}`
                        : `https://ui-avatars.com/api/?name=${encodeURIComponent(person.name)}&background=random`
                    }
                    alt={person.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-sm"
                  />
                  <div>
                    <h3 className="font-bold text-gray-800 text-lg">{person.name}</h3>
                    <p className="text-sm text-indigo-600 font-medium">
                      {person.department || "General"}
                    </p>
                  </div>
                </div>

                <div className="text-sm text-gray-500 space-y-1">
                  <p><span className="font-medium">Batch:</span> {person.graduationYear || "N/A"}</p>
                </div>

                <button
                  onClick={() => window.location.href = `mailto:${person.email}`}
                  className="mt-5 w-full bg-indigo-600 text-white py-2.5 rounded-xl font-medium hover:bg-indigo-700 active:scale-95 transition-all shadow-md"
                >
                  Send Message
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredAlumni.length === 0 && (
          <div className="text-center py-20">
            <p className="text-xl text-gray-500">No alumni found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Directory;