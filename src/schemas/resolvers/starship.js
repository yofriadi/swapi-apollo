const {getObjectFromTypeAndId} = require('../../helpers')

module.exports = {
  Query: {
    starship: (_, args) => {
      if (args.starshipID !== undefined && args.starshipID !== null) {
        return getter('starships', args.starshipID)
      }

      throw new Error('must provide id or starshipID')
    }
  }
}
