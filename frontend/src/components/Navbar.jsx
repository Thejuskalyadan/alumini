import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  
  // Initialize user state from localStorage
  const [user] = useState(() => {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  });

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user'); // Also clear user data
    navigate('/login');
  };

  return (
    <div>
     {/* Glass Overlay */}
     <div className="fixed top-4 left-0 w-full z-50 px-6" />

     {/* Main Content Wrapper */}
     <div className="relative z-10 w-full px-10 py-6 space-y-6">
       {/* Header */}
       <div className="flex items-center justify-between bg-white/70 backdrop-blur-md border border-white/30 rounded-2xl px-6 py-4 shadow-lg">
         {/* Left: Profile */}
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


        {/* Navigation Links */}
        <div className="flex items-center gap-8">
          <Link to="/directory" className="text-gray-600 hover:text-indigo-600 font-medium transition">
            Directory
          </Link>
            <Link to="/announcements" className="text-gray-600 hover:text-indigo-600 font-medium transition">
              Announcements
            </Link>
            <Link to="/projects" className="text-gray-600 hover:text-indigo-600 font-medium transition">
              Projects
            </Link>
          <Link to="/profile" className="text-gray-600 hover:text-indigo-600 font-medium transition">
            Profile
          </Link>
          
          <div className="h-6 w-[1px] bg-gray-300 mx-2"></div>

          {/* User Info & Logout */}
          <div className="flex items-center gap-4">
            {user && (
              <span className="text-sm text-gray-500 hidden md:block">
                Hi, {user.name.split(' ')[0]}
              </span>
            )}
            <button 
              onClick={handleLogout}
              className="bg-red-50 text-red-600 border border-red-200 px-4 py-1.5 rounded-lg text-sm font-semibold hover:bg-red-600 hover:text-white transition-all active:scale-95"
            >
              Logout
            </button>
          </div>
        </div>
</div>
      </div>
    </div>
  );
};

export default Navbar;