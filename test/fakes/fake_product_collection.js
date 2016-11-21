function fake_product_collection(){

    function find(filter, projection) {
            if (projection == 'fail') {
                return { 
                    toArray() {
                        return Promise.reject('Find Failed');
                    }
                }
            } else {
                return { 
                    toArray() {
                        return Promise.resolve('Find Succeeded');
                    }
                } 
            }
    }

    function findOne(filter) {
        if (filter._id == '5831558452a9495d8c6062fa') {
            return Promise.resolve('Find Succeeded');   
        } else if (filter._id == '583155c352a9495d8c6062fb') {
            return Promise.resolve({
                rating: 5,
                numRatings: 1,
                stock: 0
            }); 
        } else if (filter._id == '683155c352a9495d8c6062fb') {
            return Promise.resolve({
                stock: 6
            }); 
        } else{
            return Promise.reject('Find Failed');
        }
    }
    
    function insert(product) {     
        if (product.name == 'fail') {
            return Promise.reject('Insert Failed');
        } else {
            return Promise.resolve('Insert Succeeded');
        }
    }

    function deleteOne(filter) {
        if (filter._id == '5831558452a9495d8c6062fa') {
            return Promise.resolve('Delete Succeeded');
        } else {
            return Promise.reject('Delete Failed');
        }
    }

    function updateOne(filter, product) {
        if (product.$set.rating == 5) {
            return Promise.reject('Update Failed');
        } else {
            return Promise.resolve(product.$set);
        }

    }

    return {find, findOne, insert, deleteOne, updateOne};
}

module.exports = fake_product_collection;