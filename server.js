const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors({
    origin: ["https://nkhan17.github.io", "http://localhost:3000"]
})); 
app.use(express.json()); 

// Database Connection using Railway Environment Variables
const db = mysql.createConnection({
    host: process.env.MYSQLHOST || 'localhost',
    user: process.env.MYSQLUSER || 'root',
    password: process.env.MYSQLPASSWORD || 'SQL123', 
    database: process.env.MYSQLDATABASE || 'railway', 
    port: process.env.MYSQLPORT || 3306
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to MySQL Database.');
});


app.get('/', (req, res) => {
    res.send('<h1>MealBuilder Backend is Live!</h1><p>Use <b>/api/recipes</b> to see data.</p>');
});


app.get('/api/recipes', (req, res) => {
    db.query('SELECT * FROM recipes', (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});


app.get('/api/stats', (req, res) => {
    const sql = 'SELECT COUNT(*) AS total_recipes, AVG(prep_time_mins) AS avg_prep FROM recipes';
    db.query(sql, (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results[0]);
    });
});

app.get('/api/recipes', (req, res) => {
    db.query('SELECT * FROM recipes', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});


app.get('/api/meal-plans', (req, res) => {
    const sql = `
        SELECT m.plan_id, m.planned_date, m.meal_type, r.title, r.category 
        FROM meal_plans m 
        JOIN recipes r ON m.recipe_id = r.recipe_id 
        ORDER BY m.planned_date ASC`;
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});
app.get('/api/meal-plans', (req, res) => {
    // SQL Query joining meal_plans and recipes as seen in your SQL file
    const sql = `
        SELECT m.plan_id, m.planned_date, m.meal_type, r.title, r.category 
        FROM meal_plans m 
        JOIN recipes r ON m.recipe_id = r.recipe_id 
        ORDER BY m.planned_date ASC`;
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});


app.post('/api/recipes', (req, res) => {
    const { title, prep_time_mins, servings, category } = req.body;
    const sql = 'INSERT INTO recipes (title, prep_time_mins, servings, category) VALUES (?, ?, ?, ?)';
    
    db.query(sql, [title, prep_time_mins, servings, category], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Database insertion failed" });
        }
        res.json({ message: 'Recipe created!', id: result.insertId });
    });
});
app.post('/api/meal-plans', (req, res) => {
    const { recipe_id, planned_date, meal_type } = req.body;
    // We use user_id 1 as a default since 'Chef Neha' is ID 1 in your SQL
    const sql = 'INSERT INTO meal_plans (user_id, recipe_id, planned_date, meal_type) VALUES (1, ?, ?, ?)';
    
    db.query(sql, [recipe_id, planned_date, meal_type], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Failed to schedule meal" });
        }
        res.json({ message: 'Meal planned successfully!' });
    });
});

app.delete('/api/recipes/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM recipes WHERE recipe_id = ?', [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Recipe deleted successfully" });
    });
});


app.delete('/api/meal-plans/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM meal_plans WHERE plan_id = ?', [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Plan removed successfully" });
    });
});
const PORT = process.env.PORT || 3000;


app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
>>>>>>> 281c0c5 (Production config)
