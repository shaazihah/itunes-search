const express = require("express");
const app = express();
const fetch = require("node-fetch");
const fs = require("fs");
const bodyParser = require("body-parser");
//helmet protects code
const helmet = require("helmet");
//this is where music favourites will be stored
var favMusic = require("./favoritesMusic.json");
//this is where music favourites will be stored
var favBooks = require("./favoritesBooks.json");
const index = require('./routes/index')
const path = require("path");

// allows all mods to be implemented
app.use(bodyParser.json());
app.use(express.json());
app.use(helmet());

app.use('/', index);



if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

//this is the port which the back end of the code is run on
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Sever is listening on port ${PORT}`));
