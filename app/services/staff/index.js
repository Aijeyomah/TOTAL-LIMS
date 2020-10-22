import authQueries from '../../db/queries/auth';
import db from '../../db';

const { getStaffByIgg, getStaffByEmail } = authQueries;
/**
 *contains a collection of service methods for managing staff resources
 * @class StaffService
 */
class StaffService {
  /**
   * Fetches a staff by his/her email.
   * @memberof StaffService
   * @param { String } staff_id - The email of the staff.
   * @returns { Promise< Object | Error | Null > } A promise that resolves or rejects
   * with a staff resource  or a DB Error.
   */
  static async getStaffByIgg(igg) {
    return db.oneOrNone(getStaffByIgg, [igg]);
  }

  static async getStaffByEmailAddress(email) {
    return db.oneOrNone(getStaffByEmail, [email]);
  }
}

export default StaffService;
