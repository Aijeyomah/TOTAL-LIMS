import db, { redisDB } from '../db';
import query from '../db/queries/product';
import { Helper, constants, DBError } from '../utils';

const { REDIS_KEYS: { blendProduct, blendProducts: blendProductKey } } = constants;
const { createProductTest, createCategoryTest } = query;

/**
 * Contains a schema that describes the product test resource on the app.
 * @class ProductTest
 *
 */
class ProductTestModel {
  /**
   *Creates an instance of productModel.
   * @param {object} options
   * @memberof BlendProduct
   */
  constructor(options) {
    this.id = Helper.generateId(),
    this.analysis = options.analysis,
    this.category = options.category;
  }

  /**
   * @returns { ProductTest } - An instance of the ProductTest Model.
   * @memberof BlendProduct
   */
  async save() {
    try {
      return db.tx(async (t) => {
        const ProductTest = this.analysis.map(({ method, test, unit }) => t.any(createProductTest, [this.id, method, test, unit]));
        const categoryTest = this.category.map(({ categoryId }) => {
          const catId = Helper.generateId();
          t.any(createCategoryTest, [catId, categoryId, this.id]);
        });
        await Promise.all([ProductTest, categoryTest]);
      });
    } catch (error) {
      console.log(e);

      const dbError = new DBError({
        message: error.message,
        status: 400,

      });
      Helper.moduleErrLogMessager(dbError);
      throw dbError;
    }
  }
}

export default ProductTestModel;
