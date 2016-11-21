expect = require('chai').expect;
dbClient = require('./fakes/fake_db_client')();
cartService = require('../app/cart_service')(dbClient);

carts = [
  {
    "_id": "5831558452a9495d8c6062fd",
    "products":[]
  },
  {
    "_id": "583155c352a9495d8c6062ff",
    "products":[]
  },
  {
    "_id": "583155c352a9495d8c6062fe",
    "products":[]
  },
  {
    "_id": "583155c352a9495d8c6062af",
    "products":[]
  },
  {
    "_id": "583155c352a9495d8c6062bf",
    "products":[]
  },
  {
    "_id": "583155c352a9495d8c6062ae",
    "products":[]
  },

];

cart_products = [
  {
    "_id": "583155c352a9495d8c6062fc",
    "name": "fail",
    "stock": 10,
    "rating":0,
    "numRatings":0
  },
  {
    "_id": "583155c352a9495d8c6062fb",
    "name": "wow",
    "stock": 0,
    "rating":0,
    "numRatings":0
  },
  {
    "_id": "683155c352a9495d8c6062fb",
    "name": "wow",
    "stock": 1,
    "rating":0,
    "numRatings":0
  }
];

describe('Cart Service', () => {
  describe('Post Function', () => {
      it('succesfully add cart to database', (done) => {
              cartService.post(carts[0])
              .then(result=>{
                  console.log("GONE");
                  expect(result).to.equal('Insert Succeeded');
                  done();
              }).catch(err=>{
                  expect(true).to.equal(false);
                  done();
              });
            
      });

      it('fail to add cart to database', (done) => {
              cartService.post(carts[1])
              .then(result=>{
                  expect(true).to.equal(false);
                  done();
              }).catch(err=>{
                  expect(err).to.equal('Insert Failed');
                  done();
              }); 
      });
  });

  describe('Del Function', () => {
      it('succesfully delete cart from database', (done) => {
              cartService.del(carts[0]._id)
              .then(result=>{
                  expect(result).to.equal('Delete Succeeded');
                  done();
              }).catch(err=>{
                  expect(true).to.equal(false);
                  done();
              });
            
      });

      it('fail to delete cart from database', (done) => {
              cartService.del(carts[1]._id)
              .then(result=>{
                  expect(true).to.equal(false);
                  done();
              }).catch(err=>{
                  expect(err).to.equal('Delete Failed');
                  done();
              }); 
      });
  });

  describe('Get Function', () => {
      it('succesfully get cart from database', (done) => {
              cartService.get()
              .then(result=>{
                  expect(result).to.equal('Find Succeeded');
                  done();
              }).catch(err=>{
                  expect(true).to.equal(false);
                  done();
              });
            
      });
  });

  describe('GetById Function', () => {
      it('succesfully get cart from database', (done) => {
              cartService.getById(carts[0]._id)
              .then(result=>{
                  expect(result).to.equal('Find Succeeded');
                  done();
              }).catch(err=>{
                  expect(true).to.equal(false);
                  done();
              });
            
      });

      it('failed to get cart from database', (done) => {
              cartService.getById(carts[1]._id)
              .then(result=>{
                  expect(true).to.equal(false);
                  done();
              }).catch(err=>{
                  expect(err).to.equal('Find Failed');
                  done();
              }); 
      });
  });

  describe('Add Function', () => {
    it('added product that does not exist', (done) => {
              cartService.add(carts[1]._id, cart_products[0]._id)
              .then(result=>{
                  expect(true).to.equal(false);
                  done();
              }).catch(err=>{
                  expect(err).to.equal('Find Failed');
                  done();
              }); 
    });

    it('added product to cart that does not exist', (done) => {
              cartService.add(carts[1]._id, cart_products[1]._id)
              .then(result=>{
                  expect(true).to.equal(false);
                  done();
              }).catch(err=>{
                  expect(err).to.equal('Find Failed');
                  done();
              }); 
    });

    it('failed to increase existing product quantity due to stock', (done) => {
              cartService.add(carts[3]._id, cart_products[1]._id)
              .then(result=>{
                  expect(true).to.equal(false);
                  done();
              }).catch(err=>{
                  expect(err).to.equal('Update Failed Not enough stock');
                  done();
              }); 
    });

    it('failed to increase existing product quantity', (done) => {
              cartService.add(carts[3]._id, cart_products[2]._id)
              .then(result=>{
                  expect(true).to.equal(false);
                  done();
              }).catch(err=>{
                  expect(err).to.equal('Update Failed');
                  done();
              }); 
    });

    it('failed to increase existing product quantity', (done) => {
              cartService.add(carts[4]._id, cart_products[2]._id)
              .then(result=>{
                  expect(result).to.equal('Update Succeeded');
                  done();
              }).catch(err=>{
                  expect(true).to.equal(false);
                  done();
              }); 
    });

    it('failed to increase new product quantity due to stock', (done) => {
              cartService.add(carts[2]._id, cart_products[1]._id)
              .then(result=>{
                  expect(true).to.equal(false);
                  done();
              }).catch(err=>{
                  expect(err).to.equal('Update Failed Not enough stock');
                  done();
              }); 
    });

    it('failed to increase new product quantity', (done) => {
              cartService.add(carts[2]._id, cart_products[2]._id)
              .then(result=>{
                  expect(true).to.equal(false);
                  done();
              }).catch(err=>{
                  expect(err).to.equal('Update Failed');
                  done();
              }); 
    });

    it('failed to increase new product quantity', (done) => {
              cartService.add(carts[5]._id, cart_products[2]._id)
              .then(result=>{
                  expect(result).to.equal('Update Succeeded');
                  done();
              }).catch(err=>{
                  expect(true).to.equal(false);
                  done();
              }); 
    });
  });

});