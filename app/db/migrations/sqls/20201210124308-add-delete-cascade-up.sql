ALTER TABLE
    product_specification
DROP CONSTRAINT 
    product_specification_product_id_fkey,
ADD CONSTRAINT 
    product_specification_product_id_fkey 
FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE CASCADE;