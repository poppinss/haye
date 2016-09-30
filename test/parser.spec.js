'use strict'

const chai = require('chai')
const Parser = require('../src/Parser')
const assert = chai.assert

describe('Parser', function () {
  context('Array - To Pipe', function () {
    it('should throw an exception when fromArray is not called', function () {
      const parser = new Parser()
      const pipedString = () => parser.toPipe()
      assert.throw(pipedString, 'Make sure to pass an object or array first using fromArray or fromJson method')
    })

    it('should parse an array with plain values to a piped string', function () {
      const parser = new Parser()
      const pipedString = parser.fromArray([{name: 'min', args: []}]).toPipe()
      assert.equal(pipedString, 'min')
    })

    it('should parse an array with args to a piped string', function () {
      const parser = new Parser()
      const pipedString = parser.fromArray([{name: 'min', args: ['4']}]).toPipe()
      assert.equal(pipedString, 'min:4')
    })

    it('should parse an array with multiple args to a piped string', function () {
      const parser = new Parser()
      const pipedString = parser.fromArray([{name: 'between', args: ['4', '10']}]).toPipe()
      assert.equal(pipedString, 'between:4,10')
    })

    it('should parse an array with multiple values to a piped string', function () {
      const parser = new Parser()
      const pipedString = parser.fromArray([{name: 'between', args: ['4', '10']}, {name: 'min', args: 4}]).toPipe()
      assert.equal(pipedString, 'between:4,10|min:4')
    })
  })

  context('JSON - To Pipe', function () {
    it('should throw an exception when fromJson is not called', function () {
      const parser = new Parser()
      const pipedString = () => parser.toPipe()
      assert.throw(pipedString, 'Make sure to pass an object or array first using fromArray or fromJson method')
    })

    it('should parse an object with plain values to a piped string', function () {
      const parser = new Parser()
      const pipedString = parser.fromJson({min: 4}).toPipe()
      assert.equal(pipedString, 'min:4')
    })

    it('should parse an object with plain values as array to a piped string', function () {
      const parser = new Parser()
      const pipedString = parser.fromJson({between: [4, 10]}).toPipe()
      assert.equal(pipedString, 'between:4,10')
    })

    it('should parse an object with multiple key/value pair to a piped string', function () {
      const parser = new Parser()
      const pipedString = parser.fromJson({between: [4, 10], min: 3}).toPipe()
      assert.equal(pipedString, 'between:4,10|min:3')
    })
  })

  context('Array - To String', function () {
    it('should throw an exception when fromArray is not called', function () {
      const parser = new Parser()
      const expressionString = () => parser.toQS()
      assert.throw(expressionString, 'Make sure to pass an object or array first using fromArray or fromJson method')
    })

    it('should be able to parse a plain array to an expression string', function () {
      const parser = new Parser()
      const expressionString = parser.fromArray([{name: 'min'}]).toQS()
      assert.equal(expressionString, 'min')
    })

    it('should be able to parse a plain array with args to an expression string', function () {
      const parser = new Parser()
      const expressionString = parser.fromArray([{name: 'min', args: 4}]).toQS()
      assert.equal(expressionString, 'min=4')
    })

    it('should be able to parse a plain array with multiple args to an expression string', function () {
      const parser = new Parser()
      const expressionString = parser.fromArray([{name: 'between', args: [4, 10]}]).toQS()
      assert.equal(expressionString, 'between=[4,10]')
    })

    it('should be able to parse multiple array objects to an expression string', function () {
      const parser = new Parser()
      const expressionString = parser.fromArray([{name: 'between', args: [4, 10]}, {name: 'min', args: 4}]).toQS()
      assert.equal(expressionString, 'between=[4,10],min=4')
    })
  })

  context('JSON - To String', function () {
    it('should throw an exception when fromJson is not called', function () {
      const parser = new Parser()
      const expressionString = () => parser.toQS()
      assert.throw(expressionString, 'Make sure to pass an object or array first using fromArray or fromJson method')
    })

    it('should be able to parse a plain object to an expression string', function () {
      const parser = new Parser()
      const expressionString = parser.fromJson({min: 4}).toQS()
      assert.equal(expressionString, 'min=4')
    })

    it('should be able to parse a plain object with array value to an expression string', function () {
      const parser = new Parser()
      const expressionString = parser.fromJson({between: [4, 10]}).toQS()
      assert.equal(expressionString, 'between=[4,10]')
    })

    it('should be able to parse multiple key/plain pairs to an expression string', function () {
      const parser = new Parser()
      const expressionString = parser.fromJson({between: [4, 10], min: 4}).toQS()
      assert.equal(expressionString, 'between=[4,10],min=4')
    })
  })

  context('Pipe - To Array', function () {
    it('should throw exception when fromPipe is not called', function () {
      const parser = new Parser()
      const toArray = () => parser.toArray()
      assert.throw(toArray, 'Make sure to pass an expression string using fromQS or fromPipe method')
    })

    it('should parse a piped string to an array', function () {
      const parser = new Parser()
      const toArray = parser.fromPipe('min').toArray()
      assert.deepEqual(toArray, [{name: 'min', args: null}])
    })

    it('should parse a piped string with value to an array', function () {
      const parser = new Parser()
      const toArray = parser.fromPipe('min:4').toArray()
      assert.deepEqual(toArray, [{name: 'min', args: '4'}])
    })

    it('should parse a piped string with multiple values to an array', function () {
      const parser = new Parser()
      const toArray = parser.fromPipe('between:4,10').toArray()
      assert.deepEqual(toArray, [{name: 'between', args: ['4', '10']}])
    })

    it('should parse a piped string to multiple array objects', function () {
      const parser = new Parser()
      const toArray = parser.fromPipe('between:4,10|min:4').toArray()
      assert.deepEqual(toArray, [{name: 'between', args: ['4', '10']}, {name: 'min', args: '4'}])
    })
  })

  context('Pipe - To JSON', function () {
    it('should throw exception when fromPipe is not called', function () {
      const parser = new Parser()
      const toJson = () => parser.toJSON()
      assert.throw(toJson, 'Make sure to pass an expression string using fromQS or fromPipe method')
    })

    it('should parse a piped string to an object', function () {
      const parser = new Parser()
      const toJson = parser.fromPipe('min').toJSON()
      assert.deepEqual(toJson, {min: null})
    })

    it('should parse a piped string with value to an object', function () {
      const parser = new Parser()
      const toJson = parser.fromPipe('min:4').toJSON()
      assert.deepEqual(toJson, {min: '4'})
    })

    it('should parse a piped string with multiple values to an object', function () {
      const parser = new Parser()
      const toJson = parser.fromPipe('between:4,10').toJSON()
      assert.deepEqual(toJson, {between: ['4', '10']})
    })

    it('should parse a piped string with multiple pairs to an object', function () {
      const parser = new Parser()
      const toJson = parser.fromPipe('between:4,10|min:4').toJSON()
      assert.deepEqual(toJson, {between: ['4', '10'], min: '4'})
    })
  })

  context('String - To Array', function () {
    it('should throw exception when fromQS is not called', function () {
      const parser = new Parser()
      const toJson = () => parser.toArray()
      assert.throw(toJson, 'Make sure to pass an expression string using fromQS or fromPipe method')
    })

    it('should parse an expression string to an array', function () {
      const parser = new Parser()
      const toArray = parser.fromQS('min').toArray()
      assert.deepEqual(toArray, [{name: 'min', args: null}])
    })

    it('should parse an expression string with value to an array', function () {
      const parser = new Parser()
      const toArray = parser.fromQS('min=4').toArray()
      assert.deepEqual(toArray, [{name: 'min', args: '4'}])
    })

    it('should parse an expression string with multiple values to an array', function () {
      const parser = new Parser()
      const toArray = parser.fromQS('between=[4, 10]').toArray()
      assert.deepEqual(toArray, [{name: 'between', args: ['4', '10']}])
    })

    it('should parse an expression with multiple values to an array', function () {
      const parser = new Parser()
      const toArray = parser.fromQS('between=[4, 10],min=4').toArray()
      assert.deepEqual(toArray, [{name: 'between', args: ['4', '10']}, {name: 'min', args: '4'}])
    })
  })

  context('String - To JSON', function () {
    it('should throw exception when fromQS is not called', function () {
      const parser = new Parser()
      const toJson = () => parser.toJSON()
      assert.throw(toJson, 'Make sure to pass an expression string using fromQS or fromPipe method')
    })

    it('should parse an expression string to an object', function () {
      const parser = new Parser()
      const toArray = parser.fromQS('min').toJSON()
      assert.deepEqual(toArray, {min: null})
    })

    it('should parse an expression string with value to an object', function () {
      const parser = new Parser()
      const toArray = parser.fromQS('min=4').toJSON()
      assert.deepEqual(toArray, {min: '4'})
    })

    it('should parse an expression string with multiple values to an object', function () {
      const parser = new Parser()
      const toArray = parser.fromQS('between=[4,10]').toJSON()
      assert.deepEqual(toArray, {between: ['4', '10']})
    })

    it('should parse an expression string with multiple args to an object', function () {
      const parser = new Parser()
      const toArray = parser.fromQS('between=[4,10],min=4').toJSON()
      assert.deepEqual(toArray, {between: ['4', '10'], min: '4'})
    })
  })
})
