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
  
    // createProductSpecification: (keys, constructValues) => {
    //     `INSERT INTO table(${keys.join(",")}) VALUES` + constructValues;
    // },
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
                        -- test.test_name,
						spec.product_spec
					FROM
						product_specification spec
						INNER JOIN product_tests test ON test.id = spec.test_id
					WHERE
						spec.product_id = products.id) AS spec_res))
		FROM
            products
        WHERE
            category_id = $1
        
    `,
  getAllProductById: `
        SELECT 
            * 
        FROM 
            products 
        WHERE
            id = $1
    
    `,
  editProductName: `
        UPDATE 
            products
        SET 
            product_name = $1
        WHERE 
            id = $1
        RETURNING *
    `,
  
  editProductSpec: `
        UPDATE
            product_specification
        SET
            product_spec = $1
        WHERE
            product_id = $2
        AND
            spec_id = $3
        RETURNING *    
    `,
    deleteProduct: `
        DELETE FROM
            products
        WHERE 
            id = $1
    `,
  checkIfTestBelongsToProduct: `
       SELECT 
            *
        FROM 
            product_specification
        WHERE
            spec_id = $1 
    `,
  getAllCategory: `
        SELECT 
            *
        FROM 
            products_cat
    `,
  
  searchProductsQuery: `
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
                        -- test.test_name,
						spec.product_spec
					FROM
						product_specification spec
						INNER JOIN product_tests test ON test.id = spec.test_id
					WHERE
						spec.product_id = products.id) AS spec_res))
		FROM
            products
        WHERE
            category_id = $1
        AND 
        (
            products.product_name ILIKE $2
            OR
            products.created_at::text ILIKE $3
        )
    `,
    insertAnalysisResult: `INSERT INTO product_test_result(
        id, 
        product_id,
        test_id,
        product_spec_result
    )VALUES($1, $2, $3, $4) RETURNING *
    `,
    insertAnalysisResultDetails: `
        id,
        product_result_id,
        remark,
        source,
        date_received,
        date_sampled,
        report_no
    )VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *
    `,
  

}
