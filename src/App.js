const express = require('express');
const tasks = require('./routes/Tasks');
const agents = require('./routes/Agents');


const { check, validationResult } = require('express-validator/check');

const app = express();

app.use(express.json());
app.use('/api/tasks', tasks);
app.use('/api/agents', agents);


app.get('/', (req, res) => res.send('Hello Freedom!'));

module.exports = app;
