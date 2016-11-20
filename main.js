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
server.use(restify.authorizationParser());

var db = require('./db_client')
.then((db) => {
    var product_router = require('./product_resource')(db);
    var cart_router = require('./cart_resource')(db);
    cart_router.applyRoutes(server);
    product_router.applyRoutes(server);
});

server.listen(port,function(){
    console.log('server running at ' + port);
});