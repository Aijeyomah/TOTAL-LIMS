import sgMail from '@sendgrid/mail';
import config from '../../../config';

sgMail.setApiKey(config.TOTAL_LIMS_SEND_GRID_API_KEY);

const sendDynamicMail = async (options) => {
  try {
    const msg = {
      to: options.to,
      from: options.from,
      subject: options.subject,
      templateId: options.templateId,
      dynamic_template_data: options.dynamic_template_data
    };

    await sgMail.send(msg);
  } catch (error) {
    if (error.response) {
      console.error(error.response.body);
    }
  }
};

export default sendDynamicMail;
