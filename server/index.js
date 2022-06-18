require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const config = require("config");

const app = express();
const port = process.env.PORT || config.get("port") || 3000;

const start = async() => {
    try {
        app.listen(port, callback => {
            console.log(`APP run at: localhost:${port}`);
        })

    } catch (e) {
        console.error(e);

    }
}

start();