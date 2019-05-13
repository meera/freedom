const express = require('express');
const router = express.Router();
const Agent = require('../models/Agent');

const Agents = [{},{}];

router.get('/', async (req,res) => {
  
   const agents = await Agent.find();
   res.send(agents);

});

router.get('/:id', (req,res) => {
   const agent = agents.find( agent => agent.id === parseInt(req.params.id))
   if (!agent)
       res.status(404).send(`The agent with id ${req.params.id} not found`);
   res.send(agent);
});

module.exports = router;