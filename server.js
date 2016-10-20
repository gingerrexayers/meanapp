var express = require('express');
//creates an instance of the express object,
// "sets up the server"
var app = express();

var bp = require('body-parser');
var path = require('path');

var session = require('express-session');
var MemoryStore = session.MemoryStore;

app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
  store: new MemoryStore(),
  expires: new Date(Date.now() + (30 * 86400 * 1000)),
  cookie: { secure: false }
}))

app.use(express.static(path.join(__dirname, "/client")));
app.use(express.static(path.join(__dirname, "/bower_components")));
app.use(bp.json());

//MONGOOSE BEFORE ROUTES
require('./server/config/mongoose.js');
require('./server/config/routes.js')(app);


app.listen(8000, function(){
  console.log('Listening on port 8000');
});
