import React, { useState, useEffect } from 'react';

function Recipes() {
  const [recipes, setRecipes] = useState([]);


const fetchRecipes = () => {
  fetch('https://meal-builder-production.up.railway.app/api/recipes')
    .then(res => res.json())
    .then(data => setRecipes(data))
    .catch(err => console.error("Error fetching recipes:", err));
};
  // Function to delete a recipe from the database
  const deleteRecipe = (id) => {
    if (window.confirm("Are you sure? This will also remove the recipe from any meal plans.")) {
      fetch(`https://meal-builder-production.up.railway.app/api/recipes/${id}`, { 
        method: 'DELETE' 
      })
      .then(res => {
        if (res.ok) {
          fetchRecipes(); // Refresh the list after successful deletion
        }
      })
      .catch(err => console.error("Error deleting recipe:", err));
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <div className="container main-content">
      <h2 className="section-title">Recipe Library</h2>
      <div className="card-grid">
        {recipes.map(recipe => (
          <div key={recipe.recipe_id} className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <h4 className="card-title">{recipe.title}</h4>
              <p className="card-description">{recipe.category} • {recipe.prep_time_mins} mins</p>
            </div>
            
            {/* Delete button added here */}
            <button 
              onClick={() => deleteRecipe(recipe.recipe_id)} 
              style={{
                marginTop: '15px', 
                padding: '8px', 
                backgroundColor: 'transparent', 
                color: '#ef4444', 
                border: '1px solid #ef4444', 
                borderRadius: '6px', 
                cursor: 'pointer',
                fontSize: '0.85rem',
                fontWeight: '600'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#fee2e2'}
              onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
            >
              Delete Recipe
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Recipes;