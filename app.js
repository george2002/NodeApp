var express = require('express');
var app = express();
var fs = require('fs');


app.use(express.json());    /*makes sure it can handle json requests*/
app.use(express.urlencoded());

app.listen(3000);

app.get('/', function(request, response) {
    response.sendfile('./Views/index.html');
});

app.post('/', function(request, response) {
    var token = request.body.token
    response.download("./resources/" + token + "/test2.docx")
});

/*error handler*/
app.use(function(err, req, res, next){
  if (404 == err.status) {
    res.statusCode = 404;
    res.sendfile('./Views/404.html');
  } else {
    next(err);
  }
});


