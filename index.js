/*
* Primary file for API
*/

//Dependencies

const http = require('http');
var url = require('url');
// The server should respond to all requestst witha string
var server = http.createServer((req,res) =>{
    
    //Get the URL and parse it
    var parsedUrl = url.parse(req.url,true);

    //Get the path
    var path = parsedUrl.pathname;
    var trimmedPath = path.replace(/^\/+|\/+$/g,'');

    //Get the query string as an object
    var queryStringObject = parsedUrl.query;

    //Get the http method
    var method = req.method;
    method = method.toLowerCase();

    //Send the response
    res.end('Hello World!');

    //Log the request path
    console.log('Request received on path: '+trimmedPath
    +' with method: '+method
    +' with these quesry string parameters: ',queryStringObject);
})
//Start the server and have it listen on port 3000
server.listen(3000, ()=>{
    console.log('The server is listening on port 3000');
});
