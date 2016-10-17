var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var port = 3000;

mongoose.connect('mongodb://localhost:27017/rest');

var contactSchema = new mongoose.Schema({
	id: Number,
	name: String,
	email: String
});

var contact = mongoose.model('contact', contactSchema);

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', function(req, res) {
	res.send('REST API Root');
})

app.get('/contacts', function(req, res) {
	contact.find({}).exec(function(err, contact) {
		if(err) {
			res.status(500).send();
		} else {
			console.log(contact);
			res.json(contact);
		}
	})
})

app.get('/contact/:id', function(req, res) {
	contact.findOne({
		id: req.params.id
	}).exec(function(err, contact) {
		if(err) {
			res.status(500).send();
		} else {
			console.log(contact);
			res.json(contact);
		}
	})
})

app.post('/contact', function(req, res) {
	contact.create(req.body, function(err, contact) {
		if(err) {
			res.status(500).send('can\'t post')
		} else {
			console.log(contact);
			res.json(contact);
		}
	})
})

app.listen(port, function() {
	console.log('Listening on port : ' + port);
})