ALTER TABLE 
    blend_result 
ADD COLUMN 
    blend_cat_id INT
REFERENCES 
    products_cat(id)