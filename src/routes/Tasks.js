const express = require('express');
const Task = require('../models/Task');
const router = express.Router();
const Agent = require('../models/Agent')


router.get('/', async (req, res) => {

    const tasks = await Task.find().select({name: 1, skills: 1});
     res.send(tasks);

});


router.post('/', async (req, res) => {
    const { error } = validateTask(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    // Find an agent 

    const agent = await Agent.findOne({skills: { $in: req.body.skills}, busy: false});

    if (!agent) return res.status(400).send('Could not find agent.');

  
    console.log('Agent found ', agent);

    let task = new Task({ name: req.body.name , 
      skills: req.body.skills,
      status: 'assigned',
      //agent: {
      //  _id: agent._id,
      //  name: agent.name
      //}
      });
    task = await task.save();
    
    res.send(task);
  });
  
// Mark task for completion
router.patch('/:id', async function(req, res) {
  let task = await Task.findById( req.params.id);
  task.status = req.body.status;
  task = await task.save();
  res.send(task);
 });

validateTask = (req) => {return true;}
module.exports = router;