const {
  getObjectFromTypeAndId,
  arrayList,
  getObjectsByType
} = require('../../helpers')
const {
  toGlobalId,
  fromGlobalId,
  connectionFromArray
} = require('../../relay')

module.exports = {
  Query: {
    vehicle: (_, {id, vehicleID}) => {
      if (id !== undefined && id !== null) {
        const {type, id: globalId} = fromGlobalId(id);

        if (
          globalId === null ||
          globalId === undefined ||
          globalId === ''
        ) {
          throw new Error(`No valid ID extracted from ${id}`)
        }
        return getObjectFromTypeAndId(type, globalId)
      }

      if (vehicleID !== undefined && vehicleID !== null) {
        return getObjectFromTypeAndId('vehicles', vehicleID)
      }

      throw new Error('must provide id or vehicleID')
    },
    allVehicles: async (_, args) => {
      const {objects, totalCount} = await getObjectsByType('vehicles')
      return {
        totalCount,
        ...connectionFromArray(objects, args)
      }
    }
  },
  Vehicle: {
    id: ({id}) => toGlobalId('vehicles', id),
    vehicleClass: ({vehicle_class}) => vehicle_class,
    manufacturers: ({manufacturer}) => arrayList(manufacturer),
    costInCredits: ({cost_in_credits}) => cost_in_credits,
    maxAtmospheringSpeed: ({max_atmosphering_speed}) => max_atmosphering_speed,
    cargoCapacity: ({cargo_capacity}) => cargo_capacity
  },
  VehiclesConnection: {
    vehicles: conn => conn.edges.map(edge => edge.node)
  }
}
