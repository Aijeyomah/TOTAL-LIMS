import ApiError from "./api.error";
import constants from "../constants";

const {
  INTERNAL_SERVER_ERROR,
  NOT_FOUND_API,
  AUTH_REQUIRED,
  INVALID_PERMISSION,
  INVALID_CREDENTIALS,
  ACCESS_REVOKED,
  CREATE_STAFF_FAILED,
  CREATE_PRODUCT_FAILED_TEST ,
  CREATE_PRODUCT_FAILED,
  GET_STAFF_ERROR,
  RETRIEVE_ALL_PRODUCTS_FAIL,
  UPDATE_PRODUCT_FAIL,
  ERROR_SAVING_PRODUCT_RESULT
} = constants;

export default {
  serverError: new ApiError({ message: INTERNAL_SERVER_ERROR, status: 500 }),
  notFoundApi: new ApiError({ message: NOT_FOUND_API, status: 404 }),
  unAuthorized: new ApiError({ message: INVALID_PERMISSION, status: 403 }),
  accessRevoked: new ApiError({ message: ACCESS_REVOKED, status: 403 }),
  inValidLogin: new ApiError({ message: INVALID_CREDENTIALS, status: 401 }),
  conflictSignupError: new ApiError({message: INVALID_CREDENTIALS, status: 409,}),
  errorCreatingStaff: new ApiError({
    message: CREATE_STAFF_FAILED,
    status: 401,
  }),
  errorCreatingStaff: new ApiError({
    message: CREATE_STAFF_FAILED,
    status: 401,
  }),
  errorCreatingProductTest: new ApiError({ message: CREATE_PRODUCT_FAILED_TEST, status: 401, }),
  errorCreatingProduct: new ApiError({message: CREATE_PRODUCT_FAILED, status: 401,}),

  errorSavingProductResult: new ApiError({
    message: ERROR_SAVING_PRODUCT_RESULT,
    status: 401,
  }),
  authRequired: new ApiError({ message: AUTH_REQUIRED, status: 401 }),
  staffError: new ApiError({ message: GET_STAFF_ERROR, status: 401 }),
  updateProductError: new ApiError({ message: UPDATE_PRODUCT_FAIL }),
  getProductError: new ApiError({ message: RETRIEVE_ALL_PRODUCTS_FAIL }),
};

