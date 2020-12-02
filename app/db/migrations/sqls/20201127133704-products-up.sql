CREATE TABLE IF NOT EXISTS products (
    id VARCHAR(100) PRIMARY KEY,
    category_id INT REFERENCES products_cat(id) NOT NULL,
    product_name VARCHAR(100) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW()    
);

CREATE TABLE IF NOT EXISTS product_tests(
    id VARCHAR(100) PRIMARY KEY, 
    method VARCHAR(100) NOT NULL,
    test VARCHAR(100) NOT NULL,
    unit VARCHAR(50) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW()  
);

CREATE TABLE IF NOT EXISTS category_test(
    cat_test_id VARCHAR(100) PRIMARY KEY,
    category_id INT REFERENCES products_cat(id) NOT NULL,
    test_id VARCHAR(100) REFERENCES product_tests(id)  NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS product_specification(
    spec_id VARCHAR(100) PRIMARY KEY,
    product_id VARCHAR(100) REFERENCES products(id),
    test_id VARCHAR(100) REFERENCES product_tests(id)  NOT NULL,
    product_spec VARCHAR(100)  NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS product_test_result(
    id VARCHAR(100) PRIMARY KEY,
    product_id VARCHAR(100) REFERENCES products(id),
    test_id VARCHAR(100) REFERENCES product_tests(id)  NOT NULL,
    product_spec_result VARCHAR(100)  NOT NULL
);

CREATE TABLE IF NOT EXISTS product_result_details(
    id VARCHAR(100) PRIMARY KEY,
    product_result_id VARCHAR(100) REFERENCES product_test_result(id) ON DELETE CASCADE,
    remark VARCHAR(100) NOT NULL,
    source VARCHAR(100) NOT NULL,
    date_received TIMESTAMP NOT NULL,
    date_sampled TIMESTAMP NOT NULL,
    date_reported TIMESTAMPTZ DEFAULT NOW(),
    report_no VARCHAR(100)  NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

