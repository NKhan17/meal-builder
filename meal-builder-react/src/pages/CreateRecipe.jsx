import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CreateRecipe() {
  const [formData, setFormData] = useState({ 
    title: '', 
    prep_time_mins: '', 
    servings: '', 
    category: 'Dinner' 
  });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Connects to the POST route in your server.js
    fetch('http://localhost:3000/api/recipes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
    .then(res => {
        if (!res.ok) throw new Error("Server error");
        return res.json();
    })
    .then(() => {
      // Navigate to the list only AFTER the database update is successful
      navigate('/recipes'); 
    })
    .catch(err => console.error("Error saving recipe:", err));
  };

  return (
    <div className="container main-content">
      <h2 className="section-title">Add New Recipe to Database</h2>
      <form className="card" onSubmit={handleSubmit} style={{maxWidth: '500px', display: 'flex', flexDirection: 'column', gap: '1rem'}}>
        <input 
          type="text" 
          placeholder="Recipe Title" 
          className="summary-item"
          required 
          onChange={(e) => setFormData({...formData, title: e.target.value})} 
        />
        <input 
          type="number" 
          placeholder="Prep Time (mins)" 
          required 
          onChange={(e) => setFormData({...formData, prep_time_mins: e.target.value})} 
        />
        <input 
          type="number" 
          placeholder="Servings" 
          required 
          onChange={(e) => setFormData({...formData, servings: e.target.value})} 
        />
        <select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}>
          <option value="Breakfast">Breakfast</option>
          <option value="Lunch">Lunch</option>
          <option value="Dinner">Dinner</option>
          <option value="Snack">Snack</option>
        </select>
        <button type="submit" className="start-cooking-btn">Save to Library</button>
      </form>
    </div>
  );
}

export default CreateRecipe;