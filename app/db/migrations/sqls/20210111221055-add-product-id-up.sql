ALTER TABLE product_test_result
	DROP COLUMN IF EXISTS  product_id;

ALTER TABLE product_result_details
	ADD COLUMN IF NOT EXISTS product_id VARCHAR REFERENCES products(id);