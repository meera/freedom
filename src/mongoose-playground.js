//This is Mongodb playground - Used to try out mongodb functionality. 

const mongoose = require('mongoose');
// Playground is separate collection - feel free to drop the collection
mongoose.connect('mongodb://localhost/playground', {useNewUrlParser: true});

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
           type: time_stamp
       },
       task_priority: {
           type: Integer
       }

   }
)

const Task = mongoose.model('Task', taskSchema);
const Agent = mongoose.model('Agent', agentSchema);

async function createTask() {
  
   const skills = ['gardening', 'programming'];
   const task_priority = 1; // 0 = LOW Priority, 1 = HIGH Priority

   let agent = await Agent.findOne({skills: {$in: skills}, task: null}); // found agent not working and with required skills
   if(  agent)
       console.log(' Found agent with skills and not busy ', agent);
   else {
       if( task_priority > 0 ) // Find agents only if task has higher priority

       
       agent = await Agent.findOne(
                            {skills: {$in: skills}, // Skills must match the task
                            task_priority: {$lt: task_priority}} // Task being worked on should be of lower priority 
                            )
                        .sort({task_assigned_time_stamp: 1}); // Select Agent who is recently assigned.

        if(!agent) // No agent matched the condition 
            return false // 404 
   }
   

   {
    const newTask = new Task( {
        name: 'New Task5',
        skills: skills,
        agent: agent._id
    });
       // This block needs to be enclosed in transaction.
       // To make sure that agent and tasks are in sync.

       const result = await newTask.save();
       // update the agent with assigned.
       agent.task = result._id;
       agent.task_priority = PRIORITY;
       agent.time_stamp = Date.now();
       agent.save()
       console.log(result);
   }
}

async function createAgent() {
   const newAgent = new Agent({
       name: 'Meera2',
       skills: ['gardening', 'programming', 'biking']
   });
   const agent = await newAgent.save();
   console.log(agent);

}

async function listAgents() {
   const agents = await Agent.find().populate('Tasks');
   console.log('List of Agents ', agents);
}

async function listTasks() {
   const tasks = await Task.find().populate('Agent');
   console.log('List of Tasks ', tasks);
}
//createAgent();
createTask();
//listAgents();

//listTasks();
