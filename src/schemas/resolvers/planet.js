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
    planet: (_, {id, planetID}, {dataSources: {SWAPI}}) => {
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

      if (planetID !== undefined && planetID !== null) {
        return SWAPI.getData('planets', planetID)
      }

      throw new Error('must provide id or planetID')
    },
    allPlanets: async (_, args, {dataSources: {SWAPI}}) => {
      const {objects, totalCount} = await SWAPI.getAllData('planets')
      return {
        totalCount,
        ...connectionFromArray(objects, args)
      }
    }
  },
  Planet: {
    id: ({id}) => toGlobalId('planets', id),
    rotationPeriod: ({rotation_period}) => rotation_period,
    orbitalPeriod: ({orbital_period}) => orbital_period,
    climates: ({climate}) => arrayList(climate),
    terrains: ({terrain}) => arrayList(terrain),
    surfaceWater: ({surface_water}) => surface_water,
    residentConnection: (obj, args, {dataSources}) =>
      connectionResolver('residents', obj, args, dataSources),
    filmConnection: (obj, args, {dataSources}) =>
      connectionResolver('films', obj, args, dataSources)
  },
  PlanetsConnection: {
    planets: conn => conn.edges.map(edge => edge.node)
  },
  PlanetResidentsConnection: {
    residents: conn => conn.edges.map(edge => edge.node)
  },
  PlanetFilmsConnection: {
    films: conn => conn.edges.map(edge => edge.node)
  }
}
