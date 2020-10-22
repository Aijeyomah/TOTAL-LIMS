import Joi from '@hapi/joi';
import { emailSchema, generateNameSchema } from './staff';

const loginSchema = Joi.object({
  igg: generateNameSchema(Joi, 'igg'),
  password: generateNameSchema(Joi, 'password', 100, 5),
});

export default loginSchema;
