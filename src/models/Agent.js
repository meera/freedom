const mongoose = require('mongoose');

/**
 * Agent Schema: I debated about storing Agent as simple in-memory Array or use Database.
 * In the end, I choose to go with database approach, as it simulated real-life scenario closely.
 * 
 * I choose NoSQL database (Mongodb) - that means I had a choice to store a Reference to Agent/Task or store a Embedded copy.
 * Here, I have used a hybrid approach. 
 *  I am storing a reference ID of the task and I have duplicated task_priority, and task_assigned_time_stamp for quicker searching.
 *  
 */
const agentSchema = new mongoose.Schema(
    {
        name: String,
        skills: [String],
        task: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Task'
        },
        task_assigned_time_stamp: {
            type: Date, 

        },
        task_priority: {
            type: Number
        }
 
    }
 )
 
 
const Agent = mongoose.model('Agent', agentSchema);

module.exports = Agent;
exports.agentSchema = agentSchema;
