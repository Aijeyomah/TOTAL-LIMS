import Joi from "@hapi/joi";
import JoiDate from "@hapi/joi-date";
import { stringCheck, validateDateSchema } from "./staff";

const productSchema = Joi.object({
  productName: stringCheck(Joi, "productName"),
}).options({
  allowUnknown: true,
});

const productTestSchema = Joi.object({
  analysis: stringCheck(Joi, "analysis"),
  test: stringCheck(Joi, "test"),
  categoryId: stringCheck(Joi, "category"),
}).options({
  allowUnknown: true,
});

const editProductTestItemArray = Joi.object({
  productSpec: stringCheck(Joi, "product_spec"),
  specId: stringCheck(Joi, "spec_id"),
});

export const updateProductSpecSchema = Joi.object({
  productSpecification: Joi.array()
    .unique((a, b) => a.specId === b.specId)
    .items(editProductTestItemArray)
    .min(1)
    .required()
    .messages({
      'any.required': 'product specification items is a required field',
      'string.empty': 'product specification items cannot be left empty',
      'array.min': 'product specification must contain at least 2 items',
      'array.unique': 'product specification can not contain duplicate id'
    })
});

export { productTestSchema, productSchema, updateProductSpecSchema };
