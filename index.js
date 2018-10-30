const Package = require('./package');

/**
 * Entry function to get a list of dependencies of a package
 *
 * @param {String} packageName
 * @return {Promise<Array>}
 */
module.exports = function getAllDependencies (packageName) {
  const package = new Package(packageName)
  return package.getAllDependencies()
}
