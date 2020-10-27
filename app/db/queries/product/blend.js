export default {
  createBlendProduct: `
    INSERT INTO blend_product(
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
        $13, $14, $15, $16, $17, $18, $19, $20, $21, $22) RETURNING product_name
    `,
  fetchBlendProductByProductName: `
     SELECT * FROM 
        blend_product 
    WHERE 
        product_name = $1
    `,
};
