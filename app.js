const _ = require("lodash");

const result = _.partition([1, 2, 3, 4], n => n % 2);
console.log(result)