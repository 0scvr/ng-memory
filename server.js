// This file is only needed to serve the angular app once hosted
const express = require("express");
const path = require("path");

const ngApp = express();

ngApp.use(express.static("./dist/ng-memory"));

ngApp.get("/*", function (request, response) {
  response.sendFile(path.join(__dirname, "/dist/ng-memory/index.html"));
});

ngApp.listen(process.env.PORT || 8080);
