auth = require('./auth.js')();
const Router = require('restify-router').Router;
const router = new Router();

function ProductResource(db) {
    productService = require('./product_service')(db);
    

    //function authenticate(req,res, next) {
      //  auth.authenticate(req, res, next);
        //next();
    //}

    function getById(req, res, next) {
        productService.getById(req.params.id)
        .then(results => {
            res.send(200, results);
        }).catch(function(err) {
            res.send(500);
        });

        next();
    };

    function getAdmin(req, res, next) {
        productService.get({name: 1, stock: 1})
        .then(results =>{
            res.send(200, results);
        })
        next();
    }

    function getCustomer(req, res, next) {
        productService.get({name: 1})
        .then(results =>{
            res.send(200, results);
        })
        next();
    }

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
        var rating = parseFloat(req.body.rating);
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

    router.get('api/products', getCustomer);
    router.get('api/products/:id', getById);
    router.get('api/admin/products', auth.authenticate, getAdmin);
    router.post('api/admin/products', auth.authenticate, post);
    router.del('api/admin/products/:id', auth.authenticate,del);
    router.put('api/products/:id', rate);
    return router;
}

module.exports = ProductResource;
