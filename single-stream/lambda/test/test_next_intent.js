'use strict';

let lambda = require('./lambda.js');
let skill = require('../src/index.js');
let constant = require('../src/constants.js');

let chai = require('chai');
chai.use(require('chai-string'));

let should = chai.should();
let assert = chai.assert;

var event = undefined;

describe('Audio Player Test : NextIntent', function () {

  // pre-requisites
  before(function (done) {

    // pass the skill debug flag to Lambda mockup
    lambda.debug = constant.debug;

    event = require('./next_intent.json');
    skill.handler(event, lambda.context(), lambda.callback);

    done();

  });


  it('it responses with valid response structure ', function (done) {

      lambda.response.should.have.property("version");
      lambda.response.version.should.equal("1.0");

      done();
    }),

    it('it responses with output speech ', function (done) {

      lambda.response.should.have.property("response");
      let r = lambda.response.response;

      r.should.have.property("outputSpeech");
      r.outputSpeech.should.have.property("type");
      r.outputSpeech.type.should.equal('SSML');
      r.outputSpeech.should.have.property("ssml");
      r.outputSpeech.ssml.should.startWith('<speak>');
      r.outputSpeech.ssml.should.endWith('</speak>');

      done();
    }),

    it('it responses with no directive ', function (done) {

      let r = lambda.response.response;
      r.should.have.property("shouldEndSession");
      r.shouldEndSession.should.be.true;

      r.should.not.have.property("directives");

      done();

    });
});