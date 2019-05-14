const app = require('../../App');
const request = require('supertest');


  describe('GET /', function() {
    it('Home Page', async (done) => {
      request(app)
        .get('/')
        .expect('Hello Freedom!')
        .expect(200);
        done();
        
    });
    
  });