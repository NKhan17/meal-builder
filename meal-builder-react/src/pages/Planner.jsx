import React, { useState, useEffect } from 'react';

function Planner() {
  const [plans, setPlans] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [selection, setSelection] = useState({ recipe_id: '', date: '', type: 'Dinner' });

  const refreshPlanner = () => {
    fetch('https://meal-builder-production.up.railway.app/api/meal-plans').then(res => res.json()).then(setPlans);
    fetch('https://meal-builder-production.up.railway.app/api/recipes').then(res => res.json()).then(setRecipes);
  };

  useEffect(() => { refreshPlanner(); }, []);

  const handleAddMeal = (e) => {
    e.preventDefault();
    fetch('https://meal-builder-production.up.railway.app/api/meal-plans', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        recipe_id: selection.recipe_id,
        planned_date: selection.date,
        meal_type: selection.type // This correctly sends Breakfast/Lunch/Dinner
      }),
    })
    .then(() => refreshPlanner()); 
  };

  // DELETE FUNCTION
  const deletePlan = (id) => {
    if (window.confirm("Remove this meal from your plan?")) {
      fetch(`https://meal-builder-production.up.railway.app/api/meal-plans/${id}`, { method: 'DELETE' })
        .then(() => refreshPlanner());
    }
  };

  return (
    <div className="container main-content">
      <h2 className="section-title">Weekly Meal Planner</h2>
      
      <form onSubmit={handleAddMeal} className="card" style={{marginBottom: '2rem', display: 'flex', gap: '10px', flexWrap: 'wrap'}}>
        <select required onChange={e => setSelection({...selection, recipe_id: e.target.value})}>
          <option value="">Choose Recipe</option>
          {recipes.map(r => <option key={r.recipe_id} value={r.recipe_id}>{r.title}</option>)}
        </select>
        <input type="date" required onChange={e => setSelection({...selection, date: e.target.value})} />
        
        {/* Added value attribute to sync state */}
        <select value={selection.type} onChange={e => setSelection({...selection, type: e.target.value})}>
          <option value="Breakfast">Breakfast</option>
          <option value="Lunch">Lunch</option>
          <option value="Dinner">Dinner</option>
        </select>
        <button type="submit" className="start-cooking-btn">Add to Schedule</button>
      </form>

      <div className="overview-grid">
        {plans.map(plan => (
          <div key={plan.plan_id} className="card" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <div>
              <span className="summary-label">{new Date(plan.planned_date).toLocaleDateString()}</span>
              <h4 className="card-title">{plan.title}</h4>
              <p className="text-primary-value"><strong>{plan.meal_type}</strong></p>
            </div>
            <button 
              onClick={() => deletePlan(plan.plan_id)} 
              style={{backgroundColor: '#fee2e2', color: '#ef4444', border: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer'}}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Planner;