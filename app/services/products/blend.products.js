// import blendQuery from "../../db/queries/product/blend";
// import db, { redisDB } from "../../db";
// import { Helper, constants, DBError } from "../../utils";

// const { moduleErrLogMessager } = Helper;
// const {
//   REDIS_KEYS: { blendProduct, blendProducts: blendProductKey },
//   FETCH_BLEND_PRODUCT_FAIL,
//   UPDATE_BLEND_PRODUCT_FAIL,
//   DELETE_PRODUCT_FAIL
// } = constants;
// const {
//   getAllBlendProduct,
//   fetchBlendProductById,
//   updateBlendProduct,
//   deleteBlendProductById
// } = blendQuery;
// /**
//  *contains a collection of service methods for managing blend product  resources
//  * @class BlendProductService
//  */
// class BlendProductService {
//   /**
//    * Fetches all blend products.
//    *  @memberof BlendProductService
//    * @returns { Promise<Array | Error> } A promise that resolves or rejects
//    * with an Array of blend products objects or a DB Error.
//    */
//   static async getAllBlendProduct() {
//     try {
//       let products = await redisDB.smembers(blendProductKey);
//       if (products.length) {
//         products = products.map((id) => BlendProductService.fetchById(id));
//         products = await Promise.all(products);
//       }
//       products = await db.manyOrNone(getAllBlendProduct);
//       if (products.length)
//         await redisDB.saddAsync(
//           blendProductKey,
//           ...products.map(({ id }) => id)
//         );
//       return products;
//     } catch (e) {
//       const dbError = new DBError({
//         message: e.message,
//         status: FETCH_BLEND_PRODUCT_FAIL,
//         errors: [],
//       });
//       moduleErrLogMessager(dbError);
//       throw dbError;
//     }
//   };
//   /**
//    * Fetches a blend product by its id.
//    * @memberof BlendProductService
//    * @param { String } id - The id of a specific blend product.
//    * @returns { Promise<Object | Error> } A promise that resolves or rejects
//    * with a blend product object or a DB Error.
//    */
//   static async fetchById(id) {
//     try {
//       const productKey = blendProduct(id);
//       let product = await redisDB.hgetallAsync(productKey);
//       if (!product) {
//         product = await db.oneOrNone(fetchBlendProductById, [id]);
//         if (product) {
//           await redisDB
//             .hmsetAsync(productKey, product)
//             .saddAsync(blendProductKey, id)
//             .execAsync();
//         }
//       }
//       return product;
//     } catch (e) {
//       const dbError = new DBError({
//         message: e.message,
//         status: FETCH_BLEND_PRODUCT_FAIL,
//         errors: [],
//       });
//       moduleErrLogMessager(dbError);
//       throw dbError;
//     }
//   };
//   static async updateByIdProduct(reqParams, reqData) {
//     try {
//       const oldProductDetails = await BlendProductService.fetchById(
//         reqParams.id
//       );
//       const data = { ...oldProductDetails, ...reqData };
//       await db.one(updateBlendProduct, [
//         data.specific_gravity,
//         data.visco_40,
//         data.visco_100,
//         data.ccs,
//         data.vi,
//         data.mrv,
//         data.colour,
//         data.aspect,
//         data.foaming_24,
//         data.foaming_93,
//         data.foaming_24_after_93,
//         data.base_number,
//         data.flash_point,
//         data.pour_point,
//         data.noack_volatility,
//         data.sulphated_ash,
//         data.ca,
//         data.zn,
//         data.p,
//         data.Mg,
//         data.id,
//       ]);

//       await redisDB.hmsetAsync(blendProduct(data.id), data);
//       return data;
//     } catch (e) {
//       const dbError = new DBError({
//         message: e.message,
//         status: UPDATE_BLEND_PRODUCT_FAIL,
//         errors: [],
//       });
//       moduleErrLogMessager(dbError);
//       throw dbError;
//     }
//   };
//   static async deleteProductById(id) {
//     try {
//       await db.none(deleteBlendProductById, [id]);
//       redisDB.multi()
//         .del(blendProduct(id))
//         .srem(blendProductKey, id).execAsync()
//     } catch (e) {
//       const dbError = new DBError({
//         message: e.message,
//         status: DELETE_PRODUCT_FAIL,
//         errors: [],
//       });
//       moduleErrLogMessager(dbError);
//       throw dbError;
//     }
//     }
// };

// export default BlendProductService;
