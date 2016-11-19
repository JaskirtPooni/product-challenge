function ProductResource() {
    var that = this;
    that.catalog = new Array();

    that.get = function(req, res, next) {
        res.send(200, that.catalog);
        next();
    };

    that.post = function(req, res, next) {
        if(!req.body.hasOwnProperty('id') || !req.body.hasOwnProperty('name') 
           || !req.body.hasOwnProperty('price') || !req.body.hasOwnProperty('stock')) {
            res.send(500);
        } else  {
            that.catalog.push({
                id :  parseInt(req.body.id),
                name : req.body.name,
                price : parseFloat(req.body.price),
                stock : parseInt(req.body.stock),
                rating : 0,
                numRatings : 0
            });
            res.send(201); 
        }
        next();
    };

    that.del = function(req, res, next) {
        that.catalog = that.catalog.filter(function(x) {
            return x.id !== parseInt(req.params.id);
        });
        res.send(200);
        next();
    };
}

module.exports = new ProductResource();