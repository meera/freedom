const mongoose = require('mongoose');
const AgentSchema = new mongoose.Schema({
   name: {
     type: String,
     required: true,
     minlength: 5,
     maxlength: 50
   },
   skills: {
       type: [String]
   },
   busy: {
       type: Boolean
   }

 });
const Agent = mongoose.model('Agent', AgentSchema);

module.exports = Agent;
exports.AgentSchema = AgentSchema;