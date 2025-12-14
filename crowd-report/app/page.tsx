export default function Home() {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center">
        <h1 className="glow-text text-5xl md:text-6xl font-bold mb-4">
          SafeRouteLK Portal
        </h1>
        <p className="text-xl text-gray-300">
          Futuristic Crowd Reporting System
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="cyber-card float-animation">
            <h3 className="glow-text text-xl font-bold mb-3">Report #{i}</h3>
            <p className="text-gray-300">
              This is a futuristic report card with glowing effects.
            </p>
            <button className="neon-button mt-4">
              View Details
            </button>
          </div>
        ))}
      </div>

      {/* Stats */}
      <div className="cyber-card">
        <h2 className="glow-text text-2xl font-bold mb-4">Live Stats</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-500">156</div>
            <div className="text-gray-400">Reports</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-500">89</div>
            <div className="text-gray-400">Verified</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-500">1,245</div>
            <div className="text-gray-400">Users</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-cyan-500">15min</div>
            <div className="text-gray-400">Avg Response</div>
          </div>
        </div>
      </div>
    </div>
  );
}