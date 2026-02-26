import { useState, useEffect } from "react";

const AdminAnnouncements = () => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [type, setType] = useState("bulletin");
  const [image, setImage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null); // ⭐ ADD THIS
  const [announcements, setAnnouncements] = useState([]);

  // ✅ Fetch announcements
  const fetchAnnouncements = () => {
    fetch("http://localhost:5000/api/announcements")
      .then((res) => res.json())
      .then((data) => setAnnouncements(data));
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

const handleSubmit = async () => {
  if (!title || !message) {
    alert("Fill all fields ");
    return;
  }

  if (type === "poster" && !selectedFile) {
    alert("Please upload an image ");
    return;
  }

  const formData = new FormData();
  formData.append("title", title);
  formData.append("message", message);
  formData.append("type", type);

  if (selectedFile) {
    formData.append("image", selectedFile);
  }

  await fetch("http://localhost:5000/api/announcements", {
    method: "POST",
    body: formData,
  });

  alert("Announcement Posted 🚀");

  setTitle("");
  setMessage("");
  setSelectedFile(null);

  fetchAnnouncements();
};

  // ✅ Delete announcement
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this announcement?")) return;

    await fetch(`http://localhost:5000/api/announcements/${id}`, {
      method: "DELETE",
    });

    fetchAnnouncements(); // Refresh UI
  };

  return (
    <div className="text-black space-y-6">
      <h2 className="text-xl font-semibold">Create Announcement</h2>

      {/* ✅ FORM (UNCHANGED STYLE) */}
      <div className="bg-white/30 backdrop-blur-md border border-white/30 rounded-xl p-4 shadow">
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full p-2 rounded-lg bg-white/50 border border-white/30 mb-3"
        >
          <option value="bulletin">Bulletin Bar</option>
          <option value="poster">Poster</option>
          <option value="text">Text Notice</option>
        </select>

        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 rounded-lg bg-white/50 border border-white/30 mb-3"
        />

        <textarea
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full p-2 rounded-lg bg-white/50 border border-white/30 mb-3 resize-none h-20"
        />

        {type === "poster" && (
          <div className="mb-3">
            <label className="text-sm font-medium">Upload Poster</label>

            <input
              type="file"
              onChange={(e) => setSelectedFile(e.target.files[0])}
              className="w-full p-2 rounded-lg bg-white/50 border border-white/30"
            />
          </div>
        )}
        <button
          onClick={handleSubmit}
          className="bg-indigo-500/70 text-white px-4 py-2 rounded-lg"
        >
          Post Announcement
        </button>
      </div>

      {/* ✅ VIEW ANNOUNCEMENTS */}
      <h2 className="text-xl font-semibold">Manage Announcements</h2>

      <div className="space-y-3 max-h-64 overflow-y-auto">
        {announcements.map((a) => (
          <div
            key={a._id}
            className="bg-white/30 backdrop-blur-md border border-white/30 rounded-lg p-3 shadow flex justify-between items-center"
          >
            <div className="flex gap-3 items-center">
              {/* ✅ ⭐ POSTER PREVIEW ⭐ */}
              {a.type === "poster" && a.image && (
                <img
                  src={`http://localhost:5000/uploads/${a.image}`}
                  alt="poster"
                  className="w-16 h-16 object-cover rounded-lg shadow"
                />
              )}

              <div>
                <h3 className="font-semibold">{a.title}</h3>
                <p className="text-sm text-gray-700">{a.message}</p>
                <span className="text-xs text-indigo-600">{a.type}</span>
              </div>
            </div>

            <button
              onClick={() => handleDelete(a._id)}
              className="text-red-500 hover:text-red-700"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminAnnouncements;
