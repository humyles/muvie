const express = require("express");
const path = require("path");
const app = express();
const axios = require("axios");
const SpotifyWebApi = require("spotify-web-api-node");
const credentials = require("./config.js");
const cheerio = require("cheerio");
var redis = require("redis");
var NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');

client = redis.createClient('6379', '34.73.165.103');
client.on("error", function (err) {
    console.log(err);
});
client.on('connect', function() {
    console.log('Redis');
});

var spotifyApi = new SpotifyWebApi(credentials.spotify);
spotifyApi.clientCredentialsGrant().then(
  function(data) {
    console.log('The access token expires in ' + data.body['expires_in']);
    console.log('The access token is ' + data.body['access_token']);

    // Save the access token so that it's used in future calls
    spotifyApi.setAccessToken(data.body['access_token']);
  },
  function(err) {
    console.log('Something went wrong when retrieving an access token', err);
  }
);

var naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1(credentials.watson);

let getMovie = (req, res, text) => {
  let temp = text.split(' ');
  console.log('search for' , temp[0])
  let params = {
    params : {
        page : '1',
        query : temp[0],
        api_key : credentials.movieDB.apikey
    }
  }
  axios.get('https://api.themoviedb.org/3/search/movie', params).then(result => {
  console.log('moviekey',req.params.name + req.params.artist, 'value', JSON.stringify(result.data.results[0]));
  client.set(req.params.name + req.params.artist, JSON.stringify(result.data.results[0]), redis.print)
  res.send(result.data.results[0]);
  }).catch((err) => {
    console.log(err);
    res.send(err);
  })
}


let getNLU = (req ,res) => {
  getLyrics(req,res, (lyrics) => {
    let parameters = {
      text: lyrics,
      features : {
        entities : {
          emotion : true,
          limit : 3
        },
        keywords : {
          emotion : true,
          limit : 3
        }
    }
  }
    naturalLanguageUnderstanding.analyze(parameters, (err, response) => {
      if ( err) console.log('err at analyze', err)
      else {
        // saveToDB(temp, response)
        getMovie(req, res, response.keywords[0].text);
      }
    })
  })
}

let getLyrics = (req, res, cb) => {
  //stage 1
  axios
    .get("https://api.genius.com/search", {
      params: credentials.genius,
      data: { q: req.params.name }
    })
    .then(x => {
      for (let i = 0; i < x.data.response.hits.length; i++) {
        let artistName = x.data.response.hits[i].result.primary_artist.name;
        if (req.params.artist.includes(artistName)) {
          let page = x.data.response.hits[i].result.url;
          //stage 2
          axios
            .get(page)
            .then(res2 => {
              let $ = cheerio.load(res2.data);
              let lyrics = $(".lyrics").text()
              cb(lyrics);
            })
            .catch(err => {
              console.log("stage 2", err);
              res.sendStatus(404);
            });
        }
      }
    })
    .catch(err => {
      console.log(err, "stage 1");
      res.sendStatus(404);
    });
}

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendStatus(200);
});

app.get("/search/:entry", (req, res) => {
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
  // getPersonality(req, res);
  client.get(req.params.name + req.params.artist, (err, result) => {
    if (err) {console.log(err)}
    else if (result) {
      console.log('cached', result);
      res.send(JSON.parse(result))
    }
    else {    
      getNLU(req, res)
    }
  })
});

app.get("/movie/:text", (req, res) => {
  console.log(req.params.text);
  getMovie(res, req.params.text);
})

app.get("/id/:id", (req, res) => {
  spotifyApi
    .getArtistAlbums(req.params.id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.send(err);
    });
});
app.listen(process.env.PORT || 3000, () => console.log("express"));

