var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/mvc')
// let pw = "4PqbKvziOyxiClGI"
// let uri = "mongodb+srv://chair:"+pw+"@cluster0-kykmw.mongodb.net/amazon?retryWrites=true"
// mongoose.connect(uri)

var db = mongoose.connection;


db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('mongoose')    
});

var songSchema = new mongoose.Schema({
    title: String,
    artist: String,
    type: String,
})

var songModel = mongoose.model('Song', songSchema) 


var movieSchema = new mongoose.Schema({
    title: String,
    type: String,
    watson: []
})

var movieModel = mongoose.model('Movie', movieSchema) 

module.exports = {
    songModel : songModel,
    movieModel : movieModel, 
    connection :db
}