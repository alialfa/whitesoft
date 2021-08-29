const express = require("express");
const PORT = process.env.PORT || 4000;
const isDev = process.env.NODE_ENV !== "production";
const initializeMongoServer = require("./config/mongodb");
const path = require("path");
const helmet = require("helmet"); // creates headers that protect from attacks (security)
const cors = require("cors"); // allows/disallows cross-site communication
const bodyParser = require("body-parser");
const indexRouter = require("./routes/whitesoft_user/index"); // user router
const addRouter = require("./routes/whitesoft_user/add");

const app = express();

/** middleware */
app.use(helmet());
app.use(cors()); //app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/** api routing */
app.use("/api/whitesoft_user/index", indexRouter);
app.use("/api/whitesoft_user/add", addRouter);

/** for production */
if (process.env.NODE_ENV === "production") {
  // Serve any static files
  app.use(express.static(path.join(__dirname, "client/build")));
  // Handle React routing, return all requests to React app
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

/** server & DB listening */
app.listen(PORT, function () {
  console.error(
    `WHITESOFT node ${
      isDev ? "dev server" : "cluster worker " + process.pid
    }: listening on port ${PORT}`
  );
});

/** start mongo */
initializeMongoServer();
