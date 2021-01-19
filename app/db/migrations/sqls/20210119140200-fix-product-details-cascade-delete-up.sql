ALTER TABLE product_result_details
DROP CONSTRAINT 
    product_result_details_product_id_fkey,
ADD CONSTRAINT 
    product_result_details_product_id_fkey 
FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE CASCADE;