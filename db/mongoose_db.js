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

var itemSchema = new mongoose.Schema({
    _id: Number,
    id: Number,
    type: String,
    watson: []
})

var itemModel = mongoose.model('Item', itemSchema) 

module.exports.db = {
    model: itemModel,
    connection :db
}