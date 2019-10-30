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

// allows all mods to be implemented
app.use(bodyParser.json());
app.use(express.json());
app.use(helmet());

//this fetches api for song entered by user
app.get("/music", (req, res) => {
  fetch(
    `https://itunes.apple.com/search?term=${encodeURIComponent(
      req.query.search
    )}&limit=10&entity=song`
  )
    .then(function(res) {
      return res.json();
    })
    .then(function(data) {
      res.send(data.results);
    });
});

//allows user to add song to json file
app.post("/favoritesMusic", (req, res) => {
  favMusic.push(req.body);
  fs.writeFile("favoritesMusic.json", JSON.stringify(favMusic), err => {
    if (err) {
      console.log("Your upload was unsuccessful", err);
    } else {
      console.log("Your upload was successful");
    }
  });
});

//this gets and displays songs added to json file
app.get("/favoritesMusic", (req, res) => {
  fs.readFile("./favoritesBooks.json", (err, data) => {
    if (err) {
      console.log("Does not work");
    } else {
      res.send(favMusic);
    }
  });
});

//allows for songs to be removed from favorites file
app.delete("/favoritesMusic", (req, res) => {
  console.log("access");
  favMusic = favMusic.filter(i => {
    return i.id != req.body.deleted;
  });
  fs.writeFile("favoritesMusic.json", JSON.stringify(favMusic), err => {
    if (err) {
      // send message to alert user if delete was successful or not
      console.log("unsuccessful", err);
    } else {
      console.log("SUCCESS");
    }
  });
});

//this fetches api for book entered by user
app.get("/book", (req, res) => {
  fetch(
    `https://itunes.apple.com/search?term=${encodeURIComponent(
      req.query.search
    )}&limit=10&entity=ebook`
  )
    .then(function(res) {
      return res.json();
    })
    .then(function(data) {
      res.send(data.results);
    });
});
//allows user to add book to favourites file
app.post("/favoritesBooks", (req, res) => {
  favBooks.push(req.body);
  fs.writeFile("favoritesBooks.json", JSON.stringify(favBooks), err => {
    if (err) {
      console.log("unsucessful", err);
    } else {
      console.log("SUCCESS");
    }
  });
});

//this gets and displays books
app.get("/favoritesBooks", (req, res) => {
  fs.readFile("./favoritesBooks.json", (err, data) => {
    if (err) {
      console.log("cant read");
    } else {
      res.send(favBooks);
    }
  });
});

//this deletes book in json file
app.delete("/favoritesBooks", (req, res) => {
  console.log("access");
  favBooks = favBooks.filter(i => {
    return i.id != req.body.deleted;
  });
  fs.writeFile("favoritesBooks.json", JSON.stringify(favBooks), err => {
    if (err) {
      console.log("It's not working", err);
    } else {
      console.log("It Works");
    }
  });
});

const path = require("path");
if (process.env.NODE_ENV === "production") {
  app.use(express.static("frontend/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}

//this is the port which the back end of the code is run on
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Sever is listening on port ${PORT}`));
