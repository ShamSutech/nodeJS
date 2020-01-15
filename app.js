var createError = require('http-errors');
var express = require('express');
var path = require('path');
var http = require('http');
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var swig = require('swig');
var nodemon = require('nodemon');

//models
require('./models/user')
require('./controller/user-controller')
//routes
var indexRouter = require('./routes/index');


var app = express();
//port
app.set('port',process.env.PORT || 9200);
var swig = new swig.Swig();
// view engine setup
app.engine('html', swig.renderFile);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
// Require static assets from public folder
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname,'css')));
app.use(express.static(path.join(__dirname,'fonts')));
app.use(express.static(path.join(__dirname,'images')));
app.use(express.static(path.join(__dirname,'js')));
app.use(express.static(path.join(__dirname,'fontawsome')));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);

//routes the  pages
app.get('/',function(req,res){
  res.render("index");
});
app.get('/brands-home',function(req,res){
  res.render("brands-home");
});
app.get('/carchartt',function(req,res){
  res.render("carchartt");
});
app.get('/catalogrequest',function(req,res){
  res.render("catalogrequest");
});
app.get('/common',function(req,res){
  res.render("common");
});
app.get('/dummy-owl',function(req,res){
  res.render("dummy-owl");
});
app.get('/kids-school-uniforms',function(req,res){
  res.render("kids-school-uniforms");
});
app.get('/dummy',function(req,res){
  res.render("dummy");
});
app.get('/extra',function(req,res){
  res.render("extra");
});
app.get('/facilities',function(req,res){
  res.render("facilities");
});
app.get('/new-arrivals',function(req,res){
  res.render("new-arrivals");
});
app.get('/gildan-dryblend-t-shirt',function(req,res){
  res.render("gildan-dryblend-t-shirt");
});
app.get('/shop',function(req,res){
  res.render("shop");
});
app.get('/med-couture-brands',function(req,res){
  res.render("med-couture-brands");
});
app.get('/sale-clearance',function(req,res){
  res.render("sale-clearance");
});
app.get('/womenes-scrubs',function(req,res){
  res.render("womenes-scrubs");
});
app.get('/wonderwink-brands',function(req,res){
  res.render("wonderwink-brands");
});
app.get('/mens-scrubs',function(req,res){
  res.render("mens-scrubs");
});
app.get('/Account',function(req,res){
  res.render("Account");
});
app.get('/Login',function(req,res){
  res.render("Login");
});
app.post('/Login',function(req,res){
 var email= req.body.email;
 var password=req.body.password;
 users.findOne({email:email,password:password}, function(req, users){
   if(err){
     console.log(err);
     return res.status(500).send();
   }
   if(!users){
     return res.status(404).send();
   }
   return res.status(200).send();
 })
});
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
http.createServer(app).listen(app.get('port'),function(){
	console.log('Express Server listening on port'+app.get('port'));
	
});


module.exports = app;
