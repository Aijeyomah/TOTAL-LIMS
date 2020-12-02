import db, {redisDB} from '../db';
import query from '../db/queries/product';
import { Helper, constants, DBError } from '../utils';

const { REDIS_KEYS: {blendProduct, blendProducts: blendProductKey}} = constants;
const { createProduct, createProductSpecification } = query;

/**
 * Contains a schema that describes the product test resource on the app.
 * @class ProductModel
 *
 */
        
   
         
class ProductModel {
   

  /**
   *Creates an instance of productModel.
   * @param {object} options
   * @memberof ProductModel
   */
    constructor(options) {
        this.id = Helper.generateId(),
        //this.spec_id = Helper.generateId(), 
        this.product_name = options.productName,
        this.category_id = options.categoryId,
        this.specification = options.specification
    
  }

  /**
   * @returns { ProductTest } - An instance of the ProductTest Model.
   * @memberof BlendProduct
   */
  async save() {
    
      try {
          return db.tx(async(t) => {
            await t.one(createProduct, [this.id, this.category_id, this.product_name]);
            const productSpec = this.specification.map(
            ({  testId,
                productSpec
              }) => {
                const spec_id = Helper.generateId();
                t.none(createProductSpecification, [
                spec_id,
                this.id,
                testId,
                productSpec
              ]); 
                
            })
            await Promise.all(productSpec);  
        })
        
     
      } catch (error) {
        const dbError = new DBError({
        message: error.message,
        status: 400,
        
      });
      Helper.moduleErrLogMessager(dbError);
      throw dbError;
    }
  }
};

export default ProductModel;
