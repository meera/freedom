const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/freedomdb', {useNewUrlParser: true})
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));
  
const app = require("./App");

const port = process.env.PORT || 3000

const server = app.listen(port, () => console.log(`Example app listening on port ${port}!`));

