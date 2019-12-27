var mongoose = require('mongoose')

mongoose.connect("mongodb://localhost:27017/mydb", { useNewUrlParser: true, useUnifiedTopology: true });

var StudentSchema = new mongoose.Schema({
    id: String,
    name: String,
    year: String,
    Student_Photo: {type: String, required: false}
})

module.exports = mongoose.model('students', StudentSchema);
