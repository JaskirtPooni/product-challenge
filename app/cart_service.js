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
            }).catch(err=> {
                throw err;
            });
    }

    function getById(cartId) {
        return cartCollection.findOne({_id : new ObjectID(cartId)})
        .then(results => {
            return results;
        })
        .catch(err=> {
            throw err;
        })
    }

    function post(cart) {
        return cartCollection.insert(cart)
            .then(result => {
                return result;
            })
            .catch((err) => {
                throw err;
            });
    }

    function del(cartId) {
        return cartCollection.deleteOne({_id : new ObjectID(cartId)})
        .then(result => {
            return result;
        })
        .catch((err) => {
            throw err;
        })
    }

    function add(cartId, prodId) {
        return products.getById(prodId)
        .then(product => {
            return getById(cartId)
            .then(cart => {
                var cart_products = cart.products.filter(function (x) {
                    return x.productId == prodId;
                });

                if(cart_products.length > 0){
                    var newNum = cart_products[0].num + 1;
                    if(newNum <= product.stock){
                        return cartCollection.updateOne({_id : new ObjectID(cartId), "products.productId" : new ObjectID(prodId)}, 
                                            { $set: { "products.$.num": newNum }})
                        .then(results => {
                            return results;
                        }).catch(function(err) {
                            throw err;
                        });;
                    } else {
                        return Promise.reject('Update Failed Not enough stock');
                    }
                } else {
                    if(product.stock > 0) {
                        return cartCollection.updateOne({_id : new ObjectID(cartId)},
                                                { $push: { products: {productId: new ObjectID(prodId), num: 1 }}})
                        .then(results => {
                            return results;
                        }).catch(function(err) {
                            throw err;
                        });
                    } else {
                        return Promise.reject('Update Failed Not enough stock');
                    }
                    
                }  
            }).catch(function(err) {
                throw err;
            });
        }).catch(function(err) {
            throw err;
        });
    }

    function remove(cartId, prodId) {
        return products.getById(prodId)
        .then(product => {
            return getById(cartId)
            .then(cart => {
                var products = cart.products.filter(function (x) {
                    return x.productId == prodId;
                });

                if(products.length > 0){
                    var newNum = products[0].num - 1;
                    if(newNum > 0){
                        return cartCollection.updateOne({_id : new ObjectID(cartId), "products.productId" : new ObjectID(prodId)}, 
                                            { $set: { "products.$.num": newNum }})
                        .then(results => {
                            return results;
                        }).catch(function(err) {
                            throw err;
                        });
                    } else {
                        return cartCollection.updateOne({_id : new ObjectID(cartId)},
                                                { $pull: { products: {productId: new ObjectID(prodId)}}})
                        .then(results => {
                            return results;
                        }).catch(function(err) {
                            throw err;
                        });
                    }
                } else {
                    return 'failed';
                }  
            }).catch(function(err) {
                throw err;
            });
        }).catch(function(err) {
            throw err;
        });
    }

    return {getById, get, post, del, add, remove};
}

module.exports = cartService;