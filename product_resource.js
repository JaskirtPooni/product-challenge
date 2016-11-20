const Router = require('restify-router').Router;
const router = new Router();

function ProductResource(db) {
    productService = require('./product_service')(db);

    function getById(req, res, next) {
        productService.getById(req.params.id)
        .then(results => {
            res.send(200, results);
        }).catch(function(err) {
            res.send(500);
        });

        next();
    };

    function get(req, res, next) {
        productService.get()
        .then(results =>{
            res.send(200, results);
        })
        next();
    };

    function post(req, res, next) {
        if(!req.body.hasOwnProperty('name') || !req.body.hasOwnProperty('price') || !req.body.hasOwnProperty('stock')) {
            res.send(500);
        } else  {
            productService.post({
                name : req.body.name,
                price : parseFloat(req.body.price),
                stock : parseInt(req.body.stock),
                rating : 0,
                numRatings : 0
            }).then(function(result) {
                res.send(201);
            }).catch(function(err) {
                res.send(500);
            });
        }
        next();
    };

    function del(req, res, next) {
        productService.del(req.params.id)
        .then(function(result) {
            res.send(200);
        }).catch(function(err) {
            res.send(500);
        });

        next();
    };

    function rate(req, res, next) {
        var rating = parseInt(req.params.rating);
        if(rating >= 1 && rating <= 10) {
            productService.rate(req.params.id, rating)
            .then(function(result) {
                res.send(200);
            }).catch(function(err) {
                res.send(500);
            });
        }
    
        next();
    };

    router.get('api/products/:id', getById)
    router.get('api/products', get);
    router.post('api/products', post);
    router.del('api/products/:id', del);
    router.put('api/products/:id/:rating', rate);
    return router;
}

module.exports = ProductResource;
