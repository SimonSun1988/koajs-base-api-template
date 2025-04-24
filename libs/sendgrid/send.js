const Promise = require('bluebird');
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = async (payload) => {
  try {
    const msg = {
      to: payload.to,
      from: payload.from,
      subject: payload.subject,
      html: payload.html,
    };

    await sgMail.send(msg);
  } catch (err) {
    return Promise.reject(err);
  }
};