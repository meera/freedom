const express = require('express');
const tasks = require('./routes/Tasks');
const agents = require('./routes/Agents');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/freedomdb', {useNewUrlParser: true})
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));

const { check, validationResult } = require('express-validator/check');

const app = express();

app.use(express.json());
app.use('/api/tasks', tasks);
app.use('/api/agents', agents);
// EXPORT $PORT=5000

const priorty = { LOW: 'LOW', HIGH: 'HIGH'};

app.get('/', (req, res) => res.send('Hello Freedom!'));

module.exports = app;
