import { useEffect, useState } from "react";
const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

    useEffect(() => {
    fetch("http://localhost:5000/api/projects")
      .then((res) => res.json())
      .then((data) => {
        setProjects(Array.isArray(data) ? data : []);
      }
        ).catch((err) => {
        console.error("Failed to fetch projects:", err);
        setProjects([]);
      }).finally(() => setLoading(false));
    }, []);
    return (
        <div className="h-screen bg-cover bg-center relative" style={{ backgroundImage: "url('/img.jpg')" }}>
        <div className="absolute inset-0 bg-white/30 backdrop-blur-sm" />
        <div className="container mx-auto relative z-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Alumni Projects</h2>
            {loading ? (
                <div className="text-center text-gray-600">Loading projects...</div>
            ) : projects.length === 0 ? (
                <div className="text-center text-gray-600">No projects found.</div>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {projects.map((project) => (
                        <div key={project.id} className="bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-md">
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">{project.title}</h3>
                            <p className="text-gray-700 mb-4">{project.description}</p>
                            <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">View Project</a>
                        </div>
                    ))}
                </div>
            )}
        </div>
       
        </div>
    );
}
export default Projects;
  