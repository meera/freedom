
const mongoose = require('mongoose');
const {AgentSchema} = require('./Agent')
const Task = mongoose.model('Task', new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50
    },
    skills: {
        type: [String]
    },
    //agent: {
    //    type: AgentSchema
    //},
    status: {
      type: String
    }
  }));

module.exports = Task;