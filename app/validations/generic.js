export const uuidCheck = (param, joiObject) => joiObject
  .string()
  .guid()
  .messages({
    'string.empty': `${param} cannot be an empty string`,
    'string.base': `${param} must be a uuid string`,
    'string.guid': `${param} must be a valid UUID`,
  });
export default uuidCheck;
