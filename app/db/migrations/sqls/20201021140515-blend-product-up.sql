/* Replace with your SQL commands */
CREATE TABLE IF NOT EXISTS blend_product(
    id SERIAL PRIMARY KEY,
    blend_product_id INT NOT NULL REFERENCES blend(id),
    product_name  VARCHAR(255) NOT NULL,
    specific_gravity NUMERIC(10, 2),
    visco_40 NUMERIC(10, 2),
    visco_100 NUMERIC(10, 2),
    ccs NUMERIC(10, 2),
    mrv  NUMERIC(10, 2),
    colour VARCHAR(100),
    aspect VARCHAR(100),
    foaming_24 NUMERIC(10, 2),
    foaming_93 NUMERIC(10, 2),
    foaming_24_after_93 NUMERIC(10, 2),
    base_number NUMERIC(10, 2),
    flash_point NUMERIC(10, 2),
    pour_point NUMERIC(10, 2),
    noack_volatility NUMERIC(10, 2),
    sulphated_ash NUMERIC(10, 2),
    ca NUMERIC(10, 2),
    zn NUMERIC(10, 2),
    p NUMERIC(10, 2),
    Mg NUMERIC(10, 2),
    date_sampled TIMESTAMP,
    date_reported TIMESTAMP ,
    date_received TIMESTAMP,
    source VARCHAR(100) NOT NULL,
    report_no VARCHAR(50)
);