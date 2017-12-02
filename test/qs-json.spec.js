'use strict'

const test = require('japa')
const Qs = require('../dist/haye-qs')
const JsonPresenter = require('../dist/haye-json-presenter')

test.group('Qs - Array', () => {
  test('should parse a query string to an array', (assert) => {
    const toArray = Qs('min', new JsonPresenter())
    assert.deepEqual(toArray, {
      min: []
    })
  })

  test('should parse a query string with value to an array', (assert) => {
    const toArray = Qs('min=4', new JsonPresenter())
    assert.deepEqual(toArray, {
      min: ['4']
    })
  })

  test('return white space as part of the value', (assert) => {
    const toArray = Qs('name=aman virk', new JsonPresenter())
    assert.deepEqual(toArray, {
      name: ['aman virk']
    })
  })

  test('trim white space from key', (assert) => {
    const toArray = Qs(' name=aman virk', new JsonPresenter())
    assert.deepEqual(toArray, {
      name: ['aman virk']
    })
  })

  test('should parse a query string with multiple values to an array', (assert) => {
    const toArray = Qs('between=[4,10]', new JsonPresenter())
    assert.deepEqual(toArray, {
      between: ['4', '10']
    })
  })

  test('should parse a query string to multiple array objects', (assert) => {
    const toArray = Qs('required,min=3,max=4,alpha_num,between=[4,5]', new JsonPresenter())
    assert.deepEqual(toArray, {
      required: [],
      min: ['3'],
      max: ['4'],
      alpha_num: [],
      between: ['4', '5']
    })
  })
})
