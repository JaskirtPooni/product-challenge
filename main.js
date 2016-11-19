var restify = require('restify'),
    port = process.env.PORT || 3000,
    products = require('./product_resource');

var server = restify.createServer({
    name: 'product server'
});

server.use(function(req, res, next) {
    console.log(req.method + ' ' + req.url);
    return next();
});

server.use(restify.bodyParser());

server.get('api/products', products.get);
server.post('api/products', products.post);
server.del('api/products/:id', products.del);

server.listen(port,function(){
    console.log('server running at ' + port);
});