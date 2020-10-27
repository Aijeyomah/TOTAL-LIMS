import db from '../db';
import query from '../db/queries/product/blend';
import { Helper } from '../utils';

/**
 * Contains a schema that describes the staff resource on the app.
 * @class productModel
 *
 */
class BlendProducts {
  /**
   *Creates an instance of productModel.
   * @param {object} options
   * @memberof BlendProduct
   */
  constructor(options) {
    this.blend_cat_id = options.blend_cat_id;
    this.product_name = options.product_name;
    this.specific_gravity = options.specific_gravity;
    this.visco_40 = options.visco_40;
    this.visco_100 = options.visco_100;
    this.ccs = options.ccs;
    this.vi = options.vi;
    this.mrv = options.mrv;
    this.colour = options.colour;
    this.aspect = options.aspect;
    this.foaming_24 = options.foaming_24;
    this.foaming_93 = options.foaming_93;
    this.foaming_24_after_93 = options.foaming_24_after_93;
    this.base_number = options.base_number;
    this.flash_point = options.flash_point;
    this.pour_point = options.pour_point;
    this.noack_volatility = options.noack_volatility;
    this.sulphated_ash = options.sulphated_ash;
    this.ca = options.ca;
    this.zn = options.zn;
    this.p = options.p;
    this.Mg = options.Mg;
  }

  /**
   * @returns { BlendProduct } - An instance of the BlendProduct Model.
   * @memberof BlendProduct
   */
  async save() {
    try {
      return db.one(query.createBlendProduct, [
        this.blend_cat_id,
        this.product_name,
        this.specific_gravity,
        this.visco_40,
        this.visco_100,
        this.ccs,
        this.vi,
        this.mrv,
        this.colour,
        this.aspect,
        this.foaming_24,
        this.foaming_93,
        this.foaming_24_after_93,
        this.base_number,
        this.flash_point,
        this.pour_point,
        this.noack_volatility,
        this.sulphated_ash,
        this.ca,
        this.zn,
        this.p,
        this.Mg,
      ]);
    } catch (error) {
      const dbError = new DBError({
        status: 400,
        message: error.message,
      });
      Helper.moduleErrLogMessager(dbError);
      throw dbError;
    }
  }
}

export default BlendProducts;
