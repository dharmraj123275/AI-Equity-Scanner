require("dotenv").config();

const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

const API_KEY = process.env.UPSTOX_API_KEY;
const ACCESS_TOKEN = process.env.UPSTOX_ACCESS_TOKEN;

const HEADERS = {
    Authorization: `Bearer ${ACCESS_TOKEN}`,
    Accept: "application/json"
};

app.get("/", (req, res) => {
    res.json({
        app: "AI Equity Scanner Pro",
        status: "Running",
        version: "4.0"
    });
});
