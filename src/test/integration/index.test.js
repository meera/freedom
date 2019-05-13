const app = require('../../App');
const request = require('supertest');


  describe('GET /', function() {
    it('responds with hello', function(done) {
      request(app)
        .get('/')
        .expect('Hello Freedom')
        .expect(200, done)
    });
  });