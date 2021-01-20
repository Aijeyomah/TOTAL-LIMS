import queries from "../../db/queries/product";
import db, { redisDB } from "../../db";
import { Helper, constants, DBError } from "../../utils";;

const { moduleErrLogMessager } = Helper;
const {
  FETCH_PRODUCT_FAIL,
  FETCH_CATEGORIES_FAIL,
  UPDATE_PRODUCT_FAIL,
  DELETE_PRODUCT_FAIL,
  FETCH_ANALYSIS_RESULT_FAIL
} = constants;
const {
  getAllProductAndSpec,
  getAllProductTest,
  getAllCategory,
  editProductName,
  editProductSpec,
  deleteProduct,
  searchProductsQuery,
  getProductAnalysisResult,
  createProductSpecification
} = queries;
/**
 * Contains a collection of service methods for managing the product resource on the app.
 *
 * @class ProductServices
 */
class ProductServices {
  /**
 *
 *
 * @static
 * @param {string} categoryId
 * @memberof ProductServices
 * @returns { Promise<object | Error> } A promise that resolves or rejects
   * with an Array of test and specification objects or a DB Error.
 */
  static async getAllTest(categoryId) {
    try {
      return await db.any(getAllProductTest, [categoryId]);
    } catch (e) {
      const dbError = new DBError({
        message: e.message,
        status: FETCH_PRODUCT_FAIL,
        errors: [],
      });
      moduleErrLogMessager(dbError);
      throw dbError;
    }
  }

  /**
     *
     *
     * @static
     * @memberof ProductServices
     * @returns { Promise<object | Error> } A promise that resolves or rejects
     * with an Array of product objects or a DB Error.
     */
  static async getAllProduct(categoryId) {
    try {
      return await db.any(getAllProductAndSpec, [categoryId]);
    } catch (e) {
      const dbError = new DBError({
        message: e.message,
        status: FETCH_PRODUCT_FAIL,
        errors: [],
      });
      moduleErrLogMessager(dbError);
      throw dbError;
    }
  }

  static async getAllProductCategory() {
    try {
      return await db.any(getAllCategory);
    } catch (e) {
      const dbError = new DBError({
        message: e.message,
        status: FETCH_CATEGORIES_FAIL,
        errors: [],
      });
      moduleErrLogMessager(dbError);
      throw dbError;
    }
  }

  static async editProductName(productName, id) {
    try {
      return await db.one(editProductName, [productName, id]);
    } catch (e) {
      const dbError = new DBError({
        message: e.message,
        status: UPDATE_PRODUCT_FAIL,
        errors: [],
      });
      moduleErrLogMessager(dbError);
      throw dbError;
    }
  }

  static async editProductSpec(reqData, ProductId) {
    try {
      const { productSpecification } = reqData;
      return db.tx(async t => {
        const product = productSpecification.map(async({ product_spec, spec_id, testId }) => {
          let result;
          if (!spec_id) {
            spec_id = Helper.generateId()
           result = await t.one(createProductSpecification, [spec_id, ProductId, testId, product_spec])
            
          }
           result = await t.one(editProductSpec, [product_spec, ProductId, spec_id, testId]);
          return result;
          
        });
        const data = await Promise.all(product);
        return data;
      });
    } catch (e) {
      const dbError = new DBError({
        message: e.message,
        status: UPDATE_PRODUCT_FAIL,
        errors: [],
      });
      moduleErrLogMessager(dbError);
      throw dbError;
    }
  }

  static async deleteProduct(id) {
    try {
      return await db.none(deleteProduct, [id]);
    } catch (e) {
      const dbError = new DBError({
        message: e.message,
        status: DELETE_PRODUCT_FAIL,
        errors: [],
      });
      moduleErrLogMessager(dbError);
      throw dbError;
    }
  }

  // refactor this code
  static async searchProduct(category_id, Product_name, created_at) {
    try {
      return await db.any(searchProductsQuery, [
        category_id,
        `%${Product_name}%`,
          `%${created_at}%`
      ]);
    } catch (e) {
      const dbError = new DBError({
        message: e.message,
        status: FETCH_PRODUCT_FAIL,
        errors: [],
      });
      moduleErrLogMessager(dbError);
      throw dbError;
    }
  }

  static async getAnalysisResult(productResultId) {
    try {
      return await db.any(getProductAnalysisResult, [ productResultId])
    } catch (e) {
      const dbError = new DBError({
        message: e.message,
        status: FETCH_ANALYSIS_RESULT_FAIL,
        errors: [],
      });
      moduleErrLogMessager(dbError);
      throw dbError;
    }
    }
};


export default ProductServices;
