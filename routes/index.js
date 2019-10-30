const express = require("express");
const router = express.Router();

//this fetches api for song entered by user
router.get("/music", (req, res) => {
  fetch(
    `https://itunes.routerle.com/search?term=${encodeURIComponent(
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
router.post("/favoritesMusic", (req, res) => {
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
router.get("/favoritesMusic", (req, res) => {
  fs.readFile("./favoritesBooks.json", (err, data) => {
    if (err) {
      console.log("Does not work");
    } else {
      res.send(favMusic);
    }
  });
});

//allows for songs to be removed from favorites file
router.delete("/favoritesMusic", (req, res) => {
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
router.get("/book", (req, res) => {
  fetch(
    `https://itunes.routerle.com/search?term=${encodeURIComponent(
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
router.post("/favoritesBooks", (req, res) => {
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
router.get("/favoritesBooks", (req, res) => {
  fs.readFile("./favoritesBooks.json", (err, data) => {
    if (err) {
      console.log("cant read");
    } else {
      res.send(favBooks);
    }
  });
});

//this deletes book in json file
router.delete("/favoritesBooks", (req, res) => {
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

module.exports = router;
