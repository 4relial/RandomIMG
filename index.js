const express = require("express");
const cors = require("cors");
const got = require("got");
const zc = require('./api')

const ENDPOINTS = require("./lib/endpoints.js");

const API_URL = "https://api.waifu.pics";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  zerochan('Genshin+Impact', 99, res);
});



async function zerochan(charname, length, response) {
  try{
  zc.getSearch(charname, Math.floor(Math.random() * length) + 1).then(async (img) => {
      const num = Math.floor(Math.random() * 23) + 1;
      if (img[num]?.image) {
        const images = img[num].image;
        response.json({
          message: images,
        });
          console.log(images)
  }
})
  } catch {
    zerochan('Genshin+Impact', 99, res);
  }
}

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log("Server is listening in port" + PORT);
});
