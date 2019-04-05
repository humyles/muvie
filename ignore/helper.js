const axios = require("axios");
const credentials = require("./config.js");


var naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1(credentials.watson);
var personalityInsights = new PersonalityInsightsV3(credentials.personality);


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


exports.findClosestMatch = () => {

}



exports.getNLU = (req ,res) => {
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
        console.log('nlu', response.keywords[0].text)
        getMovie(res, response.keywords[0].text);
      }
    })
  })
}

exports.getPersonality = (req, res) => {
  getLyrics(req, res, (lyrics) => {
    let params = {
      content: lyrics,
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
  })
}

