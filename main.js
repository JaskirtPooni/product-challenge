

var restify = require('restify'),
    port = process.env.PORT || 3000;

var server = restify.createServer({
    name: 'product server'
});


server.use(function(req, res, next) {
    console.log(req.method + ' ' + req.url);
    return next();
});


server.use(restify.bodyParser());
var db = require('./db_client')
.then((db) => {
    var products = require('./product_resource')(db);
    server.get('api/products', products.get);
    server.post('api/products', products.post);
    server.del('api/products/:id', products.del);
});

server.listen(port,function(){
    console.log('server running at ' + port);
});