var express = require('express');
var bodyParser = require('body-parser');
var jsonfile = require('jsonfile');
var file = './data.json';

var todos = [];
try {
	todos = jsonfile.readFileSync(file);
}
catch (e) {
	saveTodos();
}

var app = express();
app.use(bodyParser.json());
app.post('/todos', validate);
app.put('/todos/:id', validate);

app.get('/todos', function (req, res) {
	res.json(todos);
});

app.post('/todos', function (req, res) {
	todos.push(req.body);
	saveTodos();
	res.json(req.body);
});

app.put('/todos/:id', function (req, res) {
	const item = todos.find(item => item.id === req.body.id);
	const index = todos.indexOf(item);
	todos[index] = req.body;
	saveTodos();
	res.json(req.body);
});

function validate(req, res, next) {
	if (!req.body.id || !req.body.value) {
		return res.sendStatus(400);
	}
	if (req.body.value.length < 2) {
		res.status("Value should be minimum 2 digits length");
		return res.sendStatus(400);
	}
	next();
}

function saveTodos() {
	jsonfile.writeFileSync(file, todos);
}

app.listen(1906);
console.log('running server on port 1906');