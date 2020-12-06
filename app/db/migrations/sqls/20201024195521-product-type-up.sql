CREATE TYPE p_types AS ENUM ('Blend', 'Base oil', 'Additive');

CREATE TABLE IF NOT EXISTS products_cat(
    id SERIAL PRIMARY KEY,
    product_type p_types NOT NULL
);