import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Announcements from "./components/Announcements";
import Profile from "./components/Profile";
import Directory from "./components/Directory";
import Navbar from "./components/Navbar";
import Projects from "./components/Projects";
function App() {
  return (
    <Router>
      
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Navbar />
    <Routes>
  {/* The path MUST be lowercase and match your Navbar Links */}
 
  <Route path="/directory" element={<Directory />} />
  <Route path="/announcements" element={<Announcements />} />
  <Route path="/projects" element={<Projects />} />
  <Route path="/profile" element={<Profile />} />
  {/* Fallback for when no route matches */}
  <Route path="*" element={<div className="p-10">Page Not Found - Check your URL</div>} />
</Routes>
    </Router>
  );
}

export default App;
