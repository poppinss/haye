'use strict'

const test = require('japa')
const Qs = require('../dist/haye-qs')
const ArrayPresenter = require('../dist/haye-array-presenter')

test.group('Qs - Array', () => {
  test('should parse a query string to an array', (assert) => {
    const toArray = Qs('min', new ArrayPresenter())
    assert.deepEqual(toArray, [{ name: 'min', args: [] }])
  })

  test('should parse a query string with value to an array', (assert) => {
    const toArray = Qs('min=4', new ArrayPresenter())
    assert.deepEqual(toArray, [{ name: 'min', args: ['4'] }])
  })

  test('return white space as part of the value', (assert) => {
    const toArray = Qs('name=aman virk', new ArrayPresenter())
    assert.deepEqual(toArray, [{ name: 'name', args: ['aman virk'] }])
  })

  test('trim white space from key', (assert) => {
    const toArray = Qs(' name=aman virk', new ArrayPresenter())
    assert.deepEqual(toArray, [{ name: 'name', args: ['aman virk'] }])
  })

  test('should parse a query string with multiple values to an array', (assert) => {
    const toArray = Qs('between=[4,10]', new ArrayPresenter())
    assert.deepEqual(toArray, [{ name: 'between', args: ['4', '10'] }])
  })

  test('should parse a query string to multiple array objects', (assert) => {
    const toArray = Qs('required,min=3,max=4,alpha_num,between=[4,5]', new ArrayPresenter())
    assert.deepEqual(toArray, [
      { name: 'required', args: [] },
      { name: 'min', args: ['3'] },
      { name: 'max', args: ['4'] },
      { name: 'alpha_num', args: [] },
      { name: 'between', args: ['4', '5'] }
    ])
  })
})
