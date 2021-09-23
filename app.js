const express = require("express");
const morgan = require("morgan");
require("dotenv").config();
require("./database");
const config = require("./config");
const exphbs = require("express-handlebars");
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
app.use(express.static(path.join(__dirname, "public/css")));
app.use(express.static(path.join(__dirname, "public/scripts")));
app.use(morgan("dev"));
app.use(CORS());
console.log(CORS());

app.set("views", path.join(__dirname, "views"));
app.engine(
  ".hbs",
  exphbs({
    layoutsDir: path.join(app.get("views"), "layouts"),
    partials: path.join(app.get("views"), "partials"),
    extname: ".hbs",
    defaultLayout: "main",
  })
);
app.set("view engine", ".hbs");

// Routes
app.use(require("./routes/routes"));

// Init
app.listen(process.env.PORT || 3000);
