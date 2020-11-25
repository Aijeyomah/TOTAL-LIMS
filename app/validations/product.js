import Joi from '@hapi/joi';
import JoiDate from '@hapi/joi-date'
import { stringCheck, validateDateSchema } from './staff';

const JoiBase = Joi.extend(JoiDate)

const productResultSchema = Joi.object({
  date_sampled: validateDateSchema('date_sampled'),
  date_received: validateDateSchema('date_received'),
  report_no: stringCheck(Joi, 'report_No'),
  product_name: stringCheck(Joi,'product_name')
}).options({
  allowUnknown: true,
});

export default productResultSchema;