CREATE TYPE pr_types AS ENUM ('Blend', 'Base oil', 'Additive');

CREATE TABLE IF NOT EXISTS products_cat(
    id SERIAL PRIMARY KEY,
    product_type pr_types NOT NULL
);