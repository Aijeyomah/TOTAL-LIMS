import Joi from '@hapi/joi';
import { stringCheck } from './staff';

const loginSchema = Joi.object({
  igg: stringCheck(Joi, 'igg'),
  password: stringCheck(Joi, 'password', 100, 5),
});

export default loginSchema;
