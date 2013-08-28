var express = require("express"),
    app = express();

app.set('view engine', 'jade');
app.set('views', './');

// The bodyParser, cookieParser, and session middlewares are required for express-persona
// If you don't want to use express' session middle, you could also use `client-sessions`
app.use(express.logger())
   .use(express.bodyParser())
   .use(express.cookieParser())
   .use(express.session({
     secret: "mozillapersona"
   }))
   .use(app.router);


app.get('/', function (req, res) {
  res.render('index', {
    email: req.session.email
  });
});

app.get('/get', function (req, res) {
  console.log(req.session)
  res.render('get', {
    email: req.session.email
  });
});

app.get('/watch', function (req, res) {
  res.render('watch', {
    email: req.session.email
  });
});

// This is how you include express-persona in your app
// In your own app you should use `require("express-persona")`
// You *must* specify the audience option
require("../index.js")(app, { 
  audience: "http://jehan2.pagekite.me" 
});

app.listen(3000, function() {
  console.log('HTTP server started on http://localhost:3000');
  console.log('Press Ctrl+C to stop');
});
