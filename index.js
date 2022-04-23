const express = require("express");
const cors = require("cors");
const request = require("request");
const got = require("got");
const zc = require('./api')
const fs = require('fs')

const ENDPOINTS = require("./lib/endpoints.js");

const API_URL = "https://api.waifu.pics";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  zerochan('Genshin+Impact', 99, res);
});


async function fetchImage(type, endpoint, response) {
  try {
    const { url } = await got(`${API_URL}/${type}/${endpoint}`).json();

    got
      .stream(url)
      .on("response", (response) => {
        response.headers["cache-control"] = "no-cache";
      })
      .pipe(response);
      console.log(url)
  } catch (error) {
    response.status(500).json({
      message: error.message,
    });
  }
}

async function zerochan(charname, length, res) {
  try{
zc.getSearch(charname, Math.floor(Math.random() * length) + 1).then(async (img) => {
      const num = Math.floor(Math.random() * 23) + 1;
      if (img[num]?.image) {
        const images = img[num].image;
        request({
          url: images,
          encoding: null
        }, 
        (err, resp, buffer) => {
          if (!err && resp.statusCode === 200){
            res.set("Content-Type", "image/jpeg");
            res.send(resp.body);
          }
        });
          console.log(images)
  }
})
}catch (error) {
    response.status(500).json({
      message: error.message,
    });
}

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log("Server is listening in port" + PORT);
});
