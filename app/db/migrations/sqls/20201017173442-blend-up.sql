CREATE TABLE IF NOT EXISTS blend(
    id SERIAL PRIMARY KEY,
    product_id INT REFERENCES products(id),
    test VARCHAR(100)[] NOT NULL,
    method VARCHAR(100)[] NOT NULL,
    specification VARCHAR(100)[]
);
