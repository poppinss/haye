const haye = require('..')
const expression = 'required,email=[unique,users]'
const parsed = haye.fromQS(expression).toJSON()

console.log(parsed)
