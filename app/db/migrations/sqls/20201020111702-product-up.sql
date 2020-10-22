/* Replace with your SQL commands */
CREATE TYPE types AS ENUM ('Blend', 'Base oil', 'Addictive');

CREATE TABLE IF NOT EXISTS products(
    id SERIAL PRIMARY KEY,
    product_type types NOT NULL,
    product_name VARCHAR(100)
);