class URICreator {

    constructor(type, login, password, url, args) {
        this.type = type;
        this.data = {
            "log": login,
            "pass": password
        }

        this.url = url;
        this.args = args;
    }

    pushArgs(toAdd) {
        this.args.push(toAdd);
    }

    getURI() {
        let uri = `${this.type}://${this.data.log}:${this.data.pass}@${this.url}/?`;
        const args = this.args.join("&");
        return uri + args;
    }
}

module.exports = URICreator;