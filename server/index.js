const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const config = require("config");
const mongoose = require("mongoose");
const URICreator = require("./cloudUri");
const router = require("./router/index");

const app = express();
const port = config.get("port") || 3000;

const mongoData = config.get("mongo");

const type = mongoData.type;
const login = mongoData.login;
const pass = mongoData.pass;
const url = mongoData.URL;
const params = mongoData.params;

const mongoURI = new URICreator(type, login, pass, url, params).getURI();
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use("/api", router);

const start = async () => {
    try {
        await mongoose.connect(mongoURI, options={
            useUnifiedTopology: true
        });
        app.listen(port, callback => {
            console.log(`APP run at: ${ config.get("domain") }:${ port }`);
        })

    } catch (e) {
        console.error(e);

    }
}

start();