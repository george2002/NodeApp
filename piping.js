var fs = require('fs');


var path = "./resources/12345678/test.txt";

var incoming_stream = fs.createReadStream(path);
var outgoing_stream = fs.createWriteStream('copy.docx');



incoming_stream.pipe(outgoing_stream);
