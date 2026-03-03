import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Announcements = () => {
  
  const navigate = useNavigate();  

  const [announcements, setAnnouncements] = useState([]);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedPoster, setSelectedPoster] = useState(null);
  const user = JSON.parse(localStorage.getItem("user") || "null");

  useEffect(() => {
    fetch("http://localhost:5000/api/announcements")
      .then((res) => res.json())
      .then((data) => setAnnouncements(data));
  }, []);

  const bulletins = announcements.filter((a) => a.type === "bulletin");
  const posters = announcements.filter((a) => a.type === "poster");
  const texts = announcements.filter((a) => a.type === "text");

 return (
   <div
     className="h-screen bg-cover bg-center relative"
     style={{ backgroundImage: "url('/img.jpg')" }}
   >
     {/* Glass Overlay */}
     <div className="absolute inset-0 bg-white/30 backdrop-blur-sm" />

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

         {/* Right: Navigation */}
         <div className="flex items-center gap-4">
           <button
             onClick={() => navigate("/directory")}
             className="text-sm bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition"
           >
             Directory
           </button>

           <button
             onClick={() => {
               localStorage.clear();
               navigate("/login");
             }}
             className="text-sm bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
           >
             Logout
           </button>
         </div>
       </div>

       {/* Bulletin */}
       {bulletins.length > 0 && (
         <div
           onClick={() => setIsPaused(!isPaused)}
           className="bg-white/50 backdrop-blur-md border border-white/30 text-black p-3 rounded-xl shadow cursor-pointer overflow-hidden"
         >
           <div className="bulletin-wrapper">
             <div
               className={`bulletin-text ${isPaused ? "bulletin-paused" : ""}`}
             >
               {bulletins.map((b) => (
                 <span key={b._id} className="mr-12 text-base font-semibold">
                   {b.message}
                 </span>
               ))}
             </div>
           </div>
         </div>
       )}

       {/* Main Grid */}
       <div className="flex gap-6">
         {/* Text Notices */}
         <div className="w-1/4 bg-white/50 backdrop-blur-md border border-white/30 rounded-xl shadow p-4 text-black h-[70vh] overflow-y-auto">
           <h2 className="text-lg font-semibold mb-3">Updates</h2>

           {texts.length === 0 ? (
             <p className="text-sm text-gray-600">No updates yet</p>
           ) : (
             texts.map((t) => (
               <div key={t._id} className="mb-3 border-b border-white/30 pb-2">
                 <h3 className="text-base font-semibold">{t.title}</h3>
                 <p className="text-base text-gray-700">{t.message}</p>
               </div>
             ))
           )}
         </div>

         {/* Posters */}
         <div className="w-3/4 bg-white/50 backdrop-blur-md border border-white/30 rounded-xl shadow p-4 text-black h-[70vh] overflow-y-auto scroll-smooth">
           <h2 className="text-xl font-semibold mb-3">Announcements</h2>

           {posters.length === 0 ? (
             <p className="text-gray-600">No announcements available</p>
           ) : (
             <div className="grid grid-cols-2 gap-4">
               {posters.map((p) => (
                 <div
                   key={p._id}
                   onClick={() => setSelectedPoster(p)}
                   className="bg-white/40 backdrop-blur-md border border-white/30 rounded-lg shadow p-3 cursor-pointer hover:scale-[1.02] transition"
                 >
                   {p.image && (
                     <img
                       src={`http://localhost:5000/uploads/${p.image}`}
                       alt="poster"
                       className="rounded-lg mb-2 w-full h-40 object-cover"
                     />
                   )}

                   <h3 className="font-semibold">{p.title}</h3>
                   <p className="text-sm text-gray-700">{p.message}</p>
                 </div>
               ))}
             </div>
           )}
         </div>
       </div>

       {/* Modal */}
       {selectedPoster && (
         <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
           <div className="relative w-[90%] h-[90%] bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-6">
             <button
               onClick={() => setSelectedPoster(null)}
               className="absolute top-4 right-4 bg-red-500/70 text-white px-3 py-1 rounded-lg"
             >
               Close
             </button>

             <div className="h-full flex flex-col items-center justify-center text-white">
               {selectedPoster.image && (
                 <img
                   src={`http://localhost:5000/uploads/${selectedPoster.image}`}
                   alt="poster"
                   className="max-h-[80%] rounded-xl shadow-xl"
                 />
               )}

               <h2 className="text-2xl font-semibold mt-4">
                 {selectedPoster.title}
               </h2>

               <p className="text-lg text-white/80 mt-2">
                 {selectedPoster.message}
               </p>
             </div>
           </div>
         </div>
       )}
     </div>
   </div>
 );
};

export default Announcements;
