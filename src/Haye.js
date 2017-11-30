/*
* haye
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

const Pipe = require('./Parser/Pipe')
const Qs = require('./Parser/Qs')
const ArrayPresenter = require('./Presenters/ArrayPresenter')
const JsonPresenter = require('./Presenters/JsonPresenter')

module.exports = {
  fromPipe (expression) {
    toArray () => Pipe(expression, new ArrayPresenter()),
    toJSON () => Pipe(expression, new JsonPresenter()),
  },
  fromQS (expression) {
    toArray () => Qs(expression, new ArrayPresenter()),
    toJSON () => Qs(expression, new JsonPresenter()),
  }
}
