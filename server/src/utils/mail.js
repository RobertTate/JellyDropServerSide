import { config } from '../config';
import mailgunLoader from 'mailgun-js';
let mailgun = mailgunLoader({ apiKey: config.MAILGUN_API_KEY, domain: 'sandbox8b453b42f7c1459ea25d07d3ee6e14d6.mailgun.org'});


function sendEmail(to, from, subject, content) {
    let data = {
        from,
        to,
        subject,
        html: content
    };

    return mailgun.messages().send(data);
}



export { sendEmail };
