const express = require('express');
const router = express.Router();
const agentController = require('../controller/Agents');

// Returns list of all agents 
// This end point is http://localhost:3000/api/agents/
router.get('/', agentController.list_agents);

// Get detail about a single agent
router.get('/:id', agentController.get_an_agent);

module.exports = router;