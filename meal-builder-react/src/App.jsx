import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css';

// Import the pages you created
import Dashboard from './pages/Dashboard';
import Recipes from './pages/Recipes';
import Planner from './pages/Planner';
import CreateRecipe from './pages/CreateRecipe'; // ADD THIS LINE

function App() {
  return (
    <BrowserRouter basename="/meal-builder">
      <div className="App">
        <header className="header">
          <div className="container header-content">
            <h1 className="logo-title">
              <span className="logo-highlight">Meal</span>Builder
            </h1>

            <nav className="nav-desktop">
              <Link to="/">Dashboard</Link>
              <Link to="/recipes">Recipes</Link>
              <Link to="/planner">Planner</Link>
            </nav>
          </div>
        </header>

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/planner" element={<Planner />} />
          <Route path="/create-recipe" element={<CreateRecipe />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;