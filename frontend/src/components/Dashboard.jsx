import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
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
    <div className="min-h-screen flex items-center justify-center bg-slate-100 p-6">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-lg">
        <h1 className="text-2xl font-semibold text-slate-800 mb-2">Dashboard</h1>
        <p className="text-slate-600 mb-6">
          Welcome{user?.name ? `, ${user.name}` : ""}.
        </p>
        <button
          onClick={handleLogout}
          className="px-4 py-2 rounded-lg bg-slate-800 text-white hover:bg-slate-900 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
