const {
  getObjectFromTypeAndId,
  arrayList,
  getObjectsByType
} = require('../../helpers')
const {
  toGlobalId,
  fromGlobalId,
  connectionResolver
} = require('../../relay')

module.exports = {
  Query: {
    starship: (_, {id, starshipID}) => {
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

      if (starshipID !== undefined && starshipID !== null) {
        return getObjectFromTypeAndId('starships', starshipID)
      }

      throw new Error('must provide id or starshipID')
    },
    allStarships: async (_, args) => {
      const {objects, totalCount} = await getObjectsByType('starships')
      return {
        totalCount,
        ...connectionFromArray(objects, args)
      }
    }   
  },
  Starship: {
    id: ({id}) => toGlobalId('starships', id),
    starshipClass: ({starship_class}) => starship_class,
    manufacturers: ({manufacturer}) => arrayList(manufacturer),
    costInCredits: ({cost_in_credits}) => cost_in_credits,
    maxAtmospheringSpeed: ({max_atmosphering_speed}) => max_atmosphering_speed,
    hyperdriveRating: ({hyperdrive_rating}) => hyperdrive_rating,
    cargoCapacity: ({cargo_capacity}) => cargo_capacity,
    pilotConnection: (obj, args) => connectionResolver('pilots', obj, args),
    filmConnection: (obj, args) => connectionResolver('films', obj, args)
  },
  StarshipsConnection: {
    starships: conn => conn.edges.map(edge => edge.node)
  },
  StarshipPilotsConnection: {
    pilots: conn => conn.edges.map(edge => edge.node)
  },
  StarshipFilmsConnection: {
    films: conn => conn.edges.map(edge => edge.node)
  }
}
