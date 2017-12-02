/*
 * haye
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/

import Pipe from './src/Parsers/Pipe'
import Qs from './src/Parsers/Qs'
import ArrayPresenter from './src/Presenters/ArrayPresenter'
import JsonPresenter from './src/Presenters/JsonPresenter'

export default {
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
