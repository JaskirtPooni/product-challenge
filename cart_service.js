function cartService(db) {
    var dbClient = db,
        products = require('./product_service')(db),
        ObjectID = require('mongodb').ObjectID,
        cartCollection = dbClient.collection('carts'),
        assert = require('assert');

    function get() {
        return cartCollection.find({}).toArray()
            .then(results => {
                console.log("Found the following carts");
                console.log(results);
                return results;
            });
    }

    function getById(cartId) {
        return cartCollection.findOne({_id : new ObjectID(cartId)})
        .then(results => {
            return results;
        })
        .catch(err=> {
            return err;
        })
    }

    function post(cart) {
        return cartCollection.insert(cart)
            .then(function () {
                return 'success';
            })
            .catch((err) => {
                return err;
            });
    }

    function del(cartId) {
        return cartCollection.deleteOne({_id : new ObjectID(cartId)})
        .then(results => {
            return 'success';
        })
        .catch((err) => {
            return err;
        })
    }

    function add(cartId, prodId) {
        return products.getById(prodId)
        .then(product => {
            getById(cartId)
            .then(cart => {
                var products = cart.products.filter(function (x) {
                    return x.productId == prodId;
                });

                if(products.length > 0){
                    var newNum = products[0].num + 1;
                    if(newNum <= product.stock){
                        cartCollection.updateOne({_id : new ObjectID(cartId), "products.productId" : new ObjectID(prodId)}, 
                                            { $set: { "products.$.num": newNum }})
                        .then(results => {
                            return 'success';
                        });
                    } else {
                        return 'failed';
                    }
                } else {
                    cartCollection.updateOne({_id : new ObjectID(cartId)},
                                                { $push: { products: {productId: new ObjectID(prodId), num: 1 }}})
                    .then(results => {
                        return 'success';
                    }).catch(function(err) {
                        return err;
                    });
                }  
            }).catch(function(err) {
                return err;
            });
        }).catch(function(err) {
            res.send(500);
        });
    }

    function remove(cartId, prodId) {
        return products.getById(prodId)
        .then(product => {
            getById(cartId)
            .then(cart => {
                var products = cart.products.filter(function (x) {
                    return x.productId == prodId;
                });

                if(products.length > 0){
                    var newNum = products[0].num - 1;
                    if(newNum > 0){
                        cartCollection.updateOne({_id : new ObjectID(cartId), "products.productId" : new ObjectID(prodId)}, 
                                            { $set: { "products.$.num": newNum }})
                        .then(results => {
                            return 'success';
                        }).catch(function(err) {
                            return err;
                        });
                    } else {
                        cartCollection.updateOne({_id : new ObjectID(cartId)},
                                                { $pull: { products: {productId: new ObjectID(prodId)}}})
                        .then(results => {
                            return 'success';
                        }).catch(function(err) {
                            return err;
                        });
                    }
                } else {
                    return 'failed';
                }  
            }).catch(function(err) {
                return err;
            });
        }).catch(function(err) {
            res.send(500);
        });
    }

    return {getById, get, post, del, add, remove};
}

module.exports = cartService;