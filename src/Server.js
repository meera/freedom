const mongoose = require('mongoose');

const mongodbURL = process.env.MONGO || 'mongodb://localhost/freedomdb'

mongoose.connect(mongodbURL, {useNewUrlParser: true})
  .then(() => console.log('Connected to MongoDB @', mongodbURL))
  .catch(err => console.error('Could not connect to MongoDB...'));
  
const app = require("./App");

const port = process.env.PORT || 3000

const server = app.listen(port, () => console.log(`Example app listening on port ${port}!`));

