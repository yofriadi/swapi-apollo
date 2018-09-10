const {getObjectFromTypeAndId} = require('../../helpers')

module.exports = {
  Query: {
    species: (_, args) => {
      if (args.speciesID !== undefined && args.speciesID !== null) {
        return getter('species', args.speciesID)
      }

      throw new Error('must provide id or speciesID')
    }
  }
}
