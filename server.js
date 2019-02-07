const express = require("express");
const path = require("path");
const app = express();
const port = 3000;
const axios = require("axios");
const SpotifyWebApi = require("spotify-web-api-node");
const credentials = require("./config.js");
const cheerio = require("cheerio");
let fs = require('fs')

var spotifyApi = new SpotifyWebApi(credentials.spotify);
// spotifyApi.clientCredentialsGrant().then(
//   function(data) {
//     console.log('The access token expires in ' + data.body['expires_in']);
//     console.log('The access token is ' + data.body['access_token']);

//     // Save the access token so that it's used in future calls
//     spotifyApi.setAccessToken(data.body['access_token']);
//   },
//   function(err) {
//     console.log('Something went wrong when retrieving an access token', err);
//   }
// );

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendStatus(200);
});
app.get("/search/:entry", (req, res) => {
  console.log("search", req.params.entry);
  spotifyApi
    .searchTracks(req.params.entry)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.send(err);
    });
});
app.get("/name/:name/artist/:artist", (req, res) => {
  axios
    .get("https://api.genius.com/search", {
      params: credentials.genius,
      data: { q: req.params.name }
    })
    .then(x => {
      for (let i = 0; i < x.data.response.hits.length; i++) {
        let artistName = x.data.response.hits[i].result.primary_artist.name;
        if (req.params.artist.includes(artistName)) {
          console.log("hit");
          let id = x.data.response.hits[i].result;
          console.log(id.url);
          axios
            .get(id.url)
            .then(res => {
              const html = res.data;
              const $ = cheerio.load(html);
              $(".lyrics").each((i, elem) => {
                let temp = $(elem).text();
                console.log("lyrics2", temp)
                res.send(temp)
              });
            })
            .catch(err => {
              console.log("stage 2", err);
            });
        }
      }
    })
    .catch(err => {
      console.log(err, "stage 1");
      res.sendStatus(404);
    });
});

app.get("/:id", (req, res) => {
  spotifyApi
    .getArtistAlbums(req.params.id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.send(err);
    });
});
app.listen(port, () => console.log("express"));

// app.get("/name/:name/artist/:artist", (req, res) => {
//   axios.get("https://api.genius.com/search", {params:credentials.genius, data: {q :req.params.name}}).then(x =>{
//     for (let i = 0; i < x.data.response.hits.length; i++) {
//       let artistName = x.data.response.hits[i].result.primary_artist.name;
//      if (req.params.artist.includes(artistName)) {
//        console.log('hit')
//        let id = x.data.response.hits[i].result.id
//        axios.get("https://api.genius.com/songs/" + id, {params: credentials.genius, data:{text_format : 'plain'}}).then(y => {
//          console.log(y);
//        res.send(y.data.response)
//        }).catch(err => {
//          console.log("stage 2", err)
//          res.sendStatus(404);
//        })
//      }
//     }
//   }).catch(err =>{
//     console.log("stage 1")
//     res.sendStatus(404)
//   })
// })
