function fake_product_collection(){

    /**
   * function to mock the find call to the database and the toArray call
   * @param filter to filter search results, but will be ignored for the mock
   * @param projection to filter return fields, but will used to mock a database error
   * @return a promise telling you the list was fetched successfully, or an error message  
   */
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

    /**
   * function to mock the findOne call to the database 
   * @param filter to filter search results, used to provide different mocks for different tests
   * @return a promise either containing a succesfull message, error message, or a mock product for testing
   */
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
    
    /**
   * function to mock the insert call to the database 
   * @param product that has different names to help simulate an error while inserting
   * @return a promise either containing a succesfull message, error message
   */
    function insert(product) {     
        if (product.name == 'fail') {
            return Promise.reject('Insert Failed');
        } else {
            return Promise.resolve('Insert Succeeded');
        }
    }

    /**
   * function to mock the deleteOne call to the database 
   * @param filter to help simulate an error while inserting
   * @return a promise either containing a succesfull message, error message
   */
    function deleteOne(filter) {
        if (filter._id == '5831558452a9495d8c6062fa') {
            return Promise.resolve('Delete Succeeded');
        } else {
            return Promise.reject('Delete Failed');
        }
    }

    /**
   * function to mock the updateOne call to the database 
   * @param filter to filter search results, but will be ingored for mocking
   * @param product that contains a rating to mock an error while updating 
   * @return a promise either containing a succesfull message, error message
   */
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