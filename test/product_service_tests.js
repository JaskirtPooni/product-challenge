expect = require('chai').expect;
dbClient = require('./fakes/fake_db_client')();
productService = require('../app/product_service')(dbClient);

products = [
  {
    "_id": "5831558452a9495d8c6062fa",
    "name": "hey",
    "stock": 1,
    "rating":0,
    "numRatings":0
  },
  {
    "_id": "583155c352a9495d8c6062fc",
    "name": "fail",
    "stock": 10,
    "rating":0,
    "numRatings":0
  }
  ,
  {
    "_id": "583155c352a9495d8c6062fb",
    "name": "wow",
    "stock": 10,
    "rating":0,
    "numRatings":0
  }
];

describe('Product Service', () => {
  describe('Post Function', () => {
      it('succesfully add product to database', (done) => {
              productService.post(products[0])
              .then(result=>{
                  expect(result).to.equal('Insert Succeeded');
                  done();
              }).catch(err=>{
                  expect(true).to.equal(false);
                  done();
              });
            
      });

      it('fail to add product to database', (done) => {
              productService.post(products[1])
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
      it('succesfully delete product from database', (done) => {
              productService.del(products[0]._id)
              .then(result=>{
                  expect(result).to.equal('Delete Succeeded');
                  done();
              }).catch(err=>{
                  expect(true).to.equal(false);
                  done();
              });
            
      });

      it('fail to delete product from database', (done) => {
              productService.del(products[1]._id)
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
      it('succesfully get products from database', (done) => {
              productService.get("succeed")
              .then(result=>{
                  expect(result).to.equal('Find Succeeded');
                  done();
              }).catch(err=>{
                  expect(true).to.equal(false);
                  done();
              });
            
      });

      it('failed to get products from database', (done) => {
              productService.get("fail")
              .then(result=>{
                  expect(true).to.equal(false);
                  done();
              }).catch(err=>{
                  expect(err).to.equal('Find Failed');
                  done();
              }); 
      });
  });

  describe('GetById Function', () => {
      it('succesfully get product from database', (done) => {
              productService.getById(products[0]._id)
              .then(result=>{
                  expect(result).to.equal('Find Succeeded');
                  done();
              }).catch(err=>{
                  expect(true).to.equal(false);
                  done();
              });
            
      });

      it('failed to get product from database', (done) => {
              productService.getById(products[1]._id)
              .then(result=>{
                  expect(true).to.equal(false);
                  done();
              }).catch(err=>{
                  expect(err).to.equal('Find Failed');
                  done();
              }); 
      });
  });

  describe('Rate Function', () => {
    it('rate product that does not exist', (done) => {
              productService.rate(products[1]._id, 5)
              .then(result=>{
                  expect(true).to.equal(false);
                  done();
              }).catch(err=>{
                  expect(err).to.equal('Find Failed');
                  done();
              }); 
            
      });

      it('succesfully rate product in database', (done) => {
              productService.rate(products[2]._id, 10)
              .catch(err=>{
                  expect(true).to.equal(false);
                  done();
              })
              .then(result=>{
                  expect(result.rating).to.equal(7.5);
                  expect(result.numRatings).to.equal(2);
                  done();
              });
            
      });

      it('fail to rate product in database', (done) => {
              productService.rate(products[2]._id, 5)
              .then(result=>{
                  expect(true).to.equal(false);
                  done();
              })
              .catch(err=>{
                  console.log(err);
                  expect(err).to.equal('Update Failed');
                  done();
              });
      });
  });

});