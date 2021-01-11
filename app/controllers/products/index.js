import ProductTest from '../../models/product.tests';
import Helper from '../../utils/helpers';
import constants from '../../utils/constants';
import { genericErrors } from '../../utils';
import ProductAnalysis from '../../models/product.analysis.result';
import ProductServices from '../../services/products'

const { successResponse, errorResponse } = Helper;
const { SAVE_ANALYSIS_SUCCESSFULLY, FETCH_ANALYSIS_RESULT_SUCCESSFULLY } = constants;
const { getAnalysisResult } = ProductServices;

class ProductAnalysisResult {
    static async saveAnalysisResult(req, res, next) {
        try {
            const analysis = new ProductAnalysis(req.body);
            const result = await analysis.save()
            return successResponse(res, {
              message: SAVE_ANALYSIS_SUCCESSFULLY,
              data: result,
              code: 201,
            });
        } catch (e) {
            console.log(e);
            next(errorResponse(req, res, genericErrors.saveAnalysisError));
        }
    }
    static async getAnalysisResult(req, res, next) {
        try {
            const { productResultId } = req.params;
           const result = await getAnalysisResult(productResultId);
            return successResponse(res, {
              message: FETCH_ANALYSIS_RESULT_SUCCESSFULLY,
              data: result,
              code: 201,
            });
        } catch (e) {
            console.log(e);
            next(errorResponse(req, res, genericErrors.fetchResultAnalysisError));
        }
    }
};
export default ProductAnalysisResult;