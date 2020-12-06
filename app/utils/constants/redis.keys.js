export default {
  REDIS_KEYS: {
    blendProducts: 'products',
    blendProduct: (productId) => `products:blendProduct${productId}`,
    blendProductResultKey: 'productsResult',
    blendProductResult: (productId) => `products:blendProductResult${productId}`
  },
};
