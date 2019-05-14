/*
 * Task Route Tests
*/
const mongoose = require('mongoose');
const Task = require('../../models/Task');
const Agent = require('../../models/Agent');
const router = require('../../routes/Tasks');
const request = require('supertest');

mongoose.connect('mongodb://localhost/freedom_test', {useNewUrlParser: true});
  

describe('Task Route Test', () => {

    beforeAll( async () => {
        await Agent.remove({});
        await Task.remove({});
        // Populate Database with 3 Agents
        let agent1 = new Agent({name: 'Anna', skills: ['skill1', 'skill2']});
        let agent2 = new Agent({name: 'Bob', skills: ['skill3', 'skill4']});
        let agent3 = new Agent({name: 'Charlie', skills: ['skill4', 'skill5']});

        await agent1.save();
        await agent2.save();
        await agent3.save();

    });
    afterEach( async () => {
        await Task.remove({});
    });
    afterAll( async () => {
        await mongoose.connection.close();
    });
    // Most simple test - to create a new task and make get Agent Assigned.
    it('Create Task', async (done) => {
        request(router)
          .post('/')
          .send({name: 'Task1', skill:['skill1', 'skill2']})
          .expect('Content-Type', /json/)
          .expect(200, {agent:'Anna'});
          done();
          
      }
    );
      /*
    it('Higher Priority Task Preempts the Low Priority Task', async (done) => {
        // Create Low priority task and assign an agent
        await request(router)
          .post('/')
          .send({name: 'Task1', skill:['skill1', 'skill2'],task_priority: 0 })
          .expect('Content-Type', /json/)
          .expect(200, {agent:'Anna'})
          .then( async () => {

                // Create High Priority task and make sure it has priority.
                await request(router)
                    .post('/')
                    .send({name: 'Task1', skill:['skill1', 'skill2'],task_priority: 1 })
                    .expect('Content-Type', /json/)
                    .expect(200, {agent:'Anna'})
            }
          )
          .done();
          
      }
    );*/
});