import db, { redisDB } from "../db";
import query from "../db/queries/product";
import { Helper, constants, DBError } from "../utils";

const { insertAnalysisResult, insertAnalysisResultDetails } = query;
/**
 *
 * Contains a schema that describes the product analysis result resource on the app.
 * @class ProductAnalysis
 */
class ProductAnalysis {
  constructor(options) {
    (this.id = Helper.generateId()),
    (this.product_id = options.productId),
    (this.result_details_id = options.resultDetailsId),
    (this.product_result_id = options.productResultId),
    (this.remark = options.remark),
    (this.source = options.source),
    (this.date_received = options.dateReceived),
    (this.date_sampled = options.dateSampled),
    (this.report_no = options.reportNo);
  };

  async save() {
    try {
      return db.tx(async t => {
        await t.one(insertAnalysisResultDetails, [
          this.result_details_id,
          this.product_result_id,
          this.remark,
          this.source,
          this.date_received,
          this.date_sampled,
          this.report_no,
        ]);
        const analysisDetails = this.analysis.map(
          ({ testId, productSpecResult }) => {
            t.any(insertAnalysisResult, [
              this.id,
              this.product_id,
              testId,
              productSpecResult,
            ]);
          }
        );
        await Promise.all(analysisDetails);
      });
    } catch (e) {
      const dbError = new DBError({
        message: e.message
      });
      Helper.moduleErrLogMessager(dbError);
      throw dbError;
    }
  }
}

export default ProductAnalysis;
