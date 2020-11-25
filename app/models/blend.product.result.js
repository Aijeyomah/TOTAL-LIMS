 
import db, {redisDB} from '../db';
import query from '../db/queries/product/blend';
import { Helper, constants, DBError } from '../utils';
import moment from 'moment';
const { REDIS_KEYS: {blendProductResult, blendProductResultKey: blendProductsReport}} = constants;


/**
 * Contains a schema that describes the staff resource on the app.
 * @class productModel
 *
 */
class BlendProductResult {
  /**
   *Creates an instance of productModel.
   * @param {object} options
   * @memberof BlendProduct
   */
  constructor(options) {
    this.id = Helper.generateId();
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
    this.source = options.source ,
    this.date_sampled = options.date_sampled ,
    this.remark= options.remark,
    this.date_received = options.date_received ,
    this.date_reported = moment() ,
    this.updated_at = moment(),
    this.report_no = options.report_no
  }

  /**
   * @returns { BlendProduct } - An instance of the BlendProduct Model.
   * @memberof BlendProduct
   */
  async save() {
    try {
       await redisDB
        .multi()
        .hmset(blendProductResult(this.id), { ...this })
        .sadd(blendProductsReport, this.id)
        .execAsync();
      return await db.one(query.inputBlendResult, [
        this.id,
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
        this.source ,
        this.date_sampled ,
        this.remark ,
        this.date_received ,
        this.date_reported ,
        this.updated_at ,
        this.report_no 
      ]);
     
    } catch (error) {
      console.log(error);
      
      const dbError = new DBError({
        status: 400,
        message: error.message,
      });
      Helper.moduleErrLogMessager(dbError);
      throw dbError;
    }
  }
}

export default BlendProductResult;

