
// let saveToDB = (temp, response) => {
//   let song = {
//     title : temp.name,
//     artist : temp.artist,
//     type : 'song',
//   }
//   let newSong = new mongoose.songModel(song);
//   newSong.save(err => {
//     if (err) console.log(err);
//     console.log('saved song');
//   })
// }
var querystring = require('querystring');
// const mongoose = require("./db/mongoose_db");
const MongoClient = require('mongodb').MongoClient
var PersonalityInsightsV3 = require('watson-developer-cloud/personality-insights/v3');

var personalityInsights = new PersonalityInsightsV3(credentials.personality);

let getMoviePersonality = (summary) => {
    let params = {
    content: summary,
    raw_scores:true,
    consumption_preferences: true
  }
      personalityInsights.profile(params, (err, profile) => {
        if (err) {console.log('err at personality', err)}
        else {
          // res.send(profile)
          return profile;
        }
      })
  }
  
  
let getPersonality = (req, res) => {
    getLyrics(req, res, (lyrics) => {
      let params = {
        content: lyrics,
        raw_scores:true,
        consumption_preferences: true
      }
      personalityInsights.profile(params, (err, profile) => {
        if (err) {console.log('err at personality', err)}
        else {
          createSongData(profile, req.params.name, req.params.artist)
          res.send(profile)
        }
      })
    })
  }

  
let createSongData = (profile, title, author) => {
    let data = {  profile : profile.data,
      title : title,
      author : author
    }
    saveToMongoDB(data);
  }
  
  let saveToMongoDB = (data) => {
    let uri = "mongodb+srv://chair:"+credentials.mongoDB.password+"@cluster0-kykmw.mongodb.net"  
    MongoClient.connect(uri, (err, client) => {
      var db = client.db("mvc")
      let col = db.collection("items");
      col.update(data, update, {upsert:true});
    })
  }
  