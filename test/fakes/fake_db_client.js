function dbClient(){

    function collection(collectionName) {
        if (collectionName == 'products'){
            
            return require('./fake_product_collection')();
        } else if (collectionName == 'carts') {
            return require('./fake_cart_collection')();
        }
    }

    return {collection};
}

module.exports = dbClient;