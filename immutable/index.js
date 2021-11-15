const { is, fromJS } = require('immutable')

const map1 = fromJS({ a: 1, b:2 })
const map2 = fromJS({ a: 1, b:2 })

const ret = is(map1, map2)
console.log(ret)
