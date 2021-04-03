import { loginSchema, createProfileSchema, changePasswordSchema } from '../../validations/index';
import { Helper, ApiError, constants, genericErrors } from '../../utils';
import StaffService from '../../services/staff';

const { errorResponse, verifyToken, moduleErrLogMessenger } = Helper;
const { getStaffByIgg, getStaffByEmailAddress } = StaffService;
const { EMAIL_CONFLICT, STAFF_EMAIL_EXIST_VERIFICATION_FAIL_MSG } = constants;

/**
 * validates staff profile create request details
 * @class AuthMiddleware
 */
class AuthMiddleware {
    /**
     *
     *
     * @static
     * @param {object} req - request object
     * @param {object} res - response object
     * @param {Function} next - calls the next handler
     * @returns { Object } - Returns an object (error or response).
     * @memberof AuthMiddleware
     */
    static async validateCreateStaffProfile(req, res, next) {
        try {
            await createProfileSchema.validateAsync(req.body);
            next();
        } catch (e) {
            const apiError = new ApiError({
                status: 400,
                message: e.details[0].message,
            });
            errorResponse(req, res, apiError);
        }
    }

    /**
     *
     *
     * @static
     * @param {object} req - request object
     * @param {object} res - response object
     * @param {Function} next - calls the next handler
     * @returns { Object } - Returns an object (error or response).
     * @memberof AuthMiddleware
     */
    static async validateLoginSchema(req, res, next) {
        try {
            await loginSchema.validateAsync(req.body);
            next();
        } catch (e) {
            const apiError = new ApiError({
                status: 400,
                message: e.details[0].message,
            });
            errorResponse(req, res, apiError);
        }
    }

    /**
     *
     *
     * @static
     * @param {object} req - request object
     * @param {object} res - response object
     * @param {Function} next - calls the next handler
     * @returns { Object } - Returns an object (error or response).
     * @memberof AuthMiddleware
     */
    static async validateUserSignup(req, res, next) {
        try {
            await changePasswordSchema.validateAsync(req.body);
            next();
        } catch (e) {
            const apiError = new ApiError({
                status: 400,
                message: e.details[0].message,
            });
            errorResponse(req, res, apiError);
        }
    }

    /**
     * Checks if a specific already exist for a staff account.
     * @static
     * @param { Object } req - The request from the endpoint.
     * @param { Object } res - The response returned by the method.
     * @param { function } next - Calls the next handle.
     * @returns { JSON | Null } - Returns error response if validation fails or Null if otherwise.
     * @memberof AuthMiddleware
     *
     */
    static async checkIfStaffExist(req, res, next) {
        try {
            const checkStaffByIgg = await getStaffByIgg(req.body.igg);
            const checkStaffByEmail = await getStaffByEmailAddress(req.body.email);
            if (checkStaffByIgg || checkStaffByEmail) {
                return errorResponse(
                    req,
                    res,
                    new ApiError({
                        message: EMAIL_CONFLICT,
                        status: 409
                    })
                );
            }
            next();
        } catch (e) {
            e.status = constants.STAFF_EMAIL_EXIST_VERIFICATION_FAIL;
            Helper.moduleErrLogMessager(e);
            errorResponse(
                req,
                res,
                new ApiError({ message: STAFF_EMAIL_EXIST_VERIFICATION_FAIL_MSG })
            );
        }
    }

    /**
     * Validates staff's login credentials, with emphasis on the
     * existence of a user with the provided email address.
     * @static
     * @param { Object } req - The request from the endpoint.
     * @param { Object } res - The response returned by the method.
     * @param { function } next - Calls the next handle.
     * @returns { JSON | Null } - Returns error response if validation fails or Null if otherwise.
     * @memberof AuthMiddleware
     *
     */
    static async StaffLoginEmailValidator(req, res, next) {
        try {
            const staff = await getStaffByIgg(req.body.igg);
            if (!staff) {
                return errorResponse(req, res, genericErrors.inValidLogin);
            }
            req.user = staff;
            next();
        } catch (e) {
            e.status = constants.STAFF_EMAIL_EXIST_VERIFICATION_FAIL;
            Helper.moduleErrLogMessager(e);
            errorResponse(
                req,
                res,
                new ApiError({ message: STAFF_EMAIL_EXIST_VERIFICATION_FAIL_MSG })
            );
        }
    }

    /**
     *generate a password for staffs and hashes it
     * @static
     * @param {object} req - a request from an endpoint
     * @param {function} next - a function to call the next handler
     * @returns { JSON | Null } - Returns error response if validation fails or Null if otherwise.
     * @memberof AuthMiddleware
     */
    static async generatePassword(req, res, next) {
        const password = Helper.generateUniquePassword();
        const { hash, salt } = await Helper.hashPassword(password);
        req.body.salt = salt;
        req.body.hash = hash;
        req.body.plainPassword = password;
        next();
    }

    /**
     * Checks for token in the authorization and x-access-token header properties.
     * @static
     * @private
     * @param {object} authorization - The headers object
     * @memberof AuthMiddleware
     * @returns {string | null} - Returns the Token or Null
     */
    static checkAuthorizationToken(authorization) {
        let bearerToken = null;
        if (authorization) {
            const token = authorization.split(' ')[1];
            bearerToken = token || authorization;
        }
        return bearerToken;
    }

    /**
     * Aggregates a search for the access token in a number of places.
     * @static
     * @private
     * @param {Request} req - The express request object.
     * @memberof AuthMiddleware
     * @returns {string | null} - Returns the Token or Null
     */
    static checkToken(req) {
        const {
            headers: { authorization },
        } = req;
        const bearerToken = AuthMiddleware.checkAuthorizationToken(authorization);
        return (
            bearerToken ||
            req.headers['x-access-token'] ||
            req.headers.token ||
            req.body.token
        );
    }

    /**
     * Verifies the validity of a user's access token or and the presence of it.
     * @static
     * @param { Object } req - The request from the endpoint.
     * @param { Object } res - The response returned by the method.
     * @param { function } next - Calls the next handle.
     * @returns { JSON | Null } - Returns error response if validation fails or Null if otherwise.
     * @memberof AuthMiddleware
     *
     */
    static async authenticate(req, res, next) {
        const token = AuthMiddleware.checkToken(req);
        if (!token) {
            return errorResponse(req, res, genericErrors.authRequired);
        }
        try {
            const decoded = verifyToken(token);
            req.data = decoded;
            next();
        } catch (err) {
            errorResponse(req, res, genericErrors.authRequired);
        }
    }
}
export default AuthMiddleware;