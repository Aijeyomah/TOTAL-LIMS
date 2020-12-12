import ProductTest from '../../models/product.tests';
import Helper from '../../utils/helpers';
import constants from '../../utils/constants';
import { genericErrors } from '../../utils';
import ProductService from '../../services/products';
import ProductAnalysis from '../../models/product.analysis.result';

const { successResponse, errorResponse } = Helper;
const { SAVE_ANALYSIS_SUCCESSFULLY } = constants;

class ProductAnalysisResult {
    static async analysisResult(req, res, next) {
        try {
            const analysis = new ProductAnalysis(req.body);
            const result = await analysis.save()
            return successResponse(res, {
              message: SAVE_ANALYSIS_SUCCESSFULLY,
              data: result,
              code: 201,
            });
        } catch (e) {
            next(errorResponse(req, res, genericErrors.saveAnalysisError));
        }
    }
};
export default ProductAnalysisResult;