import queries from "../../db/queries/product";
import db, { redisDB } from "../../db";
import { Helper, constants, DBError } from "../../utils";

const { moduleErrLogMessager } = Helper;
const {
  FETCH_PRODUCT_FAIL,
  FETCH_CATEGORIES_FAIL,
  UPDATE_PRODUCT_FAIL,
  DELETE_PRODUCT_FAIL,
} = constants;
const {
  getAllProductAndSpec,
  getAllProductTest,
  getAllCategory,
  editProductName,
  editProductSpec,
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
  };

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
  };

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
  };

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
  };

  static async editProductSpec(oldData, reqData) {
    try {
      const { productSpecification } = reqData;
      const data = { ...oldData, ...reqData };
      const product = productSpecification.map(
        ({ product_spec, test_id, spec_id }) => {
          db.any(editProductSpec, [product_spec, data.product_id, test_id, spec_id]);
        }
      );
      return await Promise.all(product);
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
};

export default ProductServices;
