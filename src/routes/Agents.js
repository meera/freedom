const express = require('express');
const router = express.Router();
const agentController = require('../controller/Agents');

router.get('/', agentController.list_agents);

router.get('/:id', agentController.get_an_agent);

module.exports = router;