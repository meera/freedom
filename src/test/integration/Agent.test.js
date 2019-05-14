/*
 * Agent Route Tests
*/
const mongoose = require('mongoose');
const Agent = require('../../models/Agent');
const router = require('../../routes/Agents');

mongoose.connect('mongodb://localhost/freedom_test', {useNewUrlParser: true});
  

describe('Agent Route Test', () => {

    beforeAll( async () => {
        await Agent.remove({});
    });
    afterEach( async () => {
        await Agent.remove({});
    });
    afterAll( async () => {
        await mongoose.connection.close();
    });

    it("Can save and find Agent Model", async () => {
        const agent = new Agent({name: 'Anna', skills: ['skill1', 'skill2']});
        await agent.save();

        const findAnna = await Agent.findOne({name: "Anna"});
        expect(findAnna.name).toEqual('Anna');
    })
});