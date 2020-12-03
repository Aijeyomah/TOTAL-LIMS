export default {

   createProduct: `INSERT INTO products (
        id,
        category_id,
        product_name
    ) VALUES($1, $2, $3) RETURNING *`,
    
    createProductTest: `INSERT INTO product_tests (
        id,
        method,
        test,
        unit
    ) VALUES($1, $2, $3, $4) RETURNING *`,

    createCategoryTest: `INSERT INTO category_test(
        cat_test_id,
        category_id,
        test_id
    ) VALUES($1, $2, $3) RETURNING *`,

    createProductSpecification: `INSERT INTO product_specification(
        spec_id,
        product_id,
        test_id,
        product_spec
    ) VALUES($1, $2, $3, $4)`,

    insertProductAnalysisResult: `INSERT INTO product_test_result(
        id,
        product_id,
        test_id,
        product_spec_result,
        remark,
        source,
        date_received,
        date_sampled,
        report_no
    ) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,

    getProductTestByTest: `
        SELECT 
            * 
        FROM 
            product_tests
        WHERE
            test = $1
    
    `,
    getProductByProductName: `
        SELECT 
            * 
        FROM 
            products 
        WHERE
            product_name = $1
    
    `,
    getAllProductTest: `
        SELECT 
            test.id,
            test.test
        FROM
            product_tests test
        INNER JOIN 
            category_test ON test.id = category_test.test_id
        WHERE
            category_test.category_id = $1
    `,
    getAllProductAndSpec: `
        SELECT
	products.id,
	products.product_name,
	(
		SELECT
			(
				SELECT
					ARRAY_TO_JSON(ARRAY_AGG(ROW_TO_JSON(spec_res))) specification
				FROM (
					SELECT
						test.test,
						spec.product_spec
					FROM
						product_specification spec
						INNER JOIN product_tests test ON test.id = spec.test_id
					WHERE
						spec.product_id = products.id) AS spec_res))
		FROM
			products
    `
//get all product
// edit product
// delete product
// search for a product
    
       
};

