const nodeMailer = require('nodeMailer');


const sendEmail = async (mailObj) => {

    const transporter = nodeMailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        service: process.env.SMTP_SERVICE,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD,
        },
    });

    const mailOptions = {
        from: process.env.SMTP_USER,
        to: mailObj.email,
        subject: mailObj.subject,
        text: mailObj.message,
    };

    await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;