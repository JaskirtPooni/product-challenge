function productService(db) {
    var dbClient = db,
        ObjectID = require('mongodb').ObjectID,
        productCollection = dbClient.collection('products'),
        assert = require('assert');

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
            return 'sucess';
        })
        .catch((err) => {
            return err;
        })
    }

    return { get, post, del };
}

module.exports = productService;