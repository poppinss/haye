'use strict'

const test = require('japa')
const Pipe = require('../dist/haye-pipe')
const JsonPresenter = require('../dist/haye-json-presenter')

test.group('Pipe - JSON', () => {
  test('should parse a piped string to an array', (assert) => {
    const toArray = Pipe('min', new JsonPresenter())
    assert.deepEqual(toArray, {
      min: []
    })
  })

  test('should parse a piped string with value to an array', (assert) => {
    const toArray = Pipe('min:4', new JsonPresenter())
    assert.deepEqual(toArray, {
      min: ['4']
    })
  })

  test('should parse a piped string with multiple values to an array', (assert) => {
    const toArray = Pipe('between:4,10', new JsonPresenter())
    assert.deepEqual(toArray, {
      between: ['4', '10']
    })
  })

  test('should parse a piped string to multiple array objects', (assert) => {
    const toArray = Pipe('between:4,10|min:4', new JsonPresenter())
    assert.deepEqual(toArray, {
      between: ['4', '10'],
      min: ['4']
    })
  })

  test('work fine with complex expression', (assert) => {
    const toArray = Pipe('between:4,10|min:4|required', new JsonPresenter())
    assert.deepEqual(toArray, {
      between: ['4', '10'],
      min: ['4'],
      required: []
    })
  })
})
