import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import AdminDashboard from "./components/admin/AdminDashboard";
import UsersManagement from "./components/admin/UsersManagement";
import AdminAnnouncements from "./components/admin/AdminAnnouncements";
import Announcements from "./components/Announcements";
import Directory from "./components/Directory";
function App() {
  return (
    <Router>
      <Routes>
        {/* ✅ Default Route */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Announcements />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/users" element={<UsersManagement />} />
        <Route path="/admin/announcements" element={<AdminAnnouncements />} />
        <Route path="/directory" element={<Directory />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
