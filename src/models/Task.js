/*
 * Task Schema: This i
*/
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
      name: String,
      skills: [String],
      task_priority: {
        type: Number
      },
      agent: {
          type: mongoose.Schema.Types.ObjectId, // Referance to Agent
          ref: 'Agent'

      },
      agent_name: {
        type: String
      },
      task_assigned_time_stamp: {
        type: Date

    },
    task_finished_time_stamp: {
      type: Date

    }
  }
)
const Task = mongoose.model('Task', taskSchema);

module.exports = Task;