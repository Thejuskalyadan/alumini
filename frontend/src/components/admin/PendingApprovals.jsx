import { useEffect, useState } from "react";

function PendingApprovals() {
  const [users, setUsers] = useState([]);

  // ✅ Fetch Pending Users
  const fetchPendingUsers = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/pending");
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.log("Error fetching pending users", err);
    }
  };

  useEffect(() => {
    fetchPendingUsers();
  }, []);

  // ✅ Approve User
  const approveUser = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/auth/approve/${id}`, {
        method: "PUT",
      });

      fetchPendingUsers(); // refresh 🔥
    } catch (err) {
      console.log("Approval failed", err);
    }
  };

  // ✅ Reject User ❌
  const rejectUser = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/auth/reject/${id}`, {
        method: "DELETE",
      });

      fetchPendingUsers(); // refresh 🔥
    } catch (err) {
      console.log("Rejection failed", err);
    }
  };

 return (
   <div>
     <h2 className="text-2xl font-semibold mb-6 text-gray-800">
       Pending Approvals
     </h2>

     {users.length === 0 ? (
       <div className="bg-white/40 backdrop-blur-md p-6 rounded-xl shadow text-gray-600 text-center">
         No pending approvals 🙂
       </div>
     ) : (
       <div className="space-y-4">
         {users.map((user) => (
           <div
             key={user._id}
             className="bg-white/40 backdrop-blur-xl p-5 rounded-2xl shadow flex justify-between items-center transition-all duration-300 hover:bg-white/60 hover:shadow-lg hover:scale-[1.01]"
           >
             {/* ✅ LEFT SECTION */}
             <div className="flex items-center gap-4">
               {/* ✅ Avatar Circle 🔥 */}
               <div className="w-10 h-10 rounded-full bg-indigo-500 text-white flex items-center justify-center font-medium">
                 {user.name?.charAt(0).toUpperCase()}
               </div>

               {/* ✅ User Info */}
               <div>
                 <div className="flex items-center gap-2">
                   <p className="font-medium text-gray-800">{user.name}</p>

                   {/* ✅ Badge ✨ */}
                   <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full">
                     Pending
                   </span>
                 </div>

                 <p className="text-sm text-gray-600">{user.email}</p>

                 <p className="text-xs text-gray-500">
                   {user.department} • {user.graduationYear}
                 </p>
               </div>
             </div>

             {/* ✅ RIGHT SECTION */}
             <div className="flex gap-3">
               <button
                 onClick={() => approveUser(user._id)}
                 className="bg-green-500 text-white px-4 py-2 rounded-xl hover:bg-green-600 transition-all shadow-sm hover:shadow-md active:scale-[0.97]"
               >
                 Approve
               </button>

               <button
                 onClick={() => rejectUser(user._id)}
                 className="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 transition-all shadow-sm hover:shadow-md active:scale-[0.97]"
               >
                 Reject
               </button>
             </div>
           </div>
         ))}
       </div>
     )}
   </div>
 );
}
export default PendingApprovals;
