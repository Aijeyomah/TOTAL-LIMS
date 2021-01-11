ALTER TABLE product_test_result
	DROP COLUMN product_id;

ALTER TABLE product_result_details
	ADD COLUMN product_id VARCHAR REFERENCES products(id);