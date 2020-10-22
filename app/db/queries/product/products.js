export default {
  create_product: `
    INSERT INTO products(
        product_type,
        product_name
    )VALUES($1, $2)
    `,

  create_blend: `
    INSERT INTO blends(
        product_id,
        test,
        method,
        specification
    )VALUES($1, $2, $3, $4)
    `

};
