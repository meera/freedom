# REST API Server for Work Distribution

This project is developed using Nodejs, Express, Mongodb & Tested using Postman
Read **DesignNotes* for design details.
 

# How to Setup
```
git clone https://github.com/meera/freedom
cd freedom
npm install 

Open new terminal and start mongodb
mongod

Back to Original Terminal window

Populate Agent Collection
cd data
mongoimport --host 'localhost:27017'  --db freedomdb --jsonArray --collection agents --file agents.json
-- Change host and database name according to your setup.
```
# How to Run
Default mongodb url is 'mongodb://localhost/freedomdb'
If you like to change mongodburl, you can set 'MONGO' environment to new value in following format.
export MONGO=mongodb://username:password@hostname:port/database
e.g.
export MONGO=mongodb://meera:react@freedome.com:27017
Make sure mongodb is running and start the server

npm run start # to start the server
Visit http://localhost:3000 in the browser - you should see 'Hello Freedom' message


# How to test
Two ways to test the logic
Run Unit tests using following command

npm run test

Otherway is to import Postman REST API collection. Import  'Freedom-RestServer.postman_collection.json' file into Postman.
Sample Requests are pre-loaded in the collection.






