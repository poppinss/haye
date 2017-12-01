'use strict'

const test = require('japa')
const Pipe = require('../src/Parsers/Pipe')
const ArrayPresenter = require('../src/Presenters/ArrayPresenter')

test.group('Pipe - Array', () => {
  test('should parse a piped string to an array', (assert) => {
    const toArray = Pipe('min', new ArrayPresenter())
    assert.deepEqual(toArray, [{name: 'min', args: []}])
  })

  test('should parse a piped string with value to an array', (assert) => {
    const toArray = Pipe('min:4', new ArrayPresenter())
    assert.deepEqual(toArray, [{name: 'min', args: ['4']}])
  })

  test('should parse a piped string with multiple values to an array', (assert) => {
    const toArray = Pipe('between:4,10', new ArrayPresenter())
    assert.deepEqual(toArray, [{name: 'between', args: ['4', '10']}])
  })

  test('should parse a piped string to multiple array objects', (assert) => {
    const toArray = Pipe('between:4,10|min:4', new ArrayPresenter())
    assert.deepEqual(toArray, [
      { name: 'between', args: ['4', '10'] },
      { name: 'min', args: ['4'] }
    ])
  })
})
