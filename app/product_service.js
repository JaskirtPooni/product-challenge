function productService(db) {
    var dbClient = db,
        ObjectID = require('mongodb').ObjectID,
        productCollection = dbClient.collection('products'),
        assert = require('assert');
    
    /**
   * Retrieves a list of products from the database
   * @param projection is used to specify the fields that should be returned, the format is {field: 1}
   * @return a promise telling you the list was fetched successfully or an error has occurred
   */
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

    /**
   * Retrieves a product from the database by Id
   * @param productId is the Id of the product to retrieve
   * @return a promise telling you the product was fetched successfully or an error has occurred
   */
    function getById(productId) {
        return productCollection.findOne({_id : new ObjectID(productId)})
        .then(results => {
            return results;
        }).catch(err=> {
            throw err;
        })
    }

    /**
   * Creates a new product
   * @param product contains the data for the new product
   * @return a promise telling you the product was created successfully or an error has occurred
   */
    function post(product) {
        return productCollection.insert(product)
        .then(result => {
            return result;
        }).catch((err) => {
            throw err;
        });
    }

    /**
   * Deletes a product from the database by Id
   * @param productId is the Id of the product to delete
   * @return a promise telling you the product was deleted successfully or an error has occurred
   */
    function del(productId) {
        return productCollection.deleteOne({_id : new ObjectID(productId)})
        .then(results => {
            return results;
        }).catch((err) => {
            throw err;
        })
    }

    /**
   * Updates the rating of a product from the database by Id
   * @param productId is the Id of the product to rate
   * @param rating is the rating the customer would like to rate the product
   * @return a promise telling you the rating was updated successfully or an error has occurred
   */
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