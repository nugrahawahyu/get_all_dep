const Request = require('./request');

const request = new Request('https://registry.npmjs.org')

module.exports = class {
  constructor (packageName) {
    this.packageName = packageName
    this.allDependencies = []
  }

  /**
   * Get all dependencies of a package
   * @param {String} packageName
   * @return {Promise<Array>}
   */
  async getAllDependencies (packageName) {
    packageName = packageName || this.packageName
    let dependencies = await this.getDependecies(packageName || this.packageName)

    if (dependencies.length) {
      const promises = []
      for (let i in dependencies) {
        const depName = dependencies[i]
        // We store all the promise in promises so we can wait all of them paralelly using Promise.all
        promises.push(this.getAllDependencies(depName))
      }

      // wait all promises to complete and store the results in results
      const results = await Promise.all(promises)


      for (let i in results) {
        dependencies = this.uniqueConcat(dependencies, results[i])
      }

      return dependencies
    }

    return []
  }

  /**
   * Make http request to get a package details, and return its dependencies
   *
   * @param {String} packageName
   * @return {Promise<Array>}
   */
  async getDependecies (packageName) {
    try {
      const res = await request.get(`/${packageName}/latest`)
      const resObj = JSON.parse(res)
      const dependenciesObj = resObj.dependencies || {}
      return Object.keys(dependenciesObj)
    } catch (e) {
      console.log(e)
      return []
    }
  }

  /**
   * concat two arrays, remove duplicate
   * @param {arr1} Array
   * @param {arr2} Array
   */
  uniqueConcat (arr1, arr2) {
    const c = arr1.concat(arr2)
    return c.filter(function (item, pos) {return c.indexOf(item) == pos})
  }
}