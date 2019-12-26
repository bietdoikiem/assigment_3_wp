var mongoose = require('mongoose')

mongoose.connect("mongodb://localhost:27017/mydb", { useNewUrlParser: true, useUnifiedTopology: true });

var CourseSchema = new mongoose.Schema({
    id: String,
    name: String
})

module.exports = mongoose.model('courses', CourseSchema);