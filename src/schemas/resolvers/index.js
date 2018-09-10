const {idFetcher, typeResolver} = require('../../relay')

module.exports = {
  Query: {
    node: async (_, {id}, context, info) => idFetcher(id, context, info)
  },
  Node: {
    __resolveType: obj => typeResolver(obj)
  }
}
