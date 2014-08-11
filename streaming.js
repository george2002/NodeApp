var fs = require('fs');

var file_path = './resources/391991/f.mp3'

var stream = fs.createReadStream(file_path);
var chunk_counter = 0;

stream.on('error', function (error) {
	console.log("Caught", error);
});



stream.on('data',function(chunk){
	console.log(" CHUNK " + chunk_counter++ + "'s length was: " + chunk.length + ' bytes');
});

stream.on('end', function(){
console.log("end of file");
});