import JoiBase from '@hapi/joi';
import JoiDate from '@hapi/joi-date';
// import { emailSchema, validateDateSchema } from './staff';

const Joi = JoiBase.extend(JoiDate);

export const stringCheck = (joiObject, field, min, max) => (
  joiObject.string()
    .trim()
    .min(1)
    .max(50)
    .required()
    .messages({
      'string.base': `${field} field parameter must be a string`,
      'string.empty': `The ${field} field cannot be an empty string`,
      'string.max': `${field} should not be more than ${max} characters`,
      'string.min': `${field} should not be less than ${min} characters`,
      'any.required': `${field} should is required`
    })
    .options({
      allowUnknown: true,
    })
);

export const validateDateSchema = (field) => Joi.date()
  .required()
  .messages({
    'any.required': `The ${field} is required`,
    'date.base': `The ${field}  is either not a date or could not be cast to a date from a string or a number.`,
    'date.format': `The ${field} does not match the required format`
  });

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
  first_name: stringCheck(Joi, 'first_name'),
  last_name: stringCheck(Joi, 'last_name'),
  email: emailSchema(Joi),
  igg: stringCheck(Joi, 'igg')

});
