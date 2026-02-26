import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

 const handleSubmit = async (e) => {
   e.preventDefault();
   setError("");
   setLoading(true);

   try {
     const response = await fetch("http://localhost:5000/api/auth/login", {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
       },
       body: JSON.stringify({ email, password }),
     });

     const data = await response.json();

     if (!response.ok) {
       setError(data.message || "Login failed");
       return;
     }

     localStorage.setItem("token", data.token);
     localStorage.setItem("user", JSON.stringify(data.user));

     // ⭐ Only change is here
     if (data.user.role === "admin") {
       navigate("/admin");
     } else {
       navigate("/dashboard");
     }
   } catch (err) {
     setError("Unable to connect to server");
   } finally {
     setLoading(false);
   }
 };

  return (
    <div
      className="h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: "url('/img.jpg')" }}
    >
      {/* Soft Overlay */}
      <div className="absolute inset-0 bg-white/30 backdrop-blur-sm" />

      {/* Glass Card */}
      <div className="bg-white/30 backdrop-blur-xl p-8 rounded-2xl shadow-2xl w-full max-w-md border border-white/40 transition-all duration-500 hover:scale-[1.01]">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
          Alumni Login
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 bg-white/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
            required
          />

          {/* Password Field */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 bg-white/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent pr-10 transition"
              required
            />

            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-500 transition"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-500 text-white p-3 rounded-lg hover:bg-indigo-800 transition shadow-md hover:shadow-lg active:scale-[0.98]"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {error && (
          <p className="text-sm text-red-600 text-center mt-3">{error}</p>
        )}

        {/* Register Link */}
        <p className="text-sm text-center text-gray-600 mt-4">
          New user?{" "}
          <span
            className="text-indigo-800 cursor-pointer hover:underline"
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
