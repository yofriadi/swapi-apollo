const {getObjectFromTypeAndId} = require('../../helpers')

module.exports = {
  Query: {
    planet: (_, args) => {
      if (args.planetID !== undefined && args.planetID !== null) {
        return getObjectFromTypeAndId('planets', args.planetID)
      }

      throw new Error('must provide id or planetID')
    }
  }
}
