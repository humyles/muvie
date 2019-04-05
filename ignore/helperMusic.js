const credentials = require("./config.js");
const cheerio = require("cheerio");

    exports.getLyrics = (req, res, cb) => {
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
