
const credentials = require("./config.js");
// const mongoose = require("./db/mongoose_db");
const MongoClient = require('mongodb').MongoClient

// exports.saveToDB = (temp, response) => {
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

exports.createData = (data) => {
    return data;
  }
  
  exports.saveToMongoDB = (data) => {
    let uri = "mongodb+srv://chair:"+credentials.mongoDB.password+"@cluster0-kykmw.mongodb.net"  
    MongoClient.connect(uri, (err, client) => {
      let newData = createData(data);
      var db = client.db("mvc")
      let col = db.collection("items");
      col.insertOne(newData);
    })
  }
  
  // let getMovie = (res, text) => {
  //   let params = {
  //     params : {
  //         page : '1',
  //         query : text,
  //         api_key : credentials.movieDB.apikey
  //     }
  //   }
  //   axios.get('https://api.themoviedb.org/3/search/keyword', params).then(result => {
  //   console.log('getmovie',result);
  //   res.send(result.data.results);
  //   }).catch((err) => {
  //     console.log(err);
  //     res.send(err);
  //   })
  // }
  