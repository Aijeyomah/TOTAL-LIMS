import { Helper, constants, genericErrors, ApiError } from "../../utils";
import { StaffModel } from "../../models";
import userQuery from "../../db/queries/auth";
import sendDynamicMail from "../../services/email";

const { errorCreatingStaff} = genericErrors;
const {
  compareHash,
  errorResponse,
  addTokenToData,
  successResponse,
  generateToken
} = Helper;
const {
  LOGIN_USER_SUCCESSFULLY,
  CREATE_STAFF_FAILED,
  CREATE_STAFF_SUCCESSFULLY,
  BASE_URL,
  WELCOME_EMAIL_TEMPLATE_ID,
  notification_sender
} = constants;
const { findStaffByStaffId } = userQuery;
/**
 *A collection of methods that controls and issues the authenticity of a staff
 *
 * @class AuthController
 */
class AuthController {
  /**
   * login staff
   *
   * @static
   * @param {object} req - a request from an endpoint
   * @param {object} res - a response returned by the method
   * @returns {JSON} - A JSON response with the user's details and a JWT or an
   * error response is request body doesn't match with db
   * @memberof AuthController
   */
  static async login(req, res) {

    try {
      const { user, body } = req;
      const isAuthenticatedUser = compareHash(
        body.password.trim(),
        user.password.trim(),
        user.salt.trim()
      );
      if (!isAuthenticatedUser) {
        return errorResponse(req, res, genericErrors.inValidLogin);
      }
      const data = addTokenToData(user, true);
      successResponse(res, { data, message: LOGIN_USER_SUCCESSFULLY });
    } catch (error) {
      
    }
    
  }

  static async createStaff(req, res, next) {
    try {
      const staff = new StaffModel(req.body);
      const { id, first_name, last_name, created_at, igg, email } = await staff.save();
      const dynamic_template_data = {
        FirstName: first_name,
        password: req.body.plainPassword
      };
      const msg = {
        to: email,
        from: notification_sender,
        subject: "Welcome to total",
        templateId: WELCOME_EMAIL_TEMPLATE_ID,
        dynamic_template_data,
      };
      await sendDynamicMail(msg);
      return successResponse(res, {
        message: CREATE_STAFF_SUCCESSFULLY,
        data: { id, first_name, last_name, created_at, igg, email },
        code: 201
      });
     ;
    } catch (error) {
      next(errorResponse(req, res, genericErrors.errorCreatingStaff));
    }
  };
}
export default AuthController;
