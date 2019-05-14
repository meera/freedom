const express = require('express');
const router = express.Router();
const Agent = require('../models/Agent')

const TaskController = require( '../controller/Tasks');

router.get('/', TaskController.list_tasks);


router.post('/', TaskController.assign_task);
   
// Mark task for completion
router.patch('/:id', TaskController.mark_task_complete);


module.exports = router;



