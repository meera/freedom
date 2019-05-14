
const Task = require('../models/Task');

exports.list_tasks = async (req, res) => {

    const tasks = await Task.find().select({name: 1, skills: 1});
     res.send(tasks);
}

exports.assign_task = async (req, res) => {
    const { error } = validateTask(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    const task_priority = req.body.task_priority;
    const skills = req.body.skills;
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
 
        if (!agent) return res.status(400).send('Could not find agent.');

    }
  
    console.log('Agent found ', agent);

    const newTask = new Task( {
    name: req.body.name,
    skills: req.body.skills,
    agent: agent._id
    });
    {

    // TODO
    // This block needs to be enclosed in transaction.
    // Agents and Task needs to be updated or rolledback in sync.



    const result = await newTask.save();
    // update the agent with assigned.
    agent.task = result._id;
    agent.task_priority = task_priority;
    agent.time_stamp = Date.now();
    agent.save()
    console.log(result);
    }

    res.send(newTask);
}

exports.mark_task_complete = async function(req, res) {
    let task = await Task.findById( req.params.id);
    task.status = req.body.status;
    task = await task.save();
    res.send(task);
}

validateTask = (req) => {
    // Check if task contains name, priority, array of skills
    // 
    return true;
  }