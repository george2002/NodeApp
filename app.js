var express = require('express');
var app = express();
var fs = require('fs');
var process = require('child_process');



app.use(express.json());    /*makes sure it can handle json requests*/
app.use(express.urlencoded());

app.listen(5000);


var dyn_html_path = "./Views/chunk_data.html";
var dyn_html_stream = fs.createWriteStream(dyn_html_path);
dyn_html_stream.write("<hr>No Data Yet..</hr>");

/* app.listen(process.env.PORT || 5000);  for Heroku only */ 


app.get('/', function(request, response) {
    response.sendfile('./Views/index.html');
});

app.get('/logs', function(request, response) {
      response.sendfile('./Views/chunk_data.html');
});

app.post('/', function(request, response) {
    var token = request.body.token

    if(token == "12345678"){
       var path = "./resources/" + token + "/test2.docx";
    }
    if(token == "123456789"){
       var path = "./resources/" + token + "/test_mp3.mp3";
    }
    

    var incoming_stream = fs.createReadStream(path);
    var outgoing_stream = fs.createWriteStream("./copy_copy.docx");

    var chunk_counter = 1;

    var dyn_html_stream = fs.createWriteStream(dyn_html_path,function(){
         fs.writeFile(dyn_html_path,"");
    });



    dyn_html_stream.write("<hr>\n");

   

    incoming_stream.on('error', function (error) {
      console.log("Incorrect Path");
    });

    incoming_stream.pipe(outgoing_stream);  /*pipe read to write and save file*/

    incoming_stream.on('data',function(chunk){
      var data = "CHUNK " + chunk_counter++ + "'s size is: " + chunk.length + ' bytes';
      dyn_html_stream.write(data + "<br>");

    });




    incoming_stream.on('end', function(){
      console.log("end of file");
       dyn_html_stream.write("</hr>");
       dyn_html_stream.end();
    });

    



    response.download(path); /*save file*/
	
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


