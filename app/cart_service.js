function cartService(db) {
    var dbClient = db,
        products = require('./product_service')(db),
        ObjectID = require('mongodb').ObjectID,
        cartCollection = dbClient.collection('carts'),
        assert = require('assert');

    /**
   * Retrieves list of carts from database
   * @return a promise telling you the list was fetched successfully or an error has occurred
   */
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

    /**
   * Retrieves cart from the database
   * @param cartId is the Id of the cart to retrieve
   * @return a promise telling you the cart was fetched successfully or an error has occurred
   */
    function getById(cartId) {
        return cartCollection.findOne({_id : new ObjectID(cartId)})
        .then(results => {
            return results;
        })
        .catch(err=> {
            throw err;
        })
    }

    /**
   * Adds a new cart to the database
   * @param cart is an object containing the current products in the cart
   * @return a promise telling you the cart was stored successfully or an error has occurred
   */
    function post(cart) {
        return cartCollection.insert(cart)
            .then(result => {
                return result;
            })
            .catch((err) => {
                throw err;
            });
    }

    /**
   * Deletes a cart to the database
   * @param cartId is the Id of the cart to delete
   * @return a promise telling you the cart was deleted successfully or an error has occurred
   */
    function del(cartId) {
        return cartCollection.deleteOne({_id : new ObjectID(cartId)})
        .then(result => {
            return result;
        })
        .catch((err) => {
            throw err;
        })
    }

    /**
   * Adds a product to an existing cart, if the quantity of the product in the cart will exceed the stock available,
   * the update will not occur
   * @param cartId is the Id of the cart to add the product to
   * @param prodId is the Id of the product to add
   * @return a promise telling you the update was completed successfully or an error has occurred
   */
    function add(cartId, prodId) {
        // check if the product exists 
        return products.getById(prodId)
        .then(product => {
            // check if the cart exists
            return getById(cartId)
            .then(cart => {
                // check if the cart already contains the product
                var cart_products = cart.products.filter(function (x) {
                    return x.productId == prodId;
                });

                if(cart_products.length > 0){
                    // if the product already exists in the cart, calculate the new quantity and update the cart
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
                        // return an error if there is not enough stock available
                        return Promise.reject('Update Failed Not enough stock');
                    }
                } else {
                    if(product.stock > 0) {
                        // if the product does not already exist in the cart, add it to the cart
                        return cartCollection.updateOne({_id : new ObjectID(cartId)},
                                                { $push: { products: {productId: new ObjectID(prodId), num: 1 }}})
                        .then(results => {
                            return results;
                        }).catch(function(err) {
                            throw err;
                        });
                    } else {
                        // return an error if there is not enough stock available
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

   /**
   * Removes a product from an existing cart
   * @param cartId is the Id of the cart to remove the product from
   * @param prodId is the Id of the product to remove
   * @return a promise telling you the update was completed successfully or an error has occurred
   */
    function remove(cartId, prodId) {
        // check the product exists
        return products.getById(prodId)
        .then(product => {
            //check the cart exists
            return getById(cartId)
            .then(cart => {
                // check if the product is in the cart
                var products = cart.products.filter(function (x) {
                    return x.productId == prodId;
                });

                if(products.length > 0){
                    var newNum = products[0].num - 1;
                    if(newNum > 0){

                        // if the new quanity of the product is greater than 0 update the cart
                        return cartCollection.updateOne({_id : new ObjectID(cartId), "products.productId" : new ObjectID(prodId)}, 
                                            { $set: { "products.$.num": newNum }})
                        .then(results => {
                            return results;
                        }).catch(function(err) {
                            throw err;
                        });
                    } else {
                        // if the new quanity of the product is 0 remove it from the cart
                        return cartCollection.updateOne({_id : new ObjectID(cartId)},
                                                { $pull: { products: {productId: new ObjectID(prodId)}}})
                        .then(results => {
                            return results;
                        }).catch(function(err) {
                            throw err;
                        });
                    }
                } else {
                    // return error that the product is not in the cart
                    return Promise.reject('Update Failed product not found in cart');
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