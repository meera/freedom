
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
      name: String,
      skills: [String],
      agent: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Agent'

      }

  }
)
const Task = mongoose.model('Task', taskSchema);

module.exports = Task;