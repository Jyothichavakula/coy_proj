import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [activeTab, setActiveTab] = useState("home");
const [matches, setMatches] = useState([]);

const [swipeDirection, setSwipeDirection] = useState("");

const touchStartX = useRef(null);

const handleTouchStart = (e) => {
  touchStartX.current = e.changedTouches[0].screenX;
};

const handleTouchEnd = (e) => {
  if (touchStartX.current === null) return;

  const touchEndX = e.changedTouches[0].screenX;
  const difference = touchEndX - touchStartX.current;

  if (difference > 100) {
    // Swipe right = Like
    if (profiles[0]) {
      handleSwipe(profiles[0]._id, "like");
    }
  } else if (difference < -100) {
    // Swipe left = Pass
    if (profiles[0]) {
      handleSwipe(profiles[0]._id, "pass");
    }
  }

  touchStartX.current = null;
};

const fetchProfiles = async () => {
  try {
    setLoading(true);
    setError("");

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

useEffect(() => {
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

     // Start directional swipe animation
setSwipeDirection(action === "like" ? "right" : "left");

// Remove the profile after the animation finishes
setTimeout(() => {
  setProfiles((currentProfiles) =>
    currentProfiles.filter((profile) => profile._id !== targetId)
  );

  setSwipeDirection("");
}, 350);
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
    className={activeTab === "home" ? "active" : ""}
    onClick={() => setActiveTab("home")}
  >
    Home
  </button>

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

    {activeTab === "discover" && (
      <>
        {message && <h3>{message}</h3>}

        <h2>Discover People</h2>

        {currentProfile ? (
          <div
  className={`profile-card ${
    swipeDirection ? `swipe-${swipeDirection}` : ""
  }`}
  onTouchStart={handleTouchStart}
  onTouchEnd={handleTouchEnd}
>
            <img
              className="profile-image"
              src={currentProfile.image}
              alt={currentProfile.name}
            />

            <h2>{currentProfile.name}, {currentProfile.age}</h2>

            <p>{currentProfile.bio}</p>
            <p>📍 {currentProfile.city}</p>
            <p>🎓 {currentProfile.college}</p>
            <p>{currentProfile.interests.join(" • ")}</p>

            <div className="actions">
              <button
                className="pass-btn"
                onClick={() => handleSwipe(currentProfile._id, "pass")}
              >
                ❌
              </button>

              <button
                className="like-btn"
                onClick={() => handleSwipe(currentProfile._id, "like")}
              >
                ❤️
              </button>
            </div>
          </div>
        ) : (
         <div className="empty-state">
  <div className="empty-heart">💗</div>
  <h2>You're all caught up!</h2>
  <p>
    You've discovered everyone for now.
    Come back later to meet new people!
  </p>
 <button
  onClick={() => {
    setActiveTab("discover");
    fetchProfiles();
  }}
>
  Refresh Discover
</button>
</div>
        )}
      </>
    )}

    {activeTab === "matches" && (
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
