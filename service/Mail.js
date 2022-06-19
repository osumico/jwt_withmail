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
        console.log(`\nSimulating send activation link for ${ config.get("domain") }:${ config.get("port") }`);
        console.log(`From: ${ IMAPData.username }\nTo: ${ toEmail }\nLinks:`);
        console.log(`${ link }\n`);
    }
}

module.exports = new Mail();