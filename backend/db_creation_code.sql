DROP SCHEMA IF EXISTS public CASCADE;
CREATE SCHEMA public;
SET SEARCH_PATH = public;

CREATE TYPE DISH_TYPE AS ENUM ('starter', 'main_dish', 'dessert');
CREATE TYPE DIFFICULTY_LEVEL AS ENUM ('easy', 'medium', 'hard');

CREATE TABLE SK_User (      -- SK to avoid reserved pgsql keyword. SK for "Swiss kitchen"
  id        SERIAL PRIMARY KEY,
  username  VARCHAR(50) UNIQUE NOT NULL,
  email     VARCHAR(255) UNIQUE NOT NULL,
  password  VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);


CREATE TABLE Recipe (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  creator_user_id INT NOT NULL,
  description TEXT,
  dish_type DISH_TYPE NOT NULL,
  difficulty_level DIFFICULTY_LEVEL NOT NULL,
  FOREIGN KEY (creator_user_id) REFERENCES SK_User(id)
);


CREATE TABLE Step (
  related_recipe_id INT NOT NULL,
  step_number INT NOT NULL,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  estimated_time_in_seconds INT NOT NULL,
  FOREIGN KEY (related_recipe_id) REFERENCES Recipe(id) ON DELETE CASCADE,
  PRIMARY KEY (related_recipe_id, step_number)
);
