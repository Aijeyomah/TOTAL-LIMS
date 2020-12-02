import Joi from '@hapi/joi';
import JoiDate from '@hapi/joi-date'
import { stringCheck, validateDateSchema } from './staff';


const productSchema = Joi.object({
  productName: stringCheck(Joi, 'productName')
}).options({
  allowUnknown: true,
});


const productTest = Joi.object({
  analysis: stringCheck(Joi, 'analysis'),
  test: stringCheck(Joi, 'test'),
  categoryId: stringCheck(Joi, 'category')
}).options({
  allowUnknown: true,
});

let productTestSchema = Joi.array().items(productTest)

export  { productTestSchema, productSchema};