/*
* Primary file for API
*/

//Dependencies

const http = require('http');
var url = require('url');
var stringDecoder = require('string_decoder').StringDecoder;
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

    

    //Get the headers as an object
    var headers = req.headers;

    //Get the payload if any

    var decoder = new stringDecoder('utf-8');
    var buffer = '';
    req.on('data',(data)=>{
        buffer += decoder.write(data);
    });
    req.on('end',()=>{
        buffer += decoder.end();

        // Choose the handler request should go to 
        var chosenHandler = typeof(router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notfound;
        //Construct data object for handler
        var data = {
            'trimmedPath': trimmedPath,
            'queryStringObject': queryStringObject,
            'method': method,
            'headers': headers,
            'payload': buffer
        };

        chosenHandler(data,(statusCode,payload)=>{
           
            statusCode = typeof(statusCode) == 'number' ? statusCode : 200;
            console.log("Payload before condition: "+payload);
            payload = typeof(payload) == 'Object' ? payload : {};
            console.log(typeof(payload) == 'object');
            console.log(payload);
            var payloadString = JSON.stringify(payload);
            res.writeHead(statusCode);
            res.end(payloadString);
            console.log('Request received on path: '+trimmedPath
            +' with method: '+method
            +' with these query string parameters: ',queryStringObject);
            console.log(' Request received with headers: ',headers);
            console.log('Returning This response: ',statusCode,payloadString);
        });


        //Send the response
        
        //Log the request path
        
    });

    
})
//Start the server and have it listen on port 3000
server.listen(3000, ()=>{
    console.log('The server is listening on port 3000');
});

//Defining Handlers
var handlers = {};
handlers.sample = (data,callback)=>{
    //callback a http status code and payload object
    callback(406,{'name':'sample handler'});
};
//Not found handlers
handlers.notfound = (data,callback)=>{
    callback(404);
};

//Defining a request router
var router = {
    'sample' : handlers.sample
}