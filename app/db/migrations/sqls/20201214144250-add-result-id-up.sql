/* Replace with your SQL commands */
DROP TABLE product_test_result CASCADE ;
DROP TABLE product_result_details;

CREATE TABLE IF NOT EXISTS product_result_details(
    id VARCHAR(100) PRIMARY KEY,
    remark VARCHAR(100) NOT NULL,
    source VARCHAR(100) NOT NULL,
    date_received TIMESTAMP NOT NULL,
    date_sampled TIMESTAMP NOT NULL,
    date_reported TIMESTAMPTZ DEFAULT NOW(),
    report_no VARCHAR(100)  NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS product_test_result(
    id VARCHAR(100) PRIMARY KEY,
    product_id VARCHAR(100) REFERENCES products(id),
    product_result_id VARCHAR(100) REFERENCES product_result_details(id) ON DELETE CASCADE,
    test_id VARCHAR(100) REFERENCES product_tests(id)  NOT NULL,
    product_spec_result VARCHAR(100)  NOT NULL
);



