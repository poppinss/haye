'use strict'

/*
 * haye
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/

const _ = require('lodash')
const util = exports = module.exports = {}

util.existy = function existy (value) {
  return !_.isNull(value) && !_.isUndefined(value) && !(_.isArray(value) && !_.size(value))
}
