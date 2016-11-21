Product Challenge

An node application to provide back-end support for a shopping cart.


Prerequisites

mongodb - installation instructions (https://docs.mongodb.com/manual/administration/install-community/)

node.js - installation instructions (https://docs.npmjs.com/getting-started/installing-node)


Installing and Running app 

install dependencies - npm install (in package directory, no arguments)

start mongodb - mongod

start app - node ./app/main.js (in package directory, no arguments)

It is easiest to manually test using Postman


Running the tests

run tests - ./node_modules/mocha/bin/mocha (in package directory, no arguments)


Stories and correlating endpoints - (Note admin endpoints require a username:admin and password:admin to be passed)

1. As a customer, I can see a list of available catalog products I can choose from. - get('api/products')

2. As a customer, I can see information about an individual product, such as product name, product rating, whether the item is in stock, and
product price. - get('api/products/:id')

3. As a customer, I can add a single item to my shopping cart. - put('api/cart/add/:id')

4. As a customer, I can remove an item from my shopping cart. - put('api/cart/remove/:id')

5. As a customer, I can rate an item on scale of 1 - 10. - put('api/products/:id')

6. As an administrator, I can add a product to the product catalog. - post('api/admin/products')

7. As an administrator, I can remove a product from the product catalog. - del('api/admin/products/:id')

8. As an administrator, I can see an inventory list of all the items in my catalog, which shows the item name and the number of items in
stock. - get('api/admin/products')


Extra endpoints

Retrieve list of carts - get('api/cart')

Create cart - post('api/cart')

Delete cart - del('api/cart/:id')


Authors

Jaskirt Pooni
