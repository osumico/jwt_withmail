const nodemailer = require("nodemailer");
const config = require("config");

class Mail {


    constructor() {

        this.IMAPData = config.get("IMAPData");
        const IMAPData = this.IMAPData;

        this.trasporter = nodemailer.createTransport({ 
            host: IMAPData.host,
            port: IMAPData.port,
            secure: true,
            auth: {
                type: "OAuth2",
                user: IMAPData.username
             }
         });

        this.trasporter.set("oauth2_provision_cb", (user, renew, callback) => {
        let accessToken = userTokens[user];

        if (!accessToken) {
            return callback(new Error("Unknown user"));

        } else {
            return callback(null, accessToken);
        }
        });
}


    async sendActivationEmail(toEmail, link) {

        const IMAPData = this.IMAPData;
        await this.trasporter.sendMail({ 
            from: IMAPData.username,
            to: toEmail,
            subject: `Account activation ${ config.get("domain") }`,
            text: "",
            html: 
`
                <div>
                    <h1>For activation please refer to link bellow!</h1>
                    <a href="${link}">${link}</a>
                </div>
`       
        });
    }
}

module.exports = new Mail();