const express = require('express');
var bodyParser = require('body-parser');

const route = require('./routes/route.js');
const { default: mongoose } = require('mongoose');
const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



mongoose.connect("mongodb+srv://Sumit23199702:GNDTTobP3czLn1Hf@cluster0.octcn.mongodb.net/groupXDatabase", {useNewUrlParser: true})
    .then(() => console.log('mongodb is connected'))
    .catch(err => console.log(err))

app.use('/', route);

app.listen(process.env.PORT || 4000, function() {
	console.log('Express app running on port ' + (process.env.PORT || 4000))
});
