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
    
    this.analysis = options.analysis,
    this.category = options.category;
  }

  /**
   * @returns { ProductTest } - An instance of the ProductTest Model.
   * @memberof BlendProduct
   */
  async save() {
    try {
      const productTestQuery = [];
      const categoryTestQuery = [];
      return db.tx(async (t) => {
       this.analysis.map(({ method, test, unit }) =>{
        const id = Helper.generateId();

          productTestQuery.push(t.any(createProductTest, [id, method, test, unit]))
   
          this.category.map(({ categoryId }) => {
          const catId = Helper.generateId();
          categoryTestQuery.push(t.any(createCategoryTest, [catId, categoryId, id]));
        });

      });

       const result = await Promise.all([productTestQuery, categoryTestQuery]);
      });
    } catch (error) {

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
