
const Task = require('../models/Task');
const Agent = require('../models/Agent');


/*
 This is main task assigner controller.
 First we find out agents with matching skills - who aren't assigned a task.
 If that fails, find agent with matching skills who are assigned lower priority and recently assigned jobs.

*/
exports.assign_task = async (req, res) => {
    const { error } = validateTask(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    const task_priority = req.body.task_priority || 0; // if no priority set - set lowest priority
    const skills = req.body.skills;
    let agent = await Agent.findOne({skills: {$in: skills}, task: null}); // found agent not working and with required skills
    if(  agent)
        console.log('Success - found agent with matching skills and not busy :', agent.name);
    else {
        if( task_priority > 0 ) // Find agents only if task has higher priority
          agent = await Agent.findOne(
                             {skills: {$in: skills}, // Skills must match the task
                             task_priority: {$lt: task_priority}} // Task being worked on should be of lower priority 
                             )
                         .sort({task_assigned_time_stamp: 1}); // Select Agent who is recently assigned.
 
        if( agent) 
            console.log('Found agent working on lower priority job. Will assign high priority job');
        
        if (!agent) 
            return res.status(400).send('Could not find agent.');

    }
  
    console.log('This agent selected : ', agent.name);

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
    newTask.agent_name = agent.name;

    agent.save()
    }
    res.send(newTask);
}
/*
Mark the task as complete and release the agent.
*/
exports.mark_task_complete = async function(req, res) {
    // TODO 
    // Implement this block in transaction - so that agent and tasks are rolledback in sync
    let task = await Task.findById( req.params.id);
    if (!task) 
        return res.status(400).send('Could not find task.');

    task.status = req.body.status;
    const agent = await Agent.findById( task.agent);
    if(!agent)
        return res.status(400).send('Could not find corresponding agent - task is already complete');
    agent.task = undefined;
    agent.task_priority = undefined;
    agent.task_assigned_time_stamp = undefined;
    agent.save();
    task = await task.save();

    res.send(task);
}

exports.list_tasks = async (req, res) => {

    const tasks = await Task.find().select({name: 1, skills: 1});
     res.send(tasks);
}

validateTask = (req) => {
    // Check if task contains name, priority, array of skills
    // 
    return true;
  }