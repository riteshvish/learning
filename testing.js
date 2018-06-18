  var chai = require('chai');
  var sinon = require('sinon');
  var expect = chai.expect;
  var should = chai.should();
  var superagent = require('superagent');
  var status = require('http-status');
  var app = require("../../server/server.js");
  var utils = require('../../common/helpers/utils.js');

  describe('/API', function() {
    beforeEach(function(done) {
      server = app.listen(done);
    });
    afterEach(function(done) {
      server.close(done);
    });
    it('/Users/signup', function(done) {
      superagent
        .post('http://localhost:3000/api/Users/signup')
        .end(function(err, res) {
          expect(err).to.be.instanceof(Error);
          expect(res.status).to.equal(status.UNPROCESSABLE_ENTITY);
          expect(res.body.error.message.toString()).to.equal("User instance is not valid");
          done();
        });
    });
    var tempUserName = utils.randomString(6);
    console.log(tempUserName);
    it('/Users/signup should return error if User Object don\'t have page property', function(done) {
      var sampleUserData = {
        "email": tempUserName + '@mailinator.com',
        "password": "123"
      };
      superagent
        .post('http://localhost:3000/api/Users/signup')
        .send(sampleUserData)
        .set('Content-Type', 'application/json')
        .end(function(err, res) {
          expect(err).to.be.instanceof(Error);
          expect(res.status).to.equal(status.UNPROCESSABLE_ENTITY);
          expect(res.body.error.message.toString()).to.equal("Page instance is not valid");
          done();
        });
    });
    it("api/Users/signup should return error if User Object don't have email property", function(done) {
      var sampleUserData ={}
      superagent
        .post('http://localhost:3000/api/Users/signup')
        .send(sampleUserData)
        .set('Content-Type', 'application/json')
        .end(function(err, res) {
          expect(err).to.be.instanceof(Error);
          expect(res.status).to.equal(status.UNPROCESSABLE_ENTITY);
          expect(res.body.error.message.toString()).to.equal("Email is not valid");
          done();
        });
    });
    it("api/Users/signup should return error if User Object don't have email property", function(done) {
      var sampleUserData = {
        "password": "123",
        "page": {}
      }
      superagent
        .post('http://localhost:3000/api/Users/signup')
        .send(sampleUserData)
        .set('Content-Type', 'application/json')
        .end(function(err, res) {
          expect(err).to.be.instanceof(Error);
          expect(res.status).to.equal(status.UNPROCESSABLE_ENTITY);
          expect(res.body.error.message.toString()).to.equal("Email is not valid");
          done();
        });
    });
    it("api/Users/signup should return error if User Object don't have Password property", function(done) {
      var sampleUserData = {
        "email": tempUserName + '@mailinator.com',
        "page": {}
      }
      superagent
        .post('http://localhost:3000/api/Users/signup')
        .send(sampleUserData)
        .set('Content-Type', 'application/json')
        .end(function(err, res) {
          expect(err).to.be.instanceof(Error);
          expect(res.status).to.equal(status.UNPROCESSABLE_ENTITY);
          expect(res.body.error.message.toString()).to.equal("Password can't be blank");
          done();
        });
    });
    it('/Users/signup should register a user succesfully', function(done) {
      this.timeout(15000);
      var sampleUserData = {
        "email": tempUserName + '@mailinator.com',
        "password": "123",
        "page": {}
      }
      superagent
        .post('http://localhost:3000/api/Users/signup')
        .send(sampleUserData)
        .set('Content-Type', 'application/json')
        .end(function(err, res) {
          expect(err).to.equal(null);
          expect(res.status).to.equal(status.OK);
          done();
        });
    });
    it('/Users/signup should return a status 200 and message "User already register" if user already register', function(done) {
      this.timeout(15000);
      var sampleUserData = {}
      superagent
        .post('http://localhost:3000/api/Users/signup')
        .send(sampleUserData)
        .set('Content-Type', 'application/json')
        .end(function(err, res) {
          expect(err).to.be.instanceof(Error);
          expect(res.status).to.equal(status.UNPROCESSABLE_ENTITY);
          done();
        });
    });
  });
