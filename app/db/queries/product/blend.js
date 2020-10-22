export default {
  createBlendProduct: `
    INSERT INTO blend_product(
        blend_product_id, 
        product_name  ,
        specific_gravity,
        visco_40 ,
        visco_100 ,
        ccs,
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
        date_sampled TIMESTAMP,
        date_reported TIMESTAMP,
        date_received TIMESTAMP,
        source ,
        report_no 
    )   VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12,
        $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24)
    `,
};
