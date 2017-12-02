/*
* haye
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

export default function Qs (chars, presenter) {
  presenter.add()
  const charsLength = chars.length

  let i = 0
  let targetProp = 'name'
  let inArray = false

  while (i < charsLength) {
    const char = chars[i++]
    const charCode = char.charCodeAt(0)

    if (charCode === 91) {
      inArray = true
    } else if (charCode === 93) {
      inArray = false
    } else if (charCode === 61 || (charCode === 44 && inArray)) {
      targetProp = 'arg'
      presenter.shiftValue()
    } else if (charCode === 44) {
      targetProp = 'name'
      presenter.add()
    } else if (targetProp === 'arg') {
      presenter.appendValue(char)
    } else {
      presenter.appendKey(char, charCode)
    }
  }

  return presenter.toJSON()
}
