CREATE DATABASE IF NOT EXISTS meal_builder_db;
USE meal_builder_db;

CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    last_login DATETIME,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE recipes (
    recipe_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    prep_time_mins INT,
    servings INT,
    image_url VARCHAR(255),
    category VARCHAR(50)
);

CREATE TABLE meal_plans (
    plan_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    recipe_id INT,
    planned_date DATE,
    meal_type ENUM('Breakfast', 'Lunch', 'Dinner', 'Snack'),
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (recipe_id) REFERENCES recipes(recipe_id)
);

INSERT INTO users (username, last_login) VALUES ('Chef Neha', '2025-12-07 18:23:32');

INSERT INTO recipes (title, prep_time_mins, servings, category) VALUES 
('Classic Chicken Curry', 15, 4, 'Dinner'),
('Avocado Toast', 10, 1, 'Breakfast'),
('Quinoa Salad', 20, 2, 'Lunch');

INSERT INTO meal_plans (user_id, recipe_id, planned_date, meal_type) VALUES 
(1, 1, '2025-12-07', 'Dinner');

SHOW TABLES;

SELECT title, category FROM recipes;

SELECT category, COUNT(*) AS count
FROM recipes
GROUP BY category;

SELECT * FROM recipes
WHERE title LIKE '%Chicken%';


SELECT u.username, m.planned_date, r.title, r.prep_time_mins
FROM users u
JOIN meal_plans m ON u.user_id = m.user_id
JOIN recipes r ON m.recipe_id = r.recipe_id
ORDER BY m.planned_date;

SELECT title, prep_time_mins
FROM recipes
WHERE category = 'Dinner' AND prep_time_mins <= 20;

SELECT 
    COUNT(*) AS total_recipes,
    MIN(prep_time_mins) AS fastest_prep_time,
    MAX(prep_time_mins) AS longest_prep_time,
    AVG(prep_time_mins) AS average_prep_time
FROM recipes;

SELECT 
    m.planned_date, 
    m.meal_type, 
    r.title, 
    r.servings
FROM meal_plans m
JOIN recipes r ON m.recipe_id = r.recipe_id
ORDER BY m.planned_date ASC;
