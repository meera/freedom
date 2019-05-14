# REST API Server for Work Distribution

This project is developed using Nodejs, Express, Mongodb & Tested using Postman

The service has two main resources - Agents/Tasks.

Agents are read-only.

Tasks can be Created, Updated, Listed (CRU).


# How to Run
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

Default mongodb url is 'mongodb://localhost/freedomdb'
If you like to change mongodburl, you can set 'MONGO' environment to new value in following format
export MONGO=mongodb://username:password@hostname:port/database
e.g.
export MONGO=mongodb://meera:react@freedome.com:27017

Now start the  REST service
npm run start # to start the server
# You can visit http://localhost:3000 to see if the server is running
```


