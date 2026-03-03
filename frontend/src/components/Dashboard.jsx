import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard(){
  const navigate = useNavigate();
  const user = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("user") || "null");
    } catch {
      return null;
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

 return (
  <div className="min-h-screen bg-slate-100">

    {/* Top Bar */}
    <div className="bg-white shadow-md px-8 py-4 flex items-center justify-between">

      {/* Left: Welcome */}
      <h1 className="text-xl font-semibold text-slate-800">
        Welcome{user?.name ? `, ${user.name}` : ""}
      </h1>

      {/* Right: Navigation */}
      <div className="flex items-center gap-6">

        <button
          onClick={() => navigate("/directory")}
          className="text-slate-700 hover:text-indigo-600 transition"
        >
          Directory
        </button>

        <button
          onClick={handleLogout}
          className="px-4 py-2 rounded-lg bg-slate-800 text-white hover:bg-slate-900 transition"
        >
          Logout
        </button>

      </div>
    </div>

    {/* Main Content */}
    {/* <div className="p-10">
      <h2 className="text-3xl font-semibold text-slate-800 mb-2">
        Dashboard
      </h2>
      <p className="text-slate-600">
        This is your alumni home page.
      </p>
    </div> */}

  </div>
);
}
export default Dashboard;
