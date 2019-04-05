const axios = require("axios");
const credentials = require("./config.js");


  // exports.getMovie = (res, text) => {
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
  
exports.getMovie = (res, text) => {
    let params = {
      params : {
          page : '1',
          api_key : credentials.movieDB.apikey
      }
    }
    axios.get('https://api.themoviedb.org/3/movie/top_rated', params).then(result => {
    console.log('getmovie',result.data.results);
    for (let i =0 ; i< result.data.results.length; i++) {
      getMoviePersonality(result.data.results[i].overview);
    }
    findClosestMatch();
    }).catch((err) => {
      console.log(err);
      res.send(err);
    })
  }
  exports.getMoviePersonality = (summary) => {
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