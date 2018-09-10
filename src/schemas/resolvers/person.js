const {getObjectFromTypeAndId} = require('../../helpers')

module.exports = {
  Query: {
    person: (_, args) => {
      if (args.personID !== undefined && args.personID !== null) {
        return getObjectFromTypeAndId('people', args.personId)
      }

      throw new Error('must provide id or personID')
    }
  }
}
