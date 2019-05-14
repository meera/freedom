const Agent = require('../models/Agent');

exports.list_agents = async (req,res) => {
  
    const agents = await Agent.find();
    res.send(agents);
 
 }

 exports.get_an_agent = (req,res) => {
     
    const { error } = validateRequest(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
    
    const agent = agents.find( agent => agent.id === parseInt(req.params.id))
    if (!agent)
        res.status(404).send(`The agent with id ${req.params.id} not found`);
    res.send(agent);
 }

 function validateRequest( req) {
     return true;
 }