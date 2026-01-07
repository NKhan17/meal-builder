import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Dashboard() {
  const [stats, setStats] = useState({ total_recipes: 0 }); // Initialized to 0
  const [statsText, setStatsText] = useState("Click to load your current recipe count...");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [todayDate, setTodayDate] = useState("");

  useEffect(() => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    setTodayDate(new Date().toLocaleDateString('en-US', options));
  }, []);

  const triggerAlert = (msg) => {
    setAlertMsg(msg);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  // STEP 4: TIMER LOGIC
  const startTimer = (minutes) => {
    let seconds = minutes * 60;
    triggerAlert(`Timer started for ${minutes} minutes!`);
    
    const interval = setInterval(() => {
      seconds--;
      if (seconds <= 0) {
        clearInterval(interval);
        triggerAlert("Time's up! Your Classic Chicken Curry is ready! 🍲");
      }
    }, 1000);
  };

  const loadUserStats = () => {
    setStatsText("Fetching from Backend...");
    fetch('http://localhost:3000/api/stats')
      .then(res => res.json())
      .then(data => {
        setStats(data);
        setStatsText(`You have ${data.total_recipes} recipes!`);
        triggerAlert("Data synced with MySQL Database!");
      })
      .catch(() => {
        setStatsText("Database Error");
        triggerAlert("Check if your Node server is running.");
      });
  };

  return (
    <main className="container main-content">
      <section className="welcome-section">
        <h2 className="text-3xl font-extrabold text-gray-900">Welcome back, Chef!</h2>
        <p className="text-gray-500 mt-1">Last active: {new Date().toLocaleTimeString()} today.</p>
      </section>

      <section className="quick-actions-section">
        <h3 className="section-title">Quick Actions</h3>
        <div className="card-grid">
          {/* STEP 3: FUNCTIONAL NAVIGATION LINKS */}
          <Link to="/create-recipe" className="card" style={{ textDecoration: 'none' }}>
            <h4 className="card-title">Create New Recipe</h4>
            <p className="card-description">Start building from scratch.</p>
          </Link>

          <Link to="/planner" className="card" style={{ textDecoration: 'none' }}>
            <h4 className="card-title">View Weekly Planner</h4>
            <p className="card-description">Review upcoming meals.</p>
          </Link>
          
          <div className="card stats-card" onClick={loadUserStats}>
            <h4 className="card-title">Analyze Statistics</h4>
            <p className="card-description">{statsText}</p>
          </div>
        </div>
      </section>

      <section className="overview-grid">
        <div className="card meal-plan-card">
          <h3 className="section-title">Today's Meal Plan <span className="date-highlight">{todayDate}</span></h3>
          <div className="meal-card-content">
             <img 
               src="/chickencurry.jpeg" 
               alt="Curry" 
               onError={(e) => { e.target.src = 'https://placehold.co/128x128?text=Curry'; }} 
             />
             <div className="meal-details">
                <h4 className="meal-title">Classic Chicken Curry</h4>
                {/* STEP 4: FUNCTIONAL START COOKING BUTTON */}
                <button className="start-cooking-btn" onClick={() => startTimer(15)}>
                  Start Cooking
                </button>
             </div>
          </div>
        </div>

        <div className="card summary-card">
          <h3 className="section-title">Your Library Summary</h3>
          <div className="summary-details">
            <div className="summary-item">
              <span>Total Recipes:</span>
              <span className="summary-value text-primary-value">{stats.total_recipes}</span>
            </div>
          </div>
        </div>
      </section>

      <div id="custom-alert" className={showAlert ? "show" : ""}>{alertMsg}</div>
    </main>
  );
}

export default Dashboard;