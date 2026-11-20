
import { useEffect, useState } from "react";

function App() {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [activeTab, setActiveTab] = useState("discover");
const [matches, setMatches] = useState([]);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await fetch("http://localhost:5000/feed");
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch profiles");
        }

        setProfiles(data.profiles);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  const handleSwipe = async (targetId, action) => {
    try {
      setMessage("");

      const response = await fetch("http://localhost:5000/swipe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ targetId, action }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Swipe failed");
      }

      setProfiles((currentProfiles) =>
        currentProfiles.filter((profile) => profile._id !== targetId)
      );

      if (data.matched) {
        setMessage("❤️ It's a match!");
      } else {
        setMessage(
          action === "like" ? "You liked this profile!" : "Profile passed."
        );
      }
    } catch (err) {
      setMessage(err.message);
    }
  };

  const fetchMatches = async () => {
  try {
    const response = await fetch("http://localhost:5000/matches");
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch matches");
    }

    setMatches(data.matches);
  } catch (err) {
    setMessage(err.message);
  }
};

  if (loading) return <h2>Loading profiles...</h2>;
  if (error) return <h2>Error: {error}</h2>;

  const currentProfile = profiles[0];

  

return (
  <div className="app">
    <h1 className="logo">
      coy<span>❤️</span>
    </h1>

    <nav className="tabs">
      <button
        className={activeTab === "discover" ? "active" : ""}
        onClick={() => setActiveTab("discover")}
      >
        Discover
      </button>

      <button
        className={activeTab === "matches" ? "active" : ""}
        onClick={() => {
          setActiveTab("matches");
          fetchMatches();
        }}
      >
        Matches
      </button>
    </nav>

    {message && <h3>{message}</h3>}

    {activeTab === "discover" ? (
      <>
        <h2>Discover People</h2>

        {currentProfile ? (
          <div className="profile-card">
            <img
              className="profile-image"
              src={currentProfile.image}
              alt={currentProfile.name}
            />

            <h2>
              {currentProfile.name}, {currentProfile.age}
            </h2>

            <p>{currentProfile.bio}</p>

            <p>{currentProfile.interests.join(" • ")}</p>

            <div className="actions">
              <button
                className="pass-btn"
                onClick={() => handleSwipe(currentProfile._id, "pass")}
              >
                ✕
              </button>

              <button
                className="like-btn"
                onClick={() => handleSwipe(currentProfile._id, "like")}
              >
                ♥
              </button>
            </div>
          </div>
        ) : (
          <h2>No more profiles to discover!</h2>
        )}
      </>
    ) : (
      <>
        <h2>Your Matches ❤️</h2>

        {matches.length > 0 ? (
          matches.map((match) => (
            <div className="profile-card" key={match._id}>
              <img
                src={match.image}
                alt={match.name}
                width="120"
                style={{ borderRadius: "50%" }}
              />
              <h3>{match.name}, {match.age}</h3>
              <p>{match.bio}</p>
            </div>
          ))
        ) : (
          <p>No mutual matches yet. Keep discovering!</p>
        )}
      </>
    )}
  </div>
);
}
export default App
