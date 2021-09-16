require("dotenv").config();
require("./database");
const config = require("./config");
const express = require("express");
const CORS = require("cors");
const app = express();
const path = require("path");

// Settings
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(CORS());
console.log(CORS());

// Routes
app.use(require("./routes/routes"));

// Init
app.listen(process.env.PORT || 3000);
