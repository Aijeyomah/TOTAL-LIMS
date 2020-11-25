export default {
  createBlendProduct: `
    INSERT INTO blend_product(
        id,
        blend_cat_id, 
        product_name ,
        specific_gravity,
        visco_40 ,
        visco_100 ,
        ccs,
        vi,
        mrv ,
        colour ,
        aspect,
        foaming_24,
        foaming_93 ,
        foaming_24_after_93 ,
        base_number ,
        flash_point ,
        pour_point ,
        noack_volatility ,
        sulphated_ash ,
        ca ,
        zn ,
        p ,
        Mg 
    )   VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12,
        $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23) RETURNING product_name
    `,
    inputBlendResult: `
    INSERT INTO blend_result(
        blend_cat_id, 
        product_name ,
        specific_gravity,
        visco_40 ,
        visco_100 ,
        ccs,
        vi,
        mrv ,
        colour ,
        aspect,
        foaming_24,
        foaming_93 ,
        foaming_24_after_93 ,
        base_number ,
        flash_point ,
        pour_point ,
        noack_volatility ,
        sulphated_ash ,
        ca ,
        zn ,
        p ,
        Mg , 
        source ,
        date_sampled ,
        remark,
        date_received ,
        date_reported ,
        updated_at ,
        report_No 
    )   VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12,
        $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, 
        $24, $25, $26, $27, $28, $29 ) RETURNING product_name
    `,
  fetchBlendProductByProductName: `
     SELECT * FROM 
        blend_product 
    WHERE 
        product_name = $1
    `,
  fetchBlendProductById: `
     SELECT * FROM 
        blend_product 
    WHERE 
        id = $1
    `,
  getAllBlendProduct: `
     SELECT * FROM 
        blend_product 
    `,
  updateBlendProduct: `
    UPDATE 
        blend_product
    SET
        specific_gravity = $1, visco_40 = $2, visco_100 = $3, ccs = $4, vi = $5,
        mrv = $6, colour = $7 ,aspect = $8, foaming_24 = $9, foaming_93 =$10,
        foaming_24_after_93 = $11 , base_number = $12 , flash_point = $13, pour_point = $14,
        noack_volatility = $15 , sulphated_ash = $16, ca = $17 ,zn = $18 ,p = $19 , Mg = $20
    WHERE
        id = $21
    RETURNING * 
    `,
  deleteBlendProductById: `
    DELETE FROM 
        blend_product  
    WHERE
        id = $1
    `,
  getAllBlendProduct: `
        SELECT
        * 
    FROM 
        blend_product 
    `,
  
};
