import { useState } from "react";
import PendingApprovals from "./PendingApprovals";
import UsersManagement from "./UsersManagement";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminAnnouncements from "./AdminAnnouncements";
function AdminDashboard() {
  const [activePage, setActivePage] = useState("pending");

  const navigate = useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user || user.role !== "admin") {
      navigate("/login");
    }
  }, []);

  const renderContent = () => {
    switch (activePage) {
      case "pending":
        return <PendingApprovals />;
      case "users":
        return <UsersManagement />;
      case "announcements":
        return <AdminAnnouncements />;
      case "events":
        return <div>Events (Next Build)</div>;
      default:
        return <PendingApprovals />;
    }
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };
  return (
    <div
      className="h-screen flex bg-cover bg-center relative"
      style={{ backgroundImage: "url('/img.jpg')" }}
    >
      {/* ✅ Glass Overlay */}
      <div className="absolute inset-0 bg-white/30 backdrop-blur-sm" />

      {/* ✅ Sidebar */}
      <div className="w-64 bg-white/10 backdrop-blur-xl text-black p-5 relative shadow-2xl border-r border-white/20 flex flex-col">
        <h1 className="text-xl font-semibold mb-8">Admin Panel</h1>

        <nav className="space-y-3 flex-5">
          <div
            onClick={() => setActivePage("pending")}
            className="hover:bg-indigo-500/70 p-2 rounded cursor-pointer transition"
          >
            Pending Approvals
          </div>

          <div
            onClick={() => setActivePage("users")}
            className="hover:bg-indigo-500/70 p-2 rounded cursor-pointer transition"
          >
            Users
          </div>

          <div
            onClick={() => setActivePage("announcements")}
            className="hover:bg-indigo-500/70 p-2 rounded cursor-pointer transition"
          >
            Announcements
          </div>

          <div
            onClick={() => setActivePage("events")}
            className="hover:bg-indigo-500/70 p-2 rounded cursor-pointer transition"
          >
            Events
          </div>
        </nav>

        <div className="absolute bottom-5 left-5 right-5">
          <div
            onClick={handleLogout} // ⭐ THIS WAS MISSING
            className="hover:bg-red-500/70 p-2 rounded cursor-pointer transition border-t border-white/20 pt-4"
          >
            Logout
          </div>
        </div>
      </div>

      {/* ✅ Main Content */}
      <div className="flex-1 p-8 relative">
        <div className="bg-white/40 backdrop-blur-xl rounded-2xl p-6 shadow-xl">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
