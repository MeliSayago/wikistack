const express = require('express');
const morgan = require('morgan');
const nunjucks = require('nunjucks');
const routes = require('./routes/index.js');
const bodyParser = require('body-parser');
var app = express();
var models = require('./models');

app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json());

app.use(morgan('tiny'));

var env = nunjucks.configure('views', {noCache: true});

app.set('view engine', 'html');

app.engine('html', nunjucks.render);

app.use(express.static('public'));

app.use('/',routes)

models.db.sync({force: false})
.then(function () {
    // asegurate de reemplazar el nombre de abajo con tu app de express
    app.listen(3001, function () {
        console.log('Server is listening on port 3001!');
    });
})
.catch(console.error);