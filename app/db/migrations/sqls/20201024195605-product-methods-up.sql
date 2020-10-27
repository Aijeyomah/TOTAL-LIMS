CREATE TABLE IF NOT EXISTS products_analysis(
    id SERIAL PRIMARY KEY,
    product_category INT NOT NULL REFERENCES products_cat(id),
    method VARCHAR NOT NULL,
    test VARCHAR NOT NULL,
    unit VARCHAR (50)

);