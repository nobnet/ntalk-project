var express = require('express')
  , load = require('express-load')
  , cookieParser = require('cookie-parser')
  , session = require('express-session')
  , bodyParser = require('body-parser')
  , methodOverride = require('method-override')
  , error = require('./middleware/error')
  , app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(cookieParser('ntalk'));
app.use(methodOverride());
app.use(session({ resave: true,
                  saveUninitialized: true,
                  secret: 'uwotm8' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));

load('models')
   .then('controllers')
   .then('routes')
   .into(app);

app.use(error.notFound);
app.use(error.serverError);

app.listen(3000, function(){
  console.log("Ntalk no ar.");
});