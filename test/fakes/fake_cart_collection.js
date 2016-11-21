function fake_cart_collection(){

    function find(filter) {
        return { 
            toArray() {
                return Promise.resolve('Find Succeeded');
            }
        } 
    }

    function findOne(filter) {
        if (filter._id == '5831558452a9495d8c6062fd') {
            return Promise.resolve('Find Succeeded');   
        } else if (filter._id == '583155c352a9495d8c6062fe') {
            return Promise.resolve({
                products:[]
            }); 
        } else if (filter._id == '583155c352a9495d8c6062ae') {
            return Promise.resolve({
                products:[]
            }); 
        } else if (filter._id == '583155c352a9495d8c6062af') {
            return Promise.resolve({
                products:[
                    {
                        productId: "583155c352a9495d8c6062fb",
                        num: 0
                    },
                    {
                        productId: "683155c352a9495d8c6062fb",
                        num: 1
                    }
                ]
            }); 
        } else if (filter._id == '583155c352a9495d8c6062bf') {
            return Promise.resolve({
                products:[
                    {
                        productId: "583155c352a9495d8c6062fb",
                        num: 0
                    },
                    {
                        productId: "683155c352a9495d8c6062fb",
                        num: 1
                    }
                ]
            }); 
        } else{
            return Promise.reject('Find Failed');
        }
    }
    
    function insert(cart) {     
        if (cart._id == '583155c352a9495d8c6062ff') {
            return Promise.reject('Insert Failed');
        } else {
            return Promise.resolve('Insert Succeeded');
        }
    }

    function deleteOne(filter) {
        if (filter._id == '5831558452a9495d8c6062fd') {
            return Promise.resolve('Delete Succeeded');
        } else {
            return Promise.reject('Delete Failed');
        }
    }

    function updateOne(filter, product) {
        if (filter._id == "583155c352a9495d8c6062af" || filter._id == "583155c352a9495d8c6062fe") {
            return Promise.reject('Update Failed');
        } else {
            return Promise.resolve('Update Succeeded');
        }

    }

    return {find, findOne, insert, deleteOne, updateOne};
}

module.exports = fake_cart_collection;