const {RESTDataSource} = require('apollo-datasource-rest')
const {
  objectWithId,
  getNextUrl,
  sortObjectsById
} = require('./helpers.js')

class SWAPI extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = 'https://swapi.co/api/'
  }

  async getData(type, id) {
    const data = await this.get(`${type}/${id}/`)
    return objectWithId(data)
  }

  async getAllData(type) {
    let objects = []
    let url = type
    while(url) {
      const pageData = await this.get(`${url}`)
      objects = objects.concat(pageData.results.map(objectWithId))
      url = getNextUrl(type, pageData.next)
    }
    objects = sortObjectsById(objects)
    return {
      objects,
      totalCount: objects.length
    }
  }
}

module.exports = SWAPI
