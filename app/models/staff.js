import db, { redisDB } from '../db';
import queries from '../db/queries/auth';
import { Helper, constants, DBError } from '../utils';

const { createStaff } = queries;
/**
 *contains a schema that describes the staff resource on the app
 * @class StaffModel
 */
class StaffModel {
  /**
   *
   *Creates an instance of StaffModel.
   * @param {object} options - contains the required properties for creating a
   * staff instance.
   * @returns { StaffModel } - An instance of the Staff Model.
   * @memberof StaffModel
   */
  constructor(options) {
    (this.id = Helper.generateId()),
    (this.firstName = options.first_name),
    (this.lastName = options.last_name),
    (this.email = options.email),
    (this.igg = options.igg),
    (this.password = options.hash),
    (this.salt = options.salt);
  }

  async save() {
    try {
      return db.one(createStaff, [
        this.id,
        this.firstName,
        this.lastName,
        this.email,
        this.igg,
        this.password,
        this.salt,
      ]);
    } catch (error) {
      console.log(error)
      const dbError = new DBError({
        status: 400,
        message: error.message,
      });
      Helper.moduleErrLogMessager(dbError);
      throw dbError;
    }
  }
}
export default StaffModel;
