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
const util = require('../lib/util')

class Parser {

  constructor () {
    this.arrayInput = []
    this.jsonInput = {}
    this.qsInput = ''
    this.pipeInput = ''
    this.seperators = {
      qsPair: ',',
      qsArgs: '=',
      pipePair: '|',
      pipeArgs: ':'
    }
    this.qsReplaceRegex = new RegExp(`${this.seperators.qsPair}(?![^\\[]*\\])`, 'g')
  }

  /**
   * Sets an array on the constructor to be parsed
   * later.
   *
   * @param  {Array} values
   *
   * @return {Object} Reference to this chaining
   */
  fromArray (values) {
    this.arrayInput = values
    return this
  }

  /**
   * Sets json object on the constructor to be parsed
   * later.
   *
   * @param  {Object} values
   *
   * @return {Object} Reference to this chaining
   */
  fromJSON (values) {
    this.jsonInput = values
    return this
  }

  /**
   * @see  fromJSON
   */
  fromJson (values) {
    return this.fromJSON(values)
  }

  /**
   * Sets string input on the constructor to be parsed
   * later.
   *
   * @param  {String} value
   *
   * @return {Object} Reference to this chaining
   */
  fromQS (value) {
    this.qsInput = value
    return this
  }

  /**
   * Sets string input on the constructor to be parsed
   * later.
   *
   * @param  {String} value
   *
   * @return {Object} Reference to this chaining
   */
  fromPipe (value) {
    this.pipeInput = value
    return this
  }

  /**
   * Build options by joining multiple values using
   * a seperator
   *
   * @param   {String} arraySeperator
   * @param   {Mixed} values
   *
   * @return  {String}
   *
   * @private
   */
  _buildOptions (arraySeperator, values) {
    if (!util.existy(values)) {
      return ''
    }
    return _.isArray(values) ? values.join(arraySeperator) : values
  }

  /**
   * Build args by pasrsing a string using the
   * args seperator.
   *
   * @param   {String} argsSeperator
   * @param   {String} value
   *
   * @return  {Array|String}
   *
   * @private
   */
  _buildArgs (argsSeperator, value) {
    if (!value) {
      return null
    }
    const toArray = value.split(argsSeperator)
    return _.size(toArray) === 1 ? toArray[0] : _.map(toArray, (item) => item.trim())
  }

  /**
   * Parses an array to a piped string
   *
   * @param   {Array} values
   *
   * @return  {String}
   *
   * @private
   */
  _parseHashToString (values, joinSeperator, callback) {
    return _(values).map(callback).join(joinSeperator)
  }

  /**
   * Parses a pipe string expression to an array
   *
   * @param   {String} expression
   *
   * @return  {Array}
   *
   * @private
   */
  _parseStringToArray (expression, joinSeperator, callback) {
    return _(expression.split(joinSeperator)).map(callback).value()
  }

  /**
   * Parses a pipe string to JSON.
   *
   * @param   {String} expression
   *
   * @return  {Object}
   *
   * @private
   */
  _parseStringToJson (expression, joinSeperator, callback) {
    return _(expression.split(joinSeperator)).transform(callback, {}).value()
  }

  /**
   * Pipes an array or an object to a pipe expression.
   *
   * @return {String}
   *
   * @throws {Error} If fromJSON or fromArray is not called previously.
   */
  toPipe() {
    if (_.size(this.arrayInput) > 0) {
      return this._parseHashToString(this.arrayInput, this.seperators.pipePair, (item) => {
        const options = this._buildOptions(',', item.args)
        return options ? `${item.name}${this.seperators.pipeArgs}${options}` : item.name
      })
    }

    if (_.size(this.jsonInput) > 0) {
      return this._parseHashToString(this.jsonInput, this.seperators.pipePair, (value, key) => {
        const options = this._buildOptions(',', value)
        return options ? `${key}${this.seperators.pipeArgs}${options}` : key
      })
    }

    throw new Error('Make sure to pass an object or array first using fromArray or fromJson method')
  }

  /**
   * Pipes an array or an object to a string expression.
   *
   * @return {String}
   *
   * @throws {Error} If fromJSON or fromArray is not called previously.
    */
  toQS() {
    if (_.size(this.arrayInput) > 0) {
      return this._parseHashToString(this.arrayInput, this.seperators.qsPair, (item) => {
        const options = this._buildOptions(',', item.args)
        const wrappedOptions = (_.isArray(item.args) && _.size(item.args)) ? `[${options}]` : options
        return options ? `${item.name}${this.seperators.qsArgs}${wrappedOptions}` : item.name
      })
    }

    if (_.size(this.jsonInput) > 0) {
      return this._parseHashToString(this.jsonInput, this.seperators.qsPair, (value, key) => {
        const options = this._buildOptions(',', value)
        const wrappedOptions = (_.isArray(value) && _.size(value)) ? `[${options}]` : options
        return options ? `${key}${this.seperators.qsArgs}${wrappedOptions}` : key
      })
    }

    throw new Error('Make sure to pass an object or array first using fromArray or fromJson method')
  }

  /**
   * Converts a string expression to an array
   *
   * @return {Array}
   *
   * @throws {Error} If fromPipe or fromQS is not called previously.
   */
  toArray () {
    if (this.pipeInput) {
      return this._parseStringToArray(this.pipeInput, this.seperators.pipePair, (items) => {
          const tokens = items.split(this.seperators.pipeArgs)
          return { name: tokens[0].trim(), args: this._buildArgs(',', tokens[1]) }
      })
    }

    if (this.qsInput) {
      return this._parseStringToArray(this.qsInput, this.qsReplaceRegex, (items) => {
        const tokens = items.split(this.seperators.qsArgs)
        const unWrappedArgs = tokens[1] ? tokens[1].replace(/\[|\]/g, '') : null
        return { name: tokens[0].trim(), args: this._buildArgs(',', unWrappedArgs) }
      })
    }

    throw new Error('Make sure to pass an expression string using fromQS or fromPipe method')
  }

  /**
   * Converts a string expression to json
   *
   * @return {Object}
   *
   * @throws {Error} If If fromPipe or fromQS is not called previously.
   */
  toJSON () {
    if (this.pipeInput) {
      return this._parseStringToJson(this.pipeInput, this.seperators.pipePair, (result, items) => {
        const tokens = items.split(this.seperators.pipeArgs)
        result[tokens[0].trim()] = this._buildArgs(',', tokens[1])
        return result
      })
    }

    if (this.qsInput) {
      return this._parseStringToJson(this.qsInput, this.qsReplaceRegex, (result, items) => {
        const tokens = items.split(this.seperators.qsArgs)
        const unWrappedArgs = tokens[1] ? tokens[1].replace(/\[|\]/g, '') : null
        result[tokens[0].trim()] = this._buildArgs(',', unWrappedArgs)
      })
    }

    throw new Error('Make sure to pass an expression string using fromQS or fromPipe method')
  }

  /**
   * @see toJSON
   */
  toJson () {
    return this.toJSON()
  }

}

module.exports = Parser
