/*
* haye
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/
module.exports = function () {
  return {
    nodes: [],
    currentNode: null,
    add () {
      this.currentNode = {
        name: '',
        args: []
      }
      this.nodes.push(this.currentNode)
    },
    appendKey (char, charCode) {
      if (charCode !== 32) {
        this.currentNode.name += char
      }
    },
    appendValue (char) {
      this.currentNode.args[this.currentNode.args.length - 1] += char
    },
    shiftValue () {
      this.currentNode.args.push('')
    },
    toJSON () {
      return this.nodes.reduce((result, n) => {
        result[n.name] = n.args
        return result
      }, {})
    }
  }
}
