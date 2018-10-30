const getAllDependencies = require('./index')

getAllDependencies('forever').then(result => {
  console.log(result)
})
