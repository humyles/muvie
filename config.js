let spotify = {
  clientId: "a9f36afac4214f72b64bc8c2996ec160",
  clientSecret: "80065933f86848939e645253e396680e",
  redirectUri: "http://localhost:3000/callback",
  accessToken: "BQDKgz2hi8enJNgXywT_UsknzK_ws4j-vybHFp2xOxUFNPybDIRxQ8v3KEHcB8_Sbd83z81BKdlLOadaS8o"
};

let genius = {
    client_id: "ijk2_pSoC_ohVOrwB4KaH10v509ME48n57M3K7SA9f-AjzTGfySP8fJWqLsTAs6v",
    client_secret: "FdAMSIrt7IUa9Rm0UU7GlAF_SdxERQRH3f6_dRrTFAe750ZsBP3pdf8XZZf9kfEmLHaF254lDo4nWspWABy8HQ",
    access_token: "KgbzxXvU_VV4_YbbzAhmTmAcrZ9y6SOJQAYdjZPao0kWl78P33jT4kr1ZPGvwHDp"
}

let watson = {
  version: '2018-11-16',
  iam_apikey : "KwH7ulQyFxhtMkw0lZfVGCCHoOAxZJJzLNPexgIW5TqQ",
  url: "https://gateway.watsonplatform.net/natural-language-understanding/api"
}

let watsonPersonality = {
  version_date: '2017-10-13',
  iam_apikey: 'TbyK0hZw9ht-LMWJXPo0KzqMCCzqf0E-4QcyFMv03oGh',
  url: 'https://gateway.watsonplatform.net/personality-insights/api'
}

let movieDB = {
  apikey : 'cabb81b5f45125f02e2d9a77f949a80e',
  v4 : 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYWJiODFiNWY0NTEyNWYwMmUyZDlhNzdmOTQ5YTgwZSIsInN1YiI6IjVjNWRmZTJhOTI1MTQxMzM3Y2JjYmJiMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HqhfhU2Ul_w9TBsOl3W9PIjHwuewHqw8FNIpb19_IJ0',

}

let mongoDB = {
  password: "4PqbKvziOyxiClGI"
}
module.exports = {
  spotify: spotify,
  genius: genius,
  watson: watson,
  personality : watsonPersonality,
  movieDB : movieDB,
  mongoDB : mongoDB,
};
