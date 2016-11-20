function productService(db) {
    var dbClient = db,
        ObjectID = require('mongodb').ObjectID,
        productCollection = dbClient.collection('products'),
        assert = require('assert');

    function getById(productId) {
        return productCollection.find({_id : new ObjectID(productId)}).toArray()
        .then(results => {
            return results;
        })
        .catch(err=> {
            return err;
        })
    }

    function get() {
        return productCollection.find({}).toArray()
            .then(results => {
                console.log("Found the following products");
                console.log(results);
                return results;
            });
    }

    function post(product) {
        return productCollection.insert(product)
            .then(function () {
                return 'success';
            })
            .catch((err) => {
                return err;
            });
    }

    function del(productId) {
        return productCollection.deleteOne({_id : new ObjectID(productId)})
        .then(results => {
            return 'success';
        })
        .catch((err) => {
            return err;
        })
    }

    function rate(productId, rating) {
        return getById(productId)
        .then(product => {
            var newNumRatings = parseInt(product[0].numRatings) + 1;
            var newRating = (parseInt(product[0].numRatings)*parseFloat(product[0].rating) + rating) / newNumRatings;
            
            productCollection.updateOne({_id : new ObjectID(productId)}, 
                                        { $set: { numRatings : newNumRatings, rating : newRating}})
            .then(results => {
                return 'success';
            })
        }).catch(function(err) {
            res.send(500);
        });
    }

    return {getById, get, post, del, rate };
}

module.exports = productService;