import Joi from '@hapi/joi';

export const generateNameSchema = (joiObject, field) => (
  joiObject.string()
    .trim().min(2)
    .max(30)
    .messages({
      'string.base': `The ${field} field parameter must be a string`,
      'string.empty': `The ${field} field cannot be an empty string`,
      'string.max': `${field} should not be more than 30 characters`,
      'string.min': `${field} should not be less than 2 characters`
    })
);

export const changePasswordSchema = Joi.object({
  password: Joi.string()
    .trim()
    .required()
    .pattern(new RegExp('^[a-zA-Z0-9@#%$!+:_|-]{5,30}$'))
    .messages({
      'string.base': 'Password must be a valid string',
      'string.empty': 'Password field cannot be empty',
      'any.required':
           'Password field is required else password cannot be updated',
      'object.pattern.match':
           'The only validate combinations are numbers, alphabets, and these characters: a-zA-Z0-9@#%$!+:_|-',
    }),
});
export const emailSchema = (joiObject) => joiObject.string().trim().email().required()
  .messages({
    'string.base': 'Email address must be a valid string',
    'string.empty': 'Email address cannot be an empty string',
    'any.required': 'Email address is required',
    'string.email': 'The Email address is invalid',
  });

export const createProfileSchema = Joi.object({
  first_name: generateNameSchema(Joi, 'first_name'),
  last_name: generateNameSchema(Joi, 'last_name'),
  email: emailSchema(Joi),
  igg: generateNameSchema(Joi, 'igg')

});
