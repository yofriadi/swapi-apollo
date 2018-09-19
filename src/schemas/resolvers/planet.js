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
    planet: (_, {id, planetID}) => {
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

      if (planetID !== undefined && planetID !== null) {
        return getObjectFromTypeAndId('planets', planetID)
      }

      throw new Error('must provide id or planetID')
    },
    allPlanets: async (_, args) => {
      const {objects, totalCount} = await getObjectsByType('planets')
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
    surfaceWater: ({surface_water}) => surface_water
  },
  PlanetsConnection: {
    planets: conn => conn.edges.map(edge => edge.node)
  }
}
