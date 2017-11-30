const haye = require('..')
const expression = 'required|min:3|max:4|alpha_num|between:4,5'
const qsExpression = 'required,min=3,max=4,alpha_num,between=[4,5]'

// console.log('haye #pipeToArray')
// console.log(haye.fromPipe(expression).toArray())
// console.log()

// console.log('haye #pipeToJson')
// console.log(haye.fromPipe(expression).toJSON())
// console.log()

// console.log('haye #qsToArray')
// console.log(haye.fromQS(qsExpression).toArray())
// console.log()

// console.log('haye #qsToJson')
// console.log(haye.fromQS(qsExpression).toJSON())
// console.log()

suite('Haye', () => {
  bench('haye #pipeToArray', () => {
    haye.fromPipe(expression).toArray()
  })

  bench('haye #pipeToJson', () => {
    haye.fromPipe(expression).toJSON()
  })

  bench('haye #qsToArray', () => {
    haye.fromQS(qsExpression).toArray()
  })

  bench('haye #qsToJson', () => {
    haye.fromQS(qsExpression).toJSON()
  })
})
