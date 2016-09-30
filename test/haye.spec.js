'use strict'

/*
 * haye
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/


const chai = require('chai')
const haye = require('../index')
const assert = chai.assert

describe('Haye', function () {
  it('should be able to get access to parser methods directly from haye', function () {
    const parser = haye.fromArray([{name: 'required'}])
    assert.instanceOf(parser, haye.Parser)
  })

  it('should be able to call methods on parser directly from haye', function () {
    const parser = haye.fromJSON({name: 'virk'})
    const parsed = parser.toQS()
    assert.equal(parsed, 'name=virk')
  })
})
