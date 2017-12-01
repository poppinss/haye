/*
 * haye
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/

const Pipe = require('./src/Parsers/Pipe')
const Qs = require('./src/Parsers/Qs')
const ArrayPresenter = require('./src/Presenters/ArrayPresenter')
const JsonPresenter = require('./src/Presenters/JsonPresenter')

module.exports = {
  fromPipe (expression) {
    return {
      toArray: () => Pipe(expression, new ArrayPresenter()),
      toJSON: () => Pipe(expression, new JsonPresenter())
    }
  },
  fromQS (expression) {
    return {
      toArray: () => Qs(expression, new ArrayPresenter()),
      toJSON: () => Qs(expression, new JsonPresenter())
    }
  }
}
