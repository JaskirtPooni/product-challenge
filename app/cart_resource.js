const Router = require('restify-router').Router;
const router = new Router();

function CartResource(db) {
    cartService = require('./cart_service')(db);

    // function to retrieve list of carts
    function get(req, res, next) {
        cartService.get()
        .then(results =>{
            res.send(200, results);
        })
        next();
    }

    // function to create new cart
    function post(req, res, next) {
        cartService.post({
            products : []
        }).then(function(result) {
            res.send(201);
        }).catch(function(err) {
            res.send(500);
        });
        next();
    };

    // function to delete cart
    function del(req, res, next) {
        cartService.del(req.params.id)
        .then(function(result) {
            res.send(200);
        }).catch(function(err) {
            res.send(500);
        });

        next();
    };

    // function to add product to cart
    function add(req, res, next) {
        cartService.add(req.params.id, req.body.productId)
        .then(function(result) {
            res.send(200);
        }).catch(function(err) {
            res.send(500);
        });
    
        next();
    };

    // function to remove product from cart
    function remove(req, res, next) {
        cartService.remove(req.params.id, req.body.productId)
        .then(function(result) {
            res.send(200);
        }).catch(function(err) {
            res.send(500);
        });
    
        next();
    };

    // register routes with restify router
    router.get('api/cart', get);
    router.post('api/cart', post);
    router.del('api/cart/:id', del);
    router.put('api/cart/add/:id', add);
    router.put('api/cart/remove/:id', remove);
    return router;
}

module.exports = CartResource;
