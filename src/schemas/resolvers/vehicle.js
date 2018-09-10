const {getObjectFromTypeAndId} = require('../../helpers')

module.exports = {
  Query: {
    vehicle: (_, args) => {
      if (args.vehicleID !== undefined && args.vehicleID !== null) {
        return getter('vehicles', args.vehicleID)
      }

      throw new Error('must provide id or vehicleID')
    }
  }
}
