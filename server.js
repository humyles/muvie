const express = require("express");
const path = require("path");
const app = express();
const port = 3000;
const axios = require('axios')
const SpotifyWebApi = require('spotify-web-api-node');
const credentials = require('./config.js')
var spotifyApi = new SpotifyWebApi(credentials.spotify)
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
  res.sendStatus(200)
});
app.get("/search/:entry", (req, res) => {
  console.log('search', req.params.entry)
  spotifyApi.searchTracks(req.params.entry).then((data) => {
    res.send(data)
  }).catch((err) => {
    res.send(err)
  })
})
app.get("/:id", (req, res) => {
  spotifyApi.getArtistAlbums(req.params.id).then(data => {
    res.send(data)
  }).catch(err => {
    res.send(err)
  }) 
})
app.listen(port, () => console.log("express"));
