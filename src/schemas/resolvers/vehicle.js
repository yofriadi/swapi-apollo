const {
  arrayList
} = require('../../helpers')
const {
  toGlobalId,
  fromGlobalId,
  connectionFromArray,
  connectionResolver
} = require('../../relay')

module.exports = {
  Query: {
    vehicle: (_, {id, vehicleID}, {dataSources: {SWAPI}}) => {
      if (id !== undefined && id !== null) {
        const {type, id: globalId} = fromGlobalId(id);

        if (
          globalId === null ||
          globalId === undefined ||
          globalId === ''
        ) {
          throw new Error(`No valid ID extracted from ${id}`)
        }
        return SWAPI.getData(type, globalId)
      }

      if (vehicleID !== undefined && vehicleID !== null) {
        return SWAPI.getData('vehicles', vehicleID)
      }

      throw new Error('must provide id or vehicleID')
    },
    allVehicles: async (_, args, {dataSources: {SWAPI}}) => {
      const {objects, totalCount} = await SWAPI.getAllData('vehicles')
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
    cargoCapacity: ({cargo_capacity}) => cargo_capacity,
    pilotConnection: (obj, args, {dataSources}) =>
      connectionResolver('pilots', obj, args, dataSources),
    filmConnection: (obj, args, {dataSources}) =>
      connectionResolver('films', obj, args, dataSources)
  },
  VehiclesConnection: {
    vehicles: conn => conn.edges.map(edge => edge.node)
  },
  VehiclePilotsConnection: {
    pilots: conn => conn.edges.map(edge => edge.node)
  },
  VehicleFilmsConnection: {
    films: conn => conn.edges.map(edge => edge.node)
  }
}
