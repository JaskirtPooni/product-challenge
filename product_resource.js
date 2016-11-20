function ProductResource(db) {
   
    productService = require('./product_service')(db);

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

    return {get,post,del};
}

module.exports = ProductResource;
