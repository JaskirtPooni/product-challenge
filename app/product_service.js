function productService(db) {
    var dbClient = db,
        ObjectID = require('mongodb').ObjectID,
        productCollection = dbClient.collection('products'),
        assert = require('assert');

    function get(projection) {
        return productCollection.find({}, projection).toArray()
        .then(results => {
            console.log("Found the following products");
            console.log(results);
            return results;
        }).catch(err=> {
            throw err;
        })
    }

    function getById(productId) {
        return productCollection.findOne({_id : new ObjectID(productId)})
        .then(results => {
            return results;
        }).catch(err=> {
            throw err;
        })
    }

    function post(product) {
        return productCollection.insert(product)
        .then(result => {
            return result;
        }).catch((err) => {
            throw err;
        });
    }

    function del(productId) {
        return productCollection.deleteOne({_id : new ObjectID(productId)})
        .then(results => {
            return results;
        }).catch((err) => {
            throw err;
        })
    }

    function rate(productId, rating) {
        return getById(productId)
        .then(product => {
            var newNumRatings = parseInt(product.numRatings) + 1;
            var newRating = (parseInt(product.numRatings)*parseFloat(product.rating) + rating) / newNumRatings;
            
            return productCollection.updateOne({_id : new ObjectID(productId)}, 
                                               { $set: { numRatings : newNumRatings, rating : newRating}})
            .then(results => {
                return results;
            }).catch(err => {
                throw err;
            });
        }).catch(function(err) {
            throw err;
        });
    }

    return {getById, get, post, del, rate };
}

module.exports = productService;