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

 const updateProductSpecSchema = Joi.object({
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

const productAnalysisDetails = Joi.object({
  resultDetailsId: stringCheck(Joi, "result_details_id"),
  productResultId: stringCheck(Joi, "product_result_id"),
  remark: stringCheck(Joi, "remark"),
  source: stringCheck(Joi, "source"),
  dateReceived: stringCheck(Joi, "date_received"),
  dateSampled: stringCheck(Joi, "date_sampled"),
  reportNo: stringCheck(Joi, "report_no"),
});

const productAnalysisResult = Joi.object({
  productId: stringCheck(Joi, "product_id"),
  testId: stringCheck(Joi, "testId"),
  productSpecResult: stringCheck(Joi, "productSpecResult"),
});

const analysisResultSchema = Joi.object({
  productAnalysisDetails,
  analysis: Joi.array()
    .unique((a, b) => a.testId === b.testId)
    .items(productAnalysisResult)
    .min(1)
    .required()
    .messages({
      "any.required": "analysis items is a required field",
      "string.empty": "analysis items cannot be left empty",
      "array.min": "analysis must contain at least 1 item",
      "array.unique": "analysis can not contain duplicate testId",
    }),
}).options({
  allowUnknown: true,
});

export {
  productTestSchema,
  productSchema,
  updateProductSpecSchema,
  analysisResultSchema,
};
